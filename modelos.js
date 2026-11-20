/* ============================================
   VITRINE DE MODELOS — edite aqui
   ============================================
   DEMOS_NO_AR: deixe false enquanto os sites de demonstração não estiverem
   publicados. Com false, o botão de cada estilo abre o WhatsApp pedindo
   para ver o modelo. Quando os demos estiverem no ar, troque para true e
   os botões abrem o endereço de cada um.
*/
const DEMOS_NO_AR = false;
const DOMINIO = "agenciamaiscriativa.com.br";

const A = "Agendamento pelo WhatsApp", O = "Pedido de orçamento com fotos", V = "Orçamento com visita técnica",
  U = "Atendimento de urgência", D = "Orçamento por data do evento", X = "Aula experimental e planos",
  P = "Cardápio e pedido com carrinho", K = "Catálogo com fotos e preços";
const TODOS = ["Casamento", "15 anos", "Formatura", "Infantil", "Corporativo"];
const CQFC = ["Casamento", "15 anos", "Formatura", "Corporativo"], CQF = ["Casamento", "15 anos", "Formatura"];

// Modelos prontos: [estilo, nome da empresa fictícia, descrição]
const PRONTOS = {
  barbeiro: [["Premium", "Imperial Barber", "Preto e dourado, clima de barbearia clássica"], ["Urban", "Distrito Barber", "Preto e laranja, pegada urbana"], ["Classic", "Barbearia Dom Antônio", "Bege, vinho e verde, tradicional"]],
  manicure: [["Luxe", "Maison Rosé Nail Studio", "Nude, rosé e dourado"], ["Pop", "Glam Pop Nails", "Pink, lilás e amarelo"], ["Botanic", "Jasmim Mãos & Pés", "Sálvia, terracota e off-white"]],
  "banho-e-tosa": [["Alegre", "Bicho Feliz Pet Shop", "Azul-céu, amarelo e coral"], ["Boutique", "Le Chien Pet Spa", "Grafite, creme e dourado"], ["Natural", "Quintal Verde Pet & Vet", "Verde-folha, areia e terracota"]],
  doces: [["Vintage", "Doce Afeto Confeitaria", "Rosa antigo, creme e chocolate"], ["Gourmet", "Maison Cacau Pâtisserie", "Chocolate, caramelo e dourado"], ["Candy", "Fatia Feliz Doceria", "Pink, menta, amarelo e lilás"]],
  marceneiro: [["Galeria", "Casa Nogueira Planejados", "Escuro, fotos em tela cheia"], ["Caramelo", "Oficina Peroba", "Creme e caramelo, acolhedor"], ["Linho", "Atelier Lâmina", "Editorial claro, títulos grandes"]],
  festas: [["Clássico", "Quinta das Hortênsias", "Elegante, para casamentos e 15 anos"], ["Moderno", "Espaço Aurora", "Contemporâneo, para eventos e corporativo"], ["Infantil", "Planeta Alegria", "Colorido, para festas infantis"]],
  veiculos: [["Estilo único", "Prime Motors", "Estoque com fotos e simulador de financiamento"]],
};

