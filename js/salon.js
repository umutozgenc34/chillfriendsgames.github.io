(() => {
  const salon = document.getElementById("salon");
  const stage = document.getElementById("stage");
  const screen = document.getElementById("screen");
  const show = document.getElementById("show");
  const osdL = document.getElementById("osdL");
  const osdR = document.getElementById("osdR");
  const tv = document.getElementById("tv");
  const consoleEl = document.getElementById("console");
  const cabinet = document.querySelector(".cabinet");
  const bubble = document.getElementById("bubble");
  const knob = document.getElementById("knob");
  const note = document.getElementById("note");
  const carts = [...document.querySelectorAll(".cart")];
  const blobs = [...document.querySelectorAll(".blob")];
  const byId = Object.fromEntries(GAMES.map((g) => [g.id, g]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HOMES = {
    land: [[1222, 72, -3], [1328, 72, 2], [1430, 72, -1.5], [1226, 258, 1.5], [1330, 258, -2.5], [1432, 258, 1], [1226, 444, -1]],
    port: [[62, 231, -2], [164, 231, 1.5], [266, 231, -1], [368, 231, 2], [470, 231, -1.5], [572, 231, 1], [674, 231, -1]]
  };

  let scale = 1;
  let layout = "land";
  let current = null;
  let busy = false;
  let dragging = null;
  let justDragged = false;
  let touched = false;
  let tuneId = 0;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const t = (o) => I18N.t(o);
  const T = (k) => I18N.T(k);

  const sfx = (() => {
    let ctx = null;
    let on = true;
    try { on = localStorage.getItem("cfg-sound") !== "0"; } catch (e) {}

    function ac() {
      if (!on) return null;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === "suspended") ctx.resume();
      } catch (e) { return null; }
      return ctx;
    }
    function noise(dur, freq, q, vol) {
      const a = ac();
      if (!a) return;
      const len = Math.floor(a.sampleRate * dur);
      const buf = a.createBuffer(1, len, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      const src = a.createBufferSource();
      src.buffer = buf;
      const f = a.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = freq;
      f.Q.value = q;
      const g = a.createGain();
      g.gain.value = vol;
      src.connect(f).connect(g).connect(a.destination);
      src.start();
    }
    function tone(f1, f2, dur, vol, type = "square") {
      const a = ac();
      if (!a) return;
      const o = a.createOscillator();
      const g = a.createGain();
      const now = a.currentTime;
      o.type = type;
      o.frequency.setValueAtTime(f1, now);
      o.frequency.exponentialRampToValueAtTime(f2, now + dur);
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g).connect(a.destination);
      o.start(now);
      o.stop(now + dur + 0.02);
    }
    return {
      clack() { noise(0.07, 1700, 1.4, 0.6); tone(170, 80, 0.07, 0.07); },
      hiss() { noise(0.65, 3800, 0.5, 0.14); },
      blip() { tone(660, 990, 0.08, 0.04); setTimeout(() => tone(990, 1320, 0.1, 0.035), 90); },
      off() { tone(420, 110, 0.18, 0.04, "triangle"); },
      get on() { return on; },
      set on(v) {
        on = v;
        try { localStorage.setItem("cfg-sound", v ? "1" : "0"); } catch (e) {}
      }
    };
  })();

  knob.setAttribute("aria-pressed", String(sfx.on));
  knob.addEventListener("click", () => {
    sfx.on = !sfx.on;
    knob.setAttribute("aria-pressed", String(sfx.on));
    knob.setAttribute("aria-label", sfx.on ? T("tv.soundOn") : T("tv.soundOff"));
    if (sfx.on) sfx.blip();
  });

  function setPos(c, p) {
    c._x = p.x;
    c._y = p.y;
    c.style.setProperty("--x", p.x + "px");
    c.style.setProperty("--y", p.y + "px");
    c.style.setProperty("--r", (p.r || 0) + "deg");
  }
  function homeOf(c) {
    const h = HOMES[layout][carts.indexOf(c)];
    return { x: h[0], y: h[1], r: h[2] };
  }
  function slotOf(c) {
    const cw = c.offsetWidth;
    const ch = c.offsetHeight;
    return {
      x: consoleEl.offsetLeft + (consoleEl.offsetWidth - cw) / 2,
      y: consoleEl.offsetTop - ch + ch * 0.37,
      r: 0
    };
  }
  function glide(c, p, ms = 380) {
    c.style.transitionDuration = (reduce ? 1 : ms) + "ms";
    c.classList.add("glide");
    setPos(c, p);
    return wait(reduce ? 10 : ms + 20).then(() => c.classList.remove("glide"));
  }

  function fit() {
    const w = salon.clientWidth;
    const h = salon.clientHeight;
    const port = w / h < 0.95;
    layout = port ? "port" : "land";
    stage.classList.toggle("port", port);
    const sw = port ? 900 : 1600;
    const sh = port ? 1500 : 900;
    scale = Math.min(w / sw, h / sh);
    stage.style.setProperty("--s", scale);
    const floor = port ? 1188 : 700;
    salon.style.setProperty("--floor-y", Math.round(h / 2 - (sh * scale) / 2 + floor * scale) + "px");
    carts.forEach((c) => {
      if (c === dragging) return;
      setPos(c, c === current ? slotOf(c) : homeOf(c));
    });
    hideBubble();
  }

  function overTarget(c) {
    const cx = c._x + c.offsetWidth / 2;
    const cy = c._y + c.offsetHeight / 2;
    const pad = 50;
    return [consoleEl, tv, cabinet].some((el) =>
      cx > el.offsetLeft - pad &&
      cx < el.offsetLeft + el.offsetWidth + pad &&
      cy > el.offsetTop - pad &&
      cy < el.offsetTop + el.offsetHeight + pad
    );
  }

  async function insert(c) {
    if (busy) return;
    busy = true;
    touched = true;
    note.querySelector("p").textContent = T("home.note2");
    if (current && current !== c) await eject(true);
    const sl = slotOf(c);
    c.classList.remove("in");
    c.classList.add("fly");
    await glide(c, { x: sl.x, y: sl.y - c.offsetHeight * 0.55, r: 0 }, 360);
    c.classList.remove("fly");
    c.classList.add("in");
    await glide(c, sl, 170);
    current = c;
    c.setAttribute("aria-pressed", "true");
    sfx.clack();
    stage.classList.add("on");
    busy = false;
    tune(byId[c.dataset.game], carts.indexOf(c) + 1);
  }

  async function eject(chain) {
    const c = current;
    if (!c) return;
    if (!chain) {
      if (busy) return;
      busy = true;
    }
    current = null;
    c.setAttribute("aria-pressed", "false");
    powerOff();
    const sl = slotOf(c);
    await glide(c, { x: sl.x, y: sl.y - c.offsetHeight * 0.55, r: 0 }, 180);
    c.classList.remove("in");
    c.classList.add("fly");
    await glide(c, homeOf(c), 380);
    c.classList.remove("fly");
    if (!chain) busy = false;
  }

  function powerOff() {
    tuneId++;
    if (stage.classList.contains("on")) sfx.off();
    stage.classList.remove("on");
    screen.classList.remove("loading", "tuned");
    show.hidden = true;
    osdL.textContent = "AV 1";
    osdR.textContent = "";
    hideBubble();
  }

  async function tune(g, ch) {
    const id = ++tuneId;
    show.hidden = true;
    screen.classList.remove("tuned");
    screen.classList.add("loading");
    osdL.textContent = "CH " + String(ch).padStart(2, "0");
    osdR.textContent = "";
    sfx.hiss();
    await wait(reduce ? 60 : 680);
    if (id !== tuneId) return;
    screen.classList.remove("loading");
    screen.classList.add("tuned");
    render(g);
    show.hidden = false;
    sfx.blip();
    cheer(g);
  }

  function render(g) {
    show.style.setProperty("--g", g.color);
    show.classList.toggle("wide", !!g.soon);
    const chips = g.soon
      ? `<span>${t(g.genre)}</span>`
      : `<span>${g.players} ${T("tv.players")}</span><span>${t(g.genre)}</span>`;
    show.innerHTML =
      `<img class="ic" src="${g.img}" alt="">` +
      `<div class="hd"><h2>${t(g.name)}</h2><div class="chips">${chips}</div></div>` +
      `<p class="bl">${t(g.blurb)}</p>` +
      `<div class="acts"><a href="${g.play}" target="_blank" rel="noopener">${g.soon ? T("tv.follow") : T("tv.play")}</a>` +
      `<button type="button" class="ej">${T("tv.eject")}</button></div>`;
    show.querySelector(".ej").addEventListener("click", () => eject());
    osdR.textContent = g.soon ? T("tv.soon") : "";
  }

  let sayTimer = 0;
  function say(b, text) {
    bubble.textContent = text;
    bubble.hidden = false;
    bubble.classList.remove("flip");
    const bw = bubble.offsetWidth;
    let left = b.offsetLeft + b.offsetWidth * 0.55;
    if (left + bw > stage.offsetWidth - 16) {
      left = b.offsetLeft + b.offsetWidth * 0.45 - bw;
      bubble.classList.add("flip");
    }
    bubble.style.left = Math.max(10, left) + "px";
    bubble.style.top = b.offsetTop - bubble.offsetHeight - 6 + "px";
    bubble.style.animation = "none";
    void bubble.offsetWidth;
    bubble.style.animation = "";
    clearTimeout(sayTimer);
    sayTimer = setTimeout(hideBubble, 2800);
  }
  function hideBubble() {
    bubble.hidden = true;
  }

  function cheer(g) {
    if (!reduce) {
      blobs.forEach((b, i) => {
        b.style.setProperty("--d", i * 0.07 + "s");
        b.style.setProperty("--tilt", (i % 2 ? -4 : 4) + "deg");
        b.classList.remove("hop");
        void b.offsetWidth;
        b.classList.add("hop");
      });
    }
    say(blobs[Math.floor(Math.random() * blobs.length)], t(g.shout));
  }

  let chatter = 0;
  const idleTimer = setInterval(() => {
    if (touched || document.hidden) return;
    const lines = T("idle.lines");
    if (chatter >= lines.length) return clearInterval(idleTimer);
    say(blobs[(chatter * 3 + 1) % blobs.length], lines[chatter]);
    chatter++;
  }, 6500);

  carts.forEach((c) => {
    c.addEventListener("pointerdown", (e) => {
      if (busy || (e.pointerType === "mouse" && e.button !== 0)) return;
      dragging = c;
      c._moved = false;
      c._start = { px: e.clientX, py: e.clientY, x: c._x, y: c._y, lx: e.clientX, wasIn: c === current };
      c.setPointerCapture(e.pointerId);
    });

    c.addEventListener("pointermove", (e) => {
      if (dragging !== c) return;
      const st = c._start;
      const dx = (e.clientX - st.px) / scale;
      const dy = (e.clientY - st.py) / scale;
      if (!c._moved) {
        if (Math.hypot(e.clientX - st.px, e.clientY - st.py) < 6) return;
        c._moved = true;
        touched = true;
        c.classList.remove("glide", "in");
        c.classList.add("drag");
        if (st.wasIn) {
          current = null;
          c.setAttribute("aria-pressed", "false");
          powerOff();
        }
      }
      const vx = e.clientX - st.lx;
      st.lx = e.clientX;
      const r = Math.max(-14, Math.min(14, vx * 1.2));
      setPos(c, { x: st.x + dx, y: st.y + dy, r });
      stage.classList.toggle("hot", overTarget(c));
    });

    const end = () => {
      if (dragging !== c) return;
      dragging = null;
      if (!c._moved) return;
      justDragged = true;
      setTimeout(() => (justDragged = false), 60);
      c.classList.remove("drag");
      const hit = overTarget(c);
      stage.classList.remove("hot");
      if (hit) {
        insert(c);
      } else {
        c.classList.add("fly");
        glide(c, homeOf(c), 420).then(() => c.classList.remove("fly"));
      }
    };
    c.addEventListener("pointerup", end);
    c.addEventListener("pointercancel", end);
    c.addEventListener("lostpointercapture", end);

    c.addEventListener("click", () => {
      if (justDragged || busy) return;
      if (c === current) eject();
      else insert(c);
    });
    c.addEventListener("dragstart", (e) => e.preventDefault());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && current) eject();
  });

  function labelCarts() {
    carts.forEach((c) => {
      const g = byId[c.dataset.game];
      c.querySelector("img").src = g.img;
      c.querySelector("b").textContent = t(g.name);
      c.setAttribute("aria-label", T("cart.aria").replace("{}", t(g.name)));
      c.setAttribute("aria-pressed", String(c === current));
    });
    knob.setAttribute("aria-label", sfx.on ? T("tv.soundOn") : T("tv.soundOff"));
    if (touched) note.querySelector("p").textContent = T("home.note2");
  }

  document.addEventListener("langchange", () => {
    labelCarts();
    if (current && screen.classList.contains("tuned")) render(byId[current.dataset.game]);
  });

  const canvas = document.getElementById("noise");
  const cx = canvas.getContext("2d");
  const img = cx.createImageData(canvas.width, canvas.height);
  let last = 0;
  function drawSnow() {
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    cx.putImageData(img, 0, 0);
  }
  function snow(ts) {
    requestAnimationFrame(snow);
    if (ts - last < 50 || screen.classList.contains("tuned")) return;
    last = ts;
    drawSnow();
  }
  if (reduce) drawSnow();
  else requestAnimationFrame(snow);

  labelCarts();
  fit();
  new ResizeObserver(fit).observe(salon);
})();
