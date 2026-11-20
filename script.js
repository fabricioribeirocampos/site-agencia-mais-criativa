/* ============================================
   CONFIGURAÇÃO — edite só aqui
   ============================================ */
const CONFIG = {
  whatsapp: "5521970084480",            // DDI + DDD + número, só dígitos
  instagram: "seuinstagram",            // sem @
  email: "contato@agenciamaiscriativa.com.br",
  // Fim da oferta. null = último dia de cada mês. Ou data fixa: "2026-12-15T23:59:59-03:00"
  offerEnds: null,
};

/* ============================================
   CLIENTES — para adicionar um cliente novo, copie uma linha e troque os dados.
   ramo e foto são opcionais. foto: nome de um arquivo enviado junto com o site
   (ex.: "clientes/foto-no-classico.jpg"), de preferência um print da página inicial.
   ============================================ */
const CLIENTES = [
  { nome: "Foto no Clássico", url: "https://fotonoclassico.agenciamaiscriativa.com.br", ramo: "Cabine de fotos na Kombi e no Fusca para casamentos e festas", foto: "clientes/foto-no-classico.jpg" },
  { nome: "Noiva sem Fusca",  url: "https://noivasemfusca.agenciamaiscriativa.com.br", ramo: "Fusca vermelho 1962 como carro da noiva no Rio", foto: "clientes/noiva-sem-fusca.jpg" },
];

const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const ext = (a) => { a.target = "_blank"; a.rel = "noopener"; };
document.querySelectorAll(".js-wa").forEach((a) => { a.href = waLink(a.dataset.msg || "Olá! Vim pelo site."); ext(a); });
document.querySelectorAll(".js-ig").forEach((a) => { a.href = `https://instagram.com/${CONFIG.instagram}`; ext(a); });
document.querySelectorAll(".js-mail").forEach((a) => (a.href = `mailto:${CONFIG.email}`));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Nav */
const nav = document.querySelector("[data-nav]");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
  document.body.classList.toggle("menu-open", !open);
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open");
}));

/* Contagem regressiva */
const endDate = () => {
  if (CONFIG.offerEnds) return new Date(CONFIG.offerEnds);
  const n = new Date(); return new Date(n.getFullYear(), n.getMonth() + 1, 0, 23, 59, 59);
};
const pad = (n) => String(n).padStart(2, "0");
const tick = () => {
  let t = Math.max(0, endDate() - new Date());
  const d = Math.floor(t / 864e5); t -= d * 864e5;
  const h = Math.floor(t / 36e5); t -= h * 36e5;
  const m = Math.floor(t / 6e4); t -= m * 6e4;
  const s = Math.floor(t / 1e3);
  document.querySelectorAll("[data-countdown]").forEach((el) => (el.textContent = `${d}d ${pad(h)}h ${pad(m)}m`));
  const set = (q, v) => document.querySelectorAll(q).forEach((el) => (el.textContent = pad(v)));
  set("[data-d]", d); set("[data-h]", h); set("[data-m]", m); set("[data-s]", s);
};
tick(); setInterval(tick, 1000);

/* Mensagens que chegam no hero */
const toastText = document.querySelector("[data-toast]");
const toastBox = document.querySelector(".toast");
if (toastText && !reduce) {
  const msgs = [
    "Olá! Vi vocês no Google e quero um orçamento.",
    "Vocês abrem no sábado?",
    "Vi o post no Instagram, ainda tem a promoção?",
    "Achei pelo mapa. Como faço para agendar?",
  ];
  let k = 0;
  setInterval(() => {
    toastBox.classList.add("is-swap");
    setTimeout(() => { k = (k + 1) % msgs.length; toastText.textContent = msgs[k]; toastBox.classList.remove("is-swap"); }, 350);
  }, 3800);
}

/* Digitação na busca */
const typing = document.querySelector("[data-typing]");
if (typing && !reduce) {
  const terms = ["pizzaria perto de mim", "dentista perto de mim", "salão de beleza perto de mim", "oficina perto de mim"];
  let t = 0, i = terms[0].length, del = true;
  const step = () => {
    const w = terms[t]; i += del ? -1 : 1; typing.textContent = w.slice(0, i);
    let dl = del ? 35 : 75;
    if (!del && i === w.length) { del = true; dl = 1800; }
    else if (del && i === 0) { del = false; t = (t + 1) % terms.length; dl = 300; }
    setTimeout(step, dl);
  };
  setTimeout(step, 2000);
}