// [nome, slug, categoria, forma de contato, tags de evento]
const R = [
  ["Eletricista","eletricista","casa",V],["Encanador","encanador","casa",U],["Pintor","pintor","casa",V],["Marceneiro","marceneiro","casa",V],["Pedreiro","pedreiro","casa",V],["Serralheiro","serralheiro","casa",O],
  ["Vidraceiro","vidraceiro","casa",O],["Gesseiro","gesseiro","casa",V],["Chaveiro","chaveiro","servicos",U],["Ar-condicionado","ar-condicionado","casa","Instalação e manutenção"],["Informática","informatica","tec","Assistência técnica"],
  ["Celular","celular","tec","Conserto com orçamento rápido"],["Montador de móveis","montador-de-moveis","casa",O],["Jardineiro","jardineiro","casa",V],["Diarista","diarista","servicos","Orçamento por dia ou por casa"],
  ["Dedetização","dedetizacao","casa",V],["Mecânico","mecanico","auto","Orçamento e agendamento"],["Borracheiro","borracheiro","auto",U],["Lava-jato","lava-jato","auto",A],["Cabeleireiro","cabeleireiro","beleza",A],
  ["Manicure","manicure","beleza",A],["Barbeiro","barbeiro","beleza",A],["Esteticista","esteticista","beleza",A],["Personal trainer","trainer","saude",X],["Fotógrafo","fotografo","eventos","Portfólio e orçamento de ensaio",TODOS],
  ["Mudanças","mudancas","servicos",O],["Costureira","costureira","servicos",O],["Aulas particulares","aulas-particulares","educacao","Aula experimental pelo WhatsApp"],["Doces","doces","alimentacao",P],["Banho e tosa","banho-e-tosa","pets",A],
  ["Dentista","dentista","saude",A],["Psicólogo","psicologo","saude","Agendamento presencial ou online"],["Fisioterapeuta","fisioterapeuta","saude",A],["Nutricionista","nutricionista","saude","Agendamento presencial ou online"],
  ["Estúdio de pilates","pilates","saude",X],["Massoterapeuta","massoterapeuta","saude",A],["Sobrancelhas e cílios","sobrancelhas-e-cilios","beleza",A],["Maquiadora","maquiadora","beleza","Orçamento para eventos e noivas",CQF],
  ["Tatuador","tatuador","beleza","Portfólio e orçamento"],["Desentupidora","desentupidora","casa",U],["Câmeras e alarmes","cameras-e-alarmes","casa",V],["Energia solar","energia-solar","casa","Orçamento pela conta de luz"],
  ["Limpeza de sofá","limpeza-de-sofa","casa",O],["Marido de aluguel","marido-de-aluguel","casa","Orçamento de pequenos reparos"],["Redes de proteção","redes-de-protecao","casa","Orçamento com medidas"],
  ["Conserto de eletrodomésticos","eletrodomesticos","tec","Assistência técnica"],["Guincho e reboque","guincho","auto",U],["Autoescola","autoescola","educacao","Matrícula e planos"],["Funilaria e pintura","funilaria","auto",O],
  ["Clínica veterinária","veterinario","pets","Consultas e emergência"],["Adestrador","adestrador","pets","Aula experimental"],["Marmitaria","marmitaria","alimentacao",P],["DJ e som","dj","eventos",D,CQFC],
  ["Brinquedos para festa","brinquedos-para-festa","eventos",D,["Infantil"]],["Contador","contador","servicos","Orçamento e contato"],["Academia","academia","saude",X],["Imobiliária","imobiliaria","imoveis","Imóveis à venda e para alugar, com fotos"],
  ["Cerimonialista","cerimonialista","eventos",D,CQFC],["Celebrante","celebrante","eventos",D,["Casamento"]],["Coreógrafo","coreografo","eventos","Pacotes de ensaios por data",CQF],["Buffet","buffet","eventos","Orçamento por convidado e data",TODOS],
  ["Bartender e drinks","bartender","eventos",D,CQFC],["Bolos e bem-casados","bolos-e-bem-casados","eventos",P,["Casamento","15 anos"]],["Decoração de festas","decoracao-de-festas","eventos",D,TODOS],
  ["Florista","florista","eventos",D,["Casamento","15 anos","Corporativo"]],["Iluminação e telão","iluminacao-e-telao","eventos",D,CQFC],["Filmagem / videomaker","videomaker","eventos",D,CQFC],
  ["Banda e músicos","banda-e-musicos","eventos",D,["Casamento","Corporativo"]],["Cabine de fotos","cabine-de-fotos","eventos",D,CQFC],["Recreação infantil","recreacao-infantil","eventos",D,["Infantil","Casamento"]],
  ["Aluguel de trajes","aluguel-de-trajes","eventos","Catálogo e prova com hora marcada",CQF],["Convites e papelaria","convites","eventos","Orçamento por quantidade",["Casamento","15 anos","Formatura","Infantil"]],
  ["Lembrancinhas","lembrancinhas","eventos","Orçamento por quantidade",["Casamento","15 anos","Infantil"]],["Carro para noivos","carro-para-noivos","eventos",D,["Casamento","15 anos"]],["Valet / manobrista","valet","eventos",D,CQFC],
  ["Garçons e equipe","garcons","eventos",D,TODOS],["Salão de festas","festas","eventos","Simulador de orçamento e datas",TODOS],["Loja de veículos","veiculos","auto","Estoque com fotos e financiamento"],
  ["Arquiteto","arquiteto","casa","Portfólio e orçamento de projeto"],["Designer de interiores","designer-de-interiores","casa","Portfólio e orçamento de projeto"],["Piscineiro","piscineiro","casa","Orçamento e planos mensais"],
  ["Cortinas e persianas","cortinas-e-persianas","casa","Orçamento com medidas"],["Impermeabilização","impermeabilizacao","casa",V],["Telhados e calhas","telhados-e-calhas","casa",V],["Tapeceiro","tapeceiro","casa",O],
  ["Cuidador de idosos","cuidador-de-idosos","servicos","Orçamento por plantão"],["Babá","baba","servicos","Orçamento por hora ou mensal"],["Lavanderia","lavanderia","servicos","Pedido com coleta e entrega"],
  ["Sapateiro","sapateiro","servicos",O],["Despachante","despachante","servicos","Orçamento por serviço"],["Gráfica rápida","grafica","servicos","Orçamento por quantidade"],["Ótica","otica","lojas",K],
  ["Escola de idiomas","escola-de-idiomas","educacao",X],["Escola de música","escola-de-musica","educacao",X],["Escolinha de futebol","escolinha-de-futebol","educacao",X],["Estúdio de dança","estudio-de-danca","educacao",X],
  ["Yoga","yoga","saude",X],["Podólogo","podologo","saude",A],["Depilação","depilacao","beleza",A],["Hotel e creche para cães","hotel-para-caes","pets","Reserva de diárias"],["Dog walker","dog-walker","pets","Planos de passeio"],
  ["Restaurante e delivery","restaurante","alimentacao",P],["Padaria","padaria","alimentacao","Encomendas e cardápio"],["Food truck","food-truck","alimentacao",D],["Insulfilm e som automotivo","insulfilm","auto",O],
  ["Motoboy e entregas","motoboy","servicos","Orçamento por entrega"],["Loja de roupas","loja-de-roupas","lojas",K],
];
const CATS = [["todas","Todas"],["beleza","Beleza"],["saude","Saúde e bem-estar"],["casa","Casa e reformas"],["auto","Automotivo"],["tec","Tecnologia"],["pets","Pets"],["eventos","Eventos"],["educacao","Educação"],["alimentacao","Alimentação"],["imoveis","Imóveis"],["lojas","Lojas"],["servicos","Serviços"]];
const catNome = Object.fromEntries(CATS);

