function money(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});} 

async function initProduto(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return;
  const res = await fetch('assets/data/produtos.json');
  const produtos = await res.json();
  const p = produtos.find(x=>x.id===id);
  const wrap = document.getElementById('produtoDetalhe');
  if(!p){ wrap.innerHTML = '<p>Produto não encontrado.</p>'; return; }

  const msg = `Olá! Quero este produto: ${p.nome} | ${money(p.preco)} | ${p.condicao} | Link: ${location.href}`;
  wrap.innerHTML = `
  <div class="product-layout">
    <div class="gallery">
      <img id="mainImg" class="gallery-main" src="${p.imagens[0]}" alt="${p.nome}">
      <div class="gallery-thumbs">${p.imagens.map((img,i)=>`<img class="${i===0?'active':''}" src="${img}" alt="${p.nome} miniatura ${i+1}" data-img="${img}">`).join('')}</div>
    </div>
    <div class="hero-card">
      <h1>${p.nome}</h1>
      <p class="small">${p.descricao}</p>
      <div class="chips"><span class="chip">${p.condicao}</span><span class="chip">${p.armazenamento}</span><span class="chip">${p.cor}</span><span class="chip">Bateria ${p.bateria}</span></div>
      <h2 class="price">${money(p.preco)}</h2>
      <p><strong>Garantia:</strong> ${p.garantia}<br><strong>Estado:</strong> ${p.estado}<br><strong>O que acompanha:</strong> ${p.acompanha}</p>
      <div class="card-actions">
        <a class="btn btn-whatsapp" href="${waLink(msg)}" target="_blank" rel="noopener">Quero este produto</a>
        <a class="btn btn-outline" href="catalogo.html">Voltar ao catálogo</a>
      </div>
    </div>
  </div>
  <section class="section"><h2 class="section-title">FAQ deste produto</h2>
    <div class="faq-item"><h3>Tem nota e procedência?</h3><p>Sim. Trabalhamos com critérios de procedência e transparência em cada aparelho.</p></div>
    <div class="faq-item"><h3>Posso trocar meu usado?</h3><p>Sim. Enviamos avaliação prévia no WhatsApp e ajustamos a diferença.</p></div>
    <div class="faq-item"><h3>Entrega e retirada</h3><p>Retirada em loja e envio combinado no WhatsApp.</p></div>
  </section>`;

  document.querySelectorAll('.gallery-thumbs img').forEach(img=>img.addEventListener('click',()=>{
    document.getElementById('mainImg').src = img.dataset.img;
    document.querySelectorAll('.gallery-thumbs img').forEach(i=>i.classList.remove('active'));
    img.classList.add('active');
  }));
}

document.addEventListener('DOMContentLoaded', ()=>{ if(document.getElementById('produtoDetalhe')) initProduto(); });
