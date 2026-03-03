const CONFIG = {
  loja: 'Mi Apple BSB',
  whatsapp: '5561999999999',
  endereco: 'ENDEREÇO DA LOJA - EDITE AQUI',
  cnpj: '00.000.000/0001-00',
  horario: 'Seg a Sáb, 09h às 19h',
  instagram: 'https://instagram.com/SEUINSTAGRAM'
};

function waLink(message) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

function headerTemplate() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (file) => (path === file ? 'style="color:var(--text);font-weight:700;"' : '');
  return `
<header class="topbar">
  <div class="container nav" aria-label="Navegação principal">
    <a class="brand" href="index.html" aria-label="Mi Apple BSB - Início">
      <span class="brand-badge">M</span> Mi Apple BSB
    </a>
    <nav class="menu">
      <a ${isActive('index.html')} href="index.html">Início</a>
      <a ${isActive('catalogo.html')} href="catalogo.html">Catálogo</a>
      <a ${isActive('vender.html')} href="vender.html">Compra Seu Usado</a>
      <a href="vender.html#trocas">Trocas</a>
      <a ${isActive('catalogo.html')} href="catalogo.html#acessorios">Acessórios</a>
      <a ${isActive('sobre.html')} href="sobre.html">Sobre</a>
      <a ${isActive('avaliacoes.html')} href="avaliacoes.html">Avaliações</a>
      <a ${isActive('faq.html')} href="faq.html">FAQ</a>
      <a ${isActive('contato.html')} href="contato.html">Contato / WhatsApp</a>
    </nav>
    <div class="nav-actions">
      <button id="themeToggle" class="btn btn-outline" aria-label="Alternar tema">🌙</button>
      <a class="btn btn-primary" href="${waLink('Olá! Quero atendimento agora na Mi Apple BSB.')}" target="_blank" rel="noopener">WhatsApp</a>
      <button class="hamburger" id="hamburger" aria-label="Abrir menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="container mobile-menu" id="mobileMenu">
    <a href="index.html">Início</a><a href="catalogo.html">Catálogo</a><a href="vender.html">Compra Seu Usado</a>
    <a href="vender.html#trocas">Trocas</a><a href="catalogo.html#acessorios">Acessórios</a><a href="sobre.html">Sobre</a>
    <a href="avaliacoes.html">Avaliações</a><a href="faq.html">FAQ</a><a href="contato.html">Contato / WhatsApp</a>
  </div>
</header>`;
}

function footerTemplate() {
  return `<footer class="footer"><div class="container footer-grid">
    <div><strong>${CONFIG.loja}</strong><p>Compra e venda de celulares com foco em confiança e negociação rápida via WhatsApp.</p>
    <p>${CONFIG.endereco}<br>${CONFIG.horario}</p></div>
    <div><strong>Contato</strong><p>WhatsApp: (${CONFIG.whatsapp.slice(2,4)}) ${CONFIG.whatsapp.slice(4)}<br>CNPJ: ${CONFIG.cnpj}</p></div>
    <div><strong>Redes</strong><p><a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a><br><a href="faq.html">Perguntas Frequentes</a></p></div>
  </div></footer>`;
}

function initLayout() {
  const headerEl = document.getElementById('siteHeader');
  const footerEl = document.getElementById('siteFooter');
  if (headerEl) headerEl.innerHTML = headerTemplate();
  if (footerEl) footerEl.innerHTML = footerTemplate();

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  document.addEventListener('click', (e) => {
    if (e.target.id === 'hamburger') document.getElementById('mobileMenu')?.classList.toggle('open');
    if (e.target.id === 'themeToggle') {
      const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', now);
      localStorage.setItem('theme', now);
      e.target.textContent = now === 'dark' ? '☀️' : '🌙';
    }
  });

  const float = document.createElement('a');
  float.className = 'whatsapp-float';
  float.href = waLink('Olá! Vim pelo site e quero atendimento.');
  float.target = '_blank';
  float.rel = 'noopener';
  float.ariaLabel = 'Abrir WhatsApp';
  float.textContent = '✆';
  document.body.appendChild(float);
}

document.addEventListener('DOMContentLoaded', initLayout);