const WA_NUM = (typeof CONFIG !== "undefined" && CONFIG.whatsapp) || "5521970084480";
const wa = (msg) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let cat = "todas", tag = "todos", q = "", sel = null;
const $ = (id) => document.getElementById(id);

function drawChips() {
  $("chips").innerHTML = CATS.map(([id, l]) => `<button type="button" class="chip" data-cat="${id}" aria-pressed="${id === cat}">${l}</button>`).join("");
  const tg = $("tags");
  tg.classList.toggle("on", cat === "eventos");
  tg.innerHTML = "<strong>Tipo de evento:</strong>" + ["todos", ...TODOS].map((t) => `<button type="button" class="chip" data-tag="${t}" aria-pressed="${t === tag}">${t === "todos" ? "Todos" : t}</button>`).join("");
}

function stylesPanel(r) {
  const list = PRONTOS[r[1]];
  const items = list.map(([estilo, empresa, desc]) => {
    const sub = `${r[1]}-${norm(estilo).replace(/[^a-z0-9]+/g, "-")}`;
    const href = DEMOS_NO_AR ? `https://${sub}.${DOMINIO}` : wa(`Olá! Quero ver o modelo ${estilo} de site para ${r[0].toLowerCase()} (${empresa}).`);
    const label = DEMOS_NO_AR ? "Abrir modelo →" : "Ver este modelo →";
    return `<div class="st"><b>${esc(estilo)}</b><span><strong style="color:#fff">${esc(empresa)}</strong></span><span>${esc(desc)}</span><a class="btn btn--y btn--sm" href="${href}" target="_blank" rel="noopener">${label}</a></div>`;
  }).join("");
  return `<div class="styles on" id="panel"><h3>${esc(r[0])}: ${list.length > 1 ? list.length + " estilos prontos" : "modelo pronto"}</h3><p>${DEMOS_NO_AR ? "Abra o modelo e veja funcionando, no computador ou no celular." : "Escolha um estilo e a gente te manda o modelo funcionando pelo WhatsApp."}</p><div class="stgrid">${items}</div></div>`;
}