/* Diagnóstico */
const quiz = document.querySelector("[data-quiz]");
if (quiz) {
  const qs = [...quiz.querySelectorAll(".q")];
  const bar = quiz.querySelector("[data-progress]");
  const stepEl = quiz.querySelector("[data-step]");
  const top = quiz.querySelector(".qcard__top");
  const res = quiz.querySelector("[data-result]");
  const gauge = quiz.querySelector("[data-gauge]");
  const C = 2 * Math.PI * 52;
  let i = 0, pts = 0, probs = [];
  const show = () => { qs.forEach((q, k) => q.classList.toggle("is-active", k === i)); stepEl.textContent = i + 1; bar.style.width = `${(i / qs.length) * 100}%`; };
  const finish = () => {
    qs.forEach((q) => q.classList.remove("is-active"));
    top.hidden = true; res.hidden = false;
    const nota = 10 - pts;
    quiz.querySelector("[data-score]").textContent = nota;
    gauge.style.strokeDasharray = C;
    gauge.style.strokeDashoffset = C;
    requestAnimationFrame(() => requestAnimationFrame(() => (gauge.style.strokeDashoffset = C * (1 - nota / 10))));
    const v = quiz.querySelector("[data-verdict]"), tx = quiz.querySelector("[data-text]");
    if (nota <= 4) { v.textContent = "Alerta: você está perdendo clientes."; tx.textContent = "Sua empresa está praticamente invisível para quem procura na internet. A boa notícia: dá para virar esse jogo rápido."; }
    else if (nota <= 8) { v.textContent = "Tem cliente escapando."; tx.textContent = "Você já tem uma base, mas ainda há buracos por onde clientes vão para o concorrente. Vamos fechar cada um."; }
    else { v.textContent = "Muito bem. Agora é acelerar."; tx.textContent = "Sua presença está no caminho. O próximo passo é crescer: mais conteúdo, mais avaliações, mais contatos."; }
    const msg = probs.length
      ? `Olá! Fiz o diagnóstico no site e minha presença digital tirou nota ${nota}/10 (${probs.join(", ")}). Quero meu plano grátis!`
      : `Olá! Fiz o diagnóstico no site e tirei nota ${nota}/10. Quero acelerar meu crescimento!`;
    const cta = quiz.querySelector(".js-wa-quiz"); cta.href = waLink(msg); ext(cta);
    res.focus({ preventScroll: true });
  };
  quiz.addEventListener("click", (e) => {
    const o = e.target.closest(".opt"); if (!o) return;
    pts += Number(o.dataset.points || 0);
    if (o.dataset.label) probs.push(o.dataset.label);
    i++;
    if (i < qs.length) { show(); qs[i].querySelector(".opt").focus({ preventScroll: true }); } else finish();
  });
  quiz.querySelector("[data-restart]").addEventListener("click", () => {
    i = 0; pts = 0; probs = []; res.hidden = true; top.hidden = false; show();
    qs[0].querySelector(".opt").focus({ preventScroll: true });
  });
  show();
}

/* Revelar ao rolar */
if (!reduce && "IntersectionObserver" in window) {
  const els = document.querySelectorAll(".pcard, .tile, .steps li, .plan, .voice__fig, details, .qcard, .problem__title, .solutions .h2, .how .h2");
  els.forEach((el) => el.classList.add("rv"));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => io.observe(el));
}

/* Cartões de clientes */
const cg = document.getElementById("clientsGrid");
if (cg && Array.isArray(CLIENTES)) {
  const e = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  cg.innerHTML = CLIENTES.map((c) => {
    const dom = c.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const ini = c.nome.split(/\s+/).filter((w) => w.length > 2 || /^[A-Z]/.test(w)).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const vis = c.foto ? `<img src="${e(c.foto)}" alt="" loading="lazy">` : `<span class="client__mono" aria-hidden="true">${e(ini)}</span>`;
    return `<a class="client" href="${e(c.url)}" target="_blank" rel="noopener">
      <span class="client__shot"><span class="client__bar" aria-hidden="true"><i></i><i></i><i></i><em>${e(dom)}</em></span><span class="client__view">${vis}</span></span>
      <span class="client__body"><span class="client__name">${e(c.nome)}</span>${c.ramo ? `<span class="client__ramo">${e(c.ramo)}</span>` : ""}<span class="client__url">Ver site <span aria-hidden="true">↗</span></span></span>
    </a>`;
  }).join("") + `<a class="client client--next js-wa" href="${waLink("Olá! Quero ser o próximo cliente da Criativa+.")}" target="_blank" rel="noopener"><span class="client__plus" aria-hidden="true">+</span><span class="client__name">O próximo pode ser o seu</span><span class="client__url">Falar no WhatsApp →</span></a>`;
}
