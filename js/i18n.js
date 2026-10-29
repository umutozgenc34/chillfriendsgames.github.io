const I18N = (() => {
  const D = {
    tr: {
      "tagline": "tek telefon, çok kahkaha",
      "menu": "Menü",
      "nav.home": "Salon",
      "nav.games": "Oyunlar",
      "nav.about": "Hakkımızda",
      "nav.contact": "İletişim",
      "foot.sign": "Bir salon dolusu arkadaşla yapıldı.",

      "home.title": "Chill Friends Games",
      "home.h1": "Chill Friends Games: arkadaşlarla oynanan parti oyunları",
      "home.note": "Raftan bir oyun kap, konsola sürükle!",
      "home.note2": "Başka bir kartuş dene, ya da indir ve oyna!",
      "tv.idle1": "SİNYAL YOK",
      "tv.idle2": "Konsola bir oyun tak",
      "tv.players": "kişi",
      "tv.play": "▶ Google Play",
      "tv.follow": "Instagram'da takip et",
      "tv.eject": "⏏ Çıkar",
      "tv.soon": "YAKINDA",
      "tv.soundOn": "Sesi kapat",
      "tv.soundOff": "Sesi aç",
      "cart.soon": "yakında",
      "cart.aria": "{} kartuşunu konsola tak",
      "idle.lines": ["ne oynuyoruz?", "biri bir oyun taksın ya", "raftaki kartuşu getirsene", "sıkıldıııım"],

      "games.title": "Oyunlar | Chill Friends Games",
      "games.scrib": "raftakilerin hepsi",
      "games.h1": "Oyunlar",
      "games.lead": "Hepsi ücretsiz, hiçbiri internet istemez. Bir telefonu ortaya koyun, gerisi masadakilere kalmış.",
      "games.players": "kişi",
      "games.lang": "Dil:",
      "games.how": "Nasıl oynanır",
      "games.get": "Google Play'den indir",
      "games.free": "Ücretsiz, internetsiz",
      "games.soonH": "rafta yer açtık",
      "games.follow": "Instagram'da takip et",
      "games.privacy": "Gizlilik Politikası",

      "about.title": "Hakkımızda | Chill Friends Games",
      "about.scrib": "biz kimiz?",
      "about.h1": "Bir telefon, bir salon dolusu insan.",
      "about.p1": "Chill Friends Games, arkadaş grupları ve aile buluşmaları için parti oyunları yapan küçük, bağımsız bir stüdyo.",
      "about.p2": "Fikir basit: herkes bir araya geldiğinde telefonlar genelde masada ama herkes kendi ekranında oluyor. Biz o telefonu ortaya koyup elden ele dolaştıran oyunlar yapıyoruz. Ekrana değil, birbirinize bakacağınız oyunlar.",
      "about.p3": "Kuralları iki dakikada anlatılabilecek kadar sade oyunlar yapmaya çalışıyoruz. Eklenmesini istediğiniz bir rol, kelime ya da mod varsa yazın; gelen her mesajı okuyoruz.",
      "about.cta": "Oyunlara göz at",
      "about.listH": "Her oyunda tuttuğumuz kurallar",
      "about.l1": "Tek telefon yeter.",
      "about.l1s": "Kimsenin uygulama indirmesine gerek yok.",
      "about.l2": "İnternet istemez.",
      "about.l2s": "Kampta, yolda, çekmeyen bir yazlıkta da çalışır.",
      "about.l3": "Ücretsiz.",
      "about.l3s": "İndirip hemen oynamaya başlarsınız.",

      "contact.title": "İletişim | Chill Friends Games",
      "contact.scrib": "bir mesaj uzağınızdayız",
      "contact.h1": "Yazın, okuyoruz.",
      "contact.lead": "Bir oyun fikri, takıldığınız bir hata ya da iş birliği teklifi. Hepsine bakıyoruz ve en kısa sürede dönüyoruz.",
      "contact.name": "Adın",
      "contact.msg": "Mesajın",
      "contact.send": "E-postayı hazırla",
      "contact.hint": "Butona basınca e-posta uygulamanda mesajın hazır olarak açılır.",
      "contact.mailH": "Doğrudan e-posta",
      "contact.social": "Bizi takip edin",
      "contact.subject": "Siteden mesaj: {}",

      "nf.title": "Kanal yok | Chill Friends Games",
      "nf.h1": "Bu kanalda yayın yok.",
      "nf.p": "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.",
      "nf.back": "Salona dön"
    },
    en: {
      "tagline": "one phone, lots of laughs",
      "menu": "Menu",
      "nav.home": "Living room",
      "nav.games": "Games",
      "nav.about": "About",
      "nav.contact": "Contact",
      "foot.sign": "Made with a living room full of friends.",

      "home.title": "Chill Friends Games",
      "home.h1": "Chill Friends Games: party games to play with friends",
      "home.note": "Grab a game off the shelf and drag it to the console!",
      "home.note2": "Try another cartridge, or go download one!",
      "tv.idle1": "NO SIGNAL",
      "tv.idle2": "Plug a game into the console",
      "tv.players": "players",
      "tv.play": "▶ Google Play",
      "tv.follow": "Follow on Instagram",
      "tv.eject": "⏏ Eject",
      "tv.soon": "SOON",
      "tv.soundOn": "Mute sound",
      "tv.soundOff": "Turn sound on",
      "cart.soon": "soon",
      "cart.aria": "Plug {} into the console",
      "idle.lines": ["so what are we playing?", "someone put a game on", "grab a cartridge off the shelf", "I'm bored"],

      "games.title": "Games | Chill Friends Games",
      "games.scrib": "everything on the shelf",
      "games.h1": "Games",
      "games.lead": "All free, none of them need internet. Put one phone in the middle, the rest is up to whoever's at the table.",
      "games.players": "players",
      "games.lang": "Language:",
      "games.how": "How it plays",
      "games.get": "Get it on Google Play",
      "games.free": "Free, works offline",
      "games.soonH": "we made room on the shelf",
      "games.follow": "Follow on Instagram",
      "games.privacy": "Privacy Policy",

      "about.title": "About | Chill Friends Games",
      "about.scrib": "who are we?",
      "about.h1": "One phone, a room full of people.",
      "about.p1": "Chill Friends Games is a small independent studio making party games for friend groups and family get-togethers.",
      "about.p2": "The idea is simple: when everyone gets together the phones are on the table, but everyone's on their own screen. We make games that put one phone in the middle and pass it around. Games where you look at each other, not the screen.",
      "about.p3": "We try to keep the rules simple enough to explain in two minutes. If there's a role, word or mode you'd like to see, write to us; we read every message.",
      "about.cta": "Browse the games",
      "about.listH": "Rules we keep in every game",
      "about.l1": "One phone is enough.",
      "about.l1s": "Nobody else needs to install anything.",
      "about.l2": "No internet needed.",
      "about.l2s": "Works at a campsite, on the road, or at a cabin with no signal.",
      "about.l3": "Free.",
      "about.l3s": "Download it and start playing.",

      "contact.title": "Contact | Chill Friends Games",
      "contact.scrib": "one message away",
      "contact.h1": "Write to us, we read it.",
      "contact.lead": "A game idea, a bug you ran into, or a partnership offer. We look at all of them and get back to you as soon as we can.",
      "contact.name": "Your name",
      "contact.msg": "Your message",
      "contact.send": "Prepare the email",
      "contact.hint": "The button opens your email app with the message ready to send.",
      "contact.mailH": "Email us directly",
      "contact.social": "Follow us",
      "contact.subject": "Message from the website: {}",

      "nf.title": "No signal | Chill Friends Games",
      "nf.h1": "Nothing on this channel.",
      "nf.p": "The page you're looking for may have moved, or never existed.",
      "nf.back": "Back to the living room"
    }
  };

  let lang = "tr";
  try {
    const saved = localStorage.getItem("cfg-lang");
    if (saved === "tr" || saved === "en") lang = saved;
    else if (!(navigator.language || "tr").toLowerCase().startsWith("tr")) lang = "en";
  } catch (e) {}

  function T(k) {
    const v = D[lang][k];
    return v !== undefined ? v : D.tr[k] !== undefined ? D.tr[k] : k;
  }
  function t(o) {
    if (!o) return "";
    return o[lang] !== undefined ? o[lang] : o.tr;
  }
  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = T(el.dataset.i18n);
      if (typeof v === "string") el.textContent = v;
    });
    const title = document.body.dataset.title;
    if (title) document.title = T(title);
    const btn = document.querySelector(".lang");
    if (btn) {
      btn.textContent = lang === "tr" ? "EN" : "TR";
      btn.setAttribute("aria-label", lang === "tr" ? "Switch to English" : "Türkçeye geç");
    }
    const burger = document.querySelector(".burger");
    if (burger) burger.setAttribute("aria-label", T("menu"));
    document.dispatchEvent(new Event("langchange"));
  }
  function set(l) {
    lang = l;
    try { localStorage.setItem("cfg-lang", l); } catch (e) {}
    apply();
  }

  const btn = document.querySelector(".lang");
  if (btn) btn.addEventListener("click", () => set(lang === "tr" ? "en" : "tr"));

  const top = document.querySelector(".top");
  const burger = document.querySelector(".burger");
  if (burger && top) {
    burger.addEventListener("click", () => {
      const open = top.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  if (lang !== "tr") apply();
  else {
    const b = document.querySelector(".burger");
    if (b) b.setAttribute("aria-label", T("menu"));
  }

  return { T, t, set, apply, get lang() { return lang; } };
})();
