(() => {
  const boxes = document.getElementById("boxes");
  const soon = document.getElementById("soon");
  const t = (o) => I18N.t(o);
  const T = (k) => I18N.T(k);
  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" fill="currentColor"/></svg>';

  function draw() {
    boxes.innerHTML = GAMES.filter((g) => !g.soon).map((g) => `
      <article class="box" id="${g.id}" style="--g:${g.color}">
        <div class="spine" aria-hidden="true"><span>${t(g.name)}</span></div>
        <div class="art"><img src="${g.img}" alt="${t(g.name)}" width="320" height="320" loading="lazy"></div>
        <div class="body">
          <h2>${t(g.name)}</h2>
          <ul class="facts">
            <li><b>${g.players}</b> ${T("games.players")}</li>
            <li>${t(g.genre)}</li>
            <li>${T("games.lang")} ${g.langs}</li>
          </ul>
          <p>${t(g.long)}</p>
          <h3>${T("games.how")}</h3>
          <ol class="how">${t(g.how).map((s) => `<li>${s}</li>`).join("")}</ol>
          <div class="get">
            <a class="btn" href="${g.play}" target="_blank" rel="noopener">${playIcon}${T("games.get")}</a>
            <span>${T("games.free")}</span>
          </div>
        </div>
      </article>`).join("");

    const n = GAMES.find((g) => g.soon);
    soon.innerHTML = `
      <img src="${n.img}" alt="${t(n.name)}" width="1024" height="500" loading="lazy">
      <div>
        <span class="scribble">${T("games.soonH")}</span>
        <h2>${t(n.name)}</h2>
        <p>${t(n.blurb)}</p>
        <a class="btn light" href="${n.play}" target="_blank" rel="noopener">${T("games.follow")}</a>
      </div>`;
  }

  document.addEventListener("langchange", draw);
  draw();
})();
