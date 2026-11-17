/* ============================================
   CONFIGURAÇÃO — edite só aqui
   ============================================ */
const CONFIG = {
  // WhatsApp com DDI + DDD + número, só dígitos. Ex.: 5511999998888
  whatsapp: "5521970084480",
  // Usuário do Instagram, sem @
  instagram: "seuinstagram",
  // E-mail de contato
  email: "contato@seudominio.com.br",
};

/* Links de WhatsApp com mensagem pronta */
document.querySelectorAll(".js-wa").forEach((a) => {
  const msg = a.dataset.msg || "Olá! Vim pelo site.";
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll(".js-ig").forEach((a) => {
  a.href = `https://instagram.com/${CONFIG.instagram}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll(".js-mail").forEach((a) => {
  a.href = `mailto:${CONFIG.email}`;
});

/* Ano no rodapé */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* Menu mobile */
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
    menu.classList.toggle("is-open", !open);
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    })
  );
}

/* Header com sombra ao rolar */
const header = document.querySelector(".header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Digitação na barra de busca do hero */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typing = document.querySelector("[data-typing]");
if (typing && !reduce) {
  const terms = ["pizzaria perto de mim", "dentista perto de mim", "salão de beleza perto de mim", "oficina perto de mim"];
  let t = 0, i = terms[0].length, deleting = true;
  const tick = () => {
    const word = terms[t];
    i += deleting ? -1 : 1;
    typing.textContent = word.slice(0, i);
    let delay = deleting ? 35 : 70;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; t = (t + 1) % terms.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1200);
}

/* Revelar seções ao rolar */
if (!reduce && "IntersectionObserver" in window) {
  const els = document.querySelectorAll(".card, .steps__list li, .pain__list li, .price, details");
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
}