function render() {
  const nq = norm(q.trim());
  const rows = R.filter((r) => {
    if (!nq && cat !== "todas" && r[2] !== cat) return false;
    if (!nq && cat === "eventos" && tag !== "todos" && !(r[4] && r[4].includes(tag))) return false;
    if (nq && !norm(r[0]).includes(nq) && !r[1].includes(nq)) return false;
    return true;
  }).sort((a, b) => (PRONTOS[b[1]] ? 1 : 0) - (PRONTOS[a[1]] ? 1 : 0));
  let html = "";
  rows.forEach((r) => {
    const ok = !!PRONTOS[r[1]];
    html += `<article class="rc${ok ? " ready" : ""}${sel === r[1] ? " sel" : ""}" id="r-${r[1]}">
      <div class="rc__top"><span class="rc__cat">${catNome[r[2]]}</span><span class="badge ${ok ? "badge--ok" : "badge--soon"}">${ok ? "Modelo pronto" : "Sob medida"}</span></div>
      <h3>${esc(r[0])}</h3><p>${esc(r[3])}</p>${r[4] ? `<p class="evt">${r[4].join(" · ")}</p>` : ""}
      <div class="rc__act">${ok
        ? `<button type="button" class="btn btn--k btn--sm" data-open="${r[1]}" aria-expanded="${sel === r[1]}">${sel === r[1] ? "Fechar" : "Ver modelos →"}</button>`
        : `<a class="btn btn--outline btn--sm" href="${wa(`Olá! Quero um site para ${r[0].toLowerCase()}.`)}" target="_blank" rel="noopener">Quero um site assim →</a>`}</div>
    </article>`;
    if (sel === r[1]) html += stylesPanel(r);
  });
  $("grid").innerHTML = html;
  const prontos = rows.filter((r) => PRONTOS[r[1]]).length;
  $("count").textContent = `${rows.length} ramos · ${prontos} com modelo pronto`;
  $("empty").classList.toggle("on", rows.length === 0);
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.cat) { cat = b.dataset.cat; tag = "todos"; drawChips(); render(); }
  else if (b.dataset.tag) { tag = b.dataset.tag; drawChips(); render(); }
  else if (b.dataset.open) {
    sel = sel === b.dataset.open ? null : b.dataset.open; render();
    if (sel) { const p = document.getElementById("panel"); p && p.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }
});
$("busca").addEventListener("input", (e) => { q = e.target.value; render(); });

// Abre direto num ramo: modelos.html?ramo=barbeiro (ou /modelos/barbeiro, redirecionado pela Vercel)
const pre = new URLSearchParams(location.search).get("ramo");
if (pre) {
  const r = R.find((x) => x.slug === pre || x[1] === pre);
  if (r) { if (PRONTOS[r[1]]) sel = r[1]; else q = r[0]; $("busca").value = q; }
}
drawChips(); render();
if (sel) setTimeout(() => document.getElementById("r-" + sel)?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
