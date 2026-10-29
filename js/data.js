const PLAY = "https://play.google.com/store/apps/details?id=com.chillfriendsgames.";

const GAMES = [
  {
    id: "vol",
    img: "img/vol.webp",
    color: "#e0483f",
    play: PLAY + "villageoflies",
    players: "4–15+",
    langs: "TR, EN",
    name: { tr: "Vampir Köylü", en: "Village of Lies" },
    genre: { tr: "Sosyal dedüksiyon", en: "Social deduction" },
    blurb: {
      tr: "Gece çöküyor, köyde biri yalan söylüyor. Tetikçi, doktor, dedektif… Rolünü sakla, hainleri oylayıp köyden at.",
      en: "Night falls and someone in the village is lying. Hitman, doctor, detective… keep your role hidden and vote the traitors out."
    },
    long: {
      tr: "Köyde bir mafya gizlice çalışıyor ve her gece bir köylü eksiliyor. Gündüz herkes masada: kim ne gördü, kim kimi kolladı, kim fazla sessiz? Tetikçi, Doktor, Dedektif ve daha fazla rolle arkadaşlarını kandır, ittifak kur, sonra o ittifakı bozmaya hazır ol.",
      en: "A mafia is quietly running the village and every night one villager disappears. By day everyone is at the table: who saw what, who protected whom, who's being suspiciously quiet? With Hitman, Doctor, Detective and more, fool your friends, make alliances and be ready to break them."
    },
    how: {
      tr: ["Telefon dolaşır, herkes gizlice rolüne bakar.", "Gece kötüler seçer, gündüz köy tartışır ve oylar.", "Mafya bitince köy, köy azalınca mafya kazanır."],
      en: ["Pass the phone around, everyone peeks at their role.", "At night the bad guys pick, by day the village argues and votes.", "Village wins when the mafia is gone, mafia wins when the village runs out."]
    },
    shout: { tr: "ben köylüyüm yemin ederim!", en: "I'm a villager, I swear!" }
  },
  {
    id: "casus",
    img: "img/casus.webp",
    color: "#c05be0",
    play: PLAY + "spygame",
    players: "3–10+",
    langs: "TR",
    name: { tr: "Casus", en: "Imposter: Spy Game" },
    genre: { tr: "Kelime ve blöf", en: "Words and bluffing" },
    blurb: {
      tr: "Herkes kelimeyi biliyor, casus sadece kategoriyi. 15+ kategori, 1000+ kelime. Ağzından laf kaçıran kaybeder.",
      en: "Everyone knows the word, the spy only knows the category. 15+ categories, 1000+ words. Whoever slips up loses."
    },
    long: {
      tr: "Normal oyuncular gizli kelimeyi görür, casuslar sadece kategori ipucunu alır. Sırayla kelimeyle ilgili bir şey söylersiniz; ne çok belli edeceksin ne de çok uzak kalacaksın. Casus ise boşlukları doldurup aranıza karışmaya çalışır.",
      en: "Regular players see the secret word, spies only get a hint about the category. Take turns saying something about it: don't give it away, don't drift too far. The spy, meanwhile, tries to blend in by filling the gaps."
    },
    how: {
      tr: ["Kategori seç, telefonu sırayla dolaştır.", "Herkes kelimeyle ilgili tek bir şey söylesin.", "Casus olduğunu düşündüğünüz kişiyi oylayın."],
      en: ["Pick a category, pass the phone around.", "Everyone says one thing about the word.", "Vote for whoever you think is the spy."]
    },
    shout: { tr: "dur bi dakka, casus sen misin?", en: "wait… are YOU the spy?" }
  },
  {
    id: "bomba",
    img: "img/bomba.webp",
    color: "#ff8c1a",
    play: PLAY + "bombakimde",
    players: "2–10",
    langs: "TR",
    name: { tr: "Bomba Kimde", en: "Bomba Kimde" },
    genre: { tr: "Parti", en: "Party" },
    blurb: {
      tr: "Telefon elden ele dolaşıyor, sayaç tik takluyor. Görevi yap ya da kelimeyi bil, patladığında elinde olmasın! 500+ kart.",
      en: "The phone goes hand to hand while the timer ticks. Do the task or guess the word, just don't be holding it when it blows! 500+ cards."
    },
    long: {
      tr: "Bomba patladığında telefon kimin elindeyse o kaybeder. Görev Modu ve Kelime Modu arasında seç, 500'den fazla görev ve kelime kartıyla oyna. Herkesin 3 canı var; canı biten elenir, en son kalan kazanır.",
      en: "Whoever is holding the phone when the bomb goes off loses. Choose between Task Mode and Word Mode, with 500+ task and word cards. Everyone has 3 lives; lose them all and you're out, last one standing wins."
    },
    how: {
      tr: ["Modu seç, bombayı kur.", "Kartı yap ya da bil, telefonu yanındakine ver.", "Patladığında elinde olan bir can kaybeder."],
      en: ["Pick a mode, arm the bomb.", "Do or guess the card, hand the phone on.", "Whoever's holding it when it explodes loses a life."]
    },
    shout: { tr: "al al al AL!", en: "take it take it TAKE IT!" }
  },
  {
    id: "suclukim",
    img: "img/suclukim.webp",
    color: "#d6ad62",
    play: PLAY + "suclukim",
    players: "4–8",
    langs: "TR",
    name: { tr: "Suçlu Kim?", en: "Who's Guilty?" },
    genre: { tr: "Dedektiflik", en: "Detective" },
    blurb: {
      tr: "Suçluların üç cevabı yanlış ama hangileri, kendileri de bilmiyor. Sorgula, çelişkiyi yakala, davayı kapat.",
      en: "The culprits have three wrong answers, but even they don't know which. Question everyone, catch the contradiction, close the case."
    },
    long: {
      tr: "Dedektif misin, suçlu musun? Suçluların elindeki cevaplardan üçü yanlış, ama hangilerinin yanlış olduğunu kendileri de bilmiyor. Sorgula, yalan söyle, gerçeği gizle. Bütün suçlular yakalanınca dava kapanır.",
      en: "Are you the detective or a culprit? Three of the culprits' answers are wrong, but they don't know which ones. Interrogate, lie, hide the truth. The case closes when every culprit is caught."
    },
    how: {
      tr: ["Roller dağıtılır, suçlular cevaplarını görür.", "Dedektif sorular sorar, herkes savunma yapar.", "Çelişen cevaplardan suçluları bulun."],
      en: ["Roles are dealt, culprits see their answers.", "The detective asks, everyone defends themselves.", "Spot the culprits through contradicting answers."]
    },
    shout: { tr: "itiraz ediyorum!", en: "objection!" }
  },
  {
    id: "minigunners",
    img: "img/minigunners.jpg",
    color: "#f2a33a",
    soon: true,
    play: "https://instagram.com/chillfriendgames",
    privacy: "minigunners-privacy.html",
    players: "1–2",
    langs: "TR, EN",
    name: { tr: "Mini Gunners", en: "Mini Gunners" },
    genre: { tr: "Sıra tabanlı nişancı", en: "Turn-based shooter" },
    blurb: {
      tr: "Açını ayarla, gücünü topla, rüzgârı hesaba kat ve ateş et. Online düellolarda rakibini yen ya da macera haritasında boss'ları devir.",
      en: "Set your angle, charge your power, mind the wind and fire. Beat rivals in online duels or take down bosses on the adventure map."
    },
    shout: { tr: "rüzgârı hesapla, ateş!", en: "mind the wind… FIRE!" }
  },
  {
    id: "npc",
    img: "img/npc.webp",
    color: "#3fd3ea",
    soon: true,
    play: "https://instagram.com/chillfriendgames",
    players: "?",
    langs: "TR, EN",
    name: { tr: "Who is the NPC?", en: "Who is the NPC?" },
    genre: { tr: "Yapım aşamasında", en: "In the works" },
    blurb: {
      tr: "Aranızdan biri ezberden konuşuyor gibi. Kim olduğunu bulmak size kalıyor. Şu an üstünde çalışıyoruz.",
      en: "Someone in your group sounds like they're reading a script. Finding them is up to you. We're working on it right now."
    },
    shout: { tr: "…yükleniyor", en: "…loading" }
  }
];
