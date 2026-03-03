let produtos = [];
let page = 1;
const perPage = 8;

function formatPrice(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

function getCard(prod) {
  const msg = `Olá! Tenho interesse no ${prod.nome} por ${formatPrice(prod.preco)} (${prod.condicao}). Link: ${location.origin}${location.pathname.replace('catalogo.html','')}produto.html?id=${prod.id}`;
  return `<article class="product-card">
    <img src="${prod.imagens[0]}" alt="${prod.nome}" loading="lazy">
    <div class="product-card-body">
      <strong>${prod.nome}</strong>
      <div class="product-meta">
        <span class="badge badge-cond">${prod.condicao}</span>
        ${prod.selo === 'Oferta' ? '<span class="badge badge-offer">Oferta</span>' : '<span class="badge badge-hit">Mais vendido</span>'}
      </div>
      <span class="small">${prod.armazenamento} • ${prod.cor} • Bateria: ${prod.bateria}</span>
      <div class="price">A partir de ${formatPrice(prod.preco)}</div>
      <div class="card-actions">
        <a class="btn btn-outline" href="produto.html?id=${prod.id}">Ver detalhes</a>
        <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waLink(msg)}">Chamar no WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function applyFilters(list) {
  const q = document.getElementById('search').value.toLowerCase();
  const marca = document.getElementById('fMarca').value;
  const modelo = document.getElementById('fModelo').value.toLowerCase();
  const condicao = document.getElementById('fCondicao').value;
  const preco = document.getElementById('fPreco').value;
  const armazenamento = document.getElementById('fArmazenamento').value;
  const cor = document.getElementById('fCor').value.toLowerCase();
  const ord = document.getElementById('fOrdenar').value;

  let filtered = list.filter(p => {
    const priceOk = !preco || (preco === '0-2000' ? p.preco <= 2000 : preco === '2000-4000' ? p.preco > 2000 && p.preco <= 4000 : p.preco > 4000);
    return (!q || `${p.nome} ${p.modelo} ${p.marca}`.toLowerCase().includes(q))
      && (!marca || p.marca === marca)
      && (!modelo || p.modelo.toLowerCase().includes(modelo))
      && (!condicao || p.condicao === condicao)
      && priceOk
      && (!armazenamento || p.armazenamento === armazenamento)
      && (!cor || p.cor.toLowerCase().includes(cor));
  });

  filtered.sort((a,b)=> ord==='maior-preco'? b.preco-a.preco : ord==='mais-recente'? b.id.localeCompare(a.id) : a.preco-b.preco);
  return filtered;
}

function render(reset = true) {
  const grid = document.getElementById('productsGrid');
  const result = applyFilters(produtos);
  const sliced = result.slice(0, page * perPage);
  grid.innerHTML = sliced.map(getCard).join('') || '<p>Nenhum produto encontrado. Ajuste os filtros.</p>';
  document.getElementById('loadMore').style.display = sliced.length < result.length ? 'inline-flex' : 'none';
}

async function initCatalogo() {
  const res = await fetch('assets/data/produtos.json');
  produtos = await res.json();

  const models = [...new Set(produtos.map(p=>p.modelo))];
  const stores = [...new Set(produtos.map(p=>p.armazenamento))].filter(v=>v!=='-');
  document.getElementById('fModelo').innerHTML += models.map(m=>`<option value="${m}">${m}</option>`).join('');
  document.getElementById('fArmazenamento').innerHTML += stores.map(s=>`<option value="${s}">${s}</option>`).join('');

  document.querySelectorAll('.catalog-controls input,.catalog-controls select').forEach(el => {
    el.addEventListener('input', ()=> { page = 1; render(); });
    el.addEventListener('change', ()=> { page = 1; render(); });
  });

  document.getElementById('loadMore').addEventListener('click', ()=>{ page++; render(false); });
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsGrid')) initCatalogo();
});
