// ========================================
// HOME.JS - Versão Ultra Simplificada
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js iniciado');
  
  // Carrega produtos e depoimentos imediatamente
  carregarProdutosDestaque();
  carregarDepoimentosHome();
  
  // Inicia slider se existir
  iniciarSlider();
});

// ========================================
// CARREGAR PRODUTOS (VERSÃO SIMPLIFICADA)
// ========================================

function carregarProdutosDestaque() {
  console.log('🔍 Procurando grid de produtos...');
  
  const grid = document.getElementById('home-products-grid');
  
  if (!grid) {
    console.error('❌ Grid de produtos NÃO ENCONTRADO!');
    console.log('Criando grid automaticamente...');
    criarGridProdutos();
    return;
  }
  
  console.log('✅ Grid de produtos encontrado!');
  
  // Verifica se productsDB existe
  if (typeof productsDB === 'undefined') {
    console.error('❌ productsDB não existe!');
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem; color:#dc3545;">Erro: Banco de produtos não carregado</div>';
    return;
  }
  
  console.log('📦 productsDB tem', productsDB.length, 'produtos');
  
  // Pega os primeiros 4 produtos (independente de destaque)
  const produtosParaMostrar = productsDB.slice(0, 4);
  
  console.log('📦 Mostrando', produtosParaMostrar.length, 'produtos');
  
  // Monta o HTML
  let html = '';
  
  for (let i = 0; i < produtosParaMostrar.length; i++) {
    const p = produtosParaMostrar[i];
    
    html += `
      <div onclick="window.location.href='produto.html?id=${p.id}'" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s; border: 1px solid #e2cfbc;">
        <div style="height: 200px; background: linear-gradient(145deg, #d9c5b0, #b28b6f); position: relative;">
          <span style="position: absolute; top: 10px; right: 10px; background: #b28b6f; color: white; padding: 0.3rem 0.8rem; border-radius: 30px; font-size: 0.8rem;">Destaque</span>
        </div>
        <div style="padding: 1.5rem;">
          <div style="color: #b28b6f; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem;">${getCategoriaNome(p.categoria)}</div>
          <h3 style="font-size: 1.2rem; color: #6b4f3a; margin-bottom: 0.5rem;">${p.nome}</h3>
          <p style="color: #5a4a3a; font-size: 0.9rem; margin-bottom: 0.5rem;">${p.descricao.substring(0, 60)}...</p>
          <div style="font-size: 1.3rem; font-weight: 600; color: #6b4f3a;">R$ ${p.preco.toFixed(2)}</div>
        </div>
      </div>
    `;
  }
  
  grid.innerHTML = html;
  console.log('✅ Produtos renderizados com sucesso!');
}

// ========================================
// CARREGAR DEPOIMENTOS (VERSÃO SIMPLIFICADA)
// ========================================

function carregarDepoimentosHome() {
  console.log('🔍 Procurando grid de depoimentos...');
  
  const grid = document.getElementById('home-testimonials-grid');
  
  if (!grid) {
    console.error('❌ Grid de depoimentos NÃO ENCONTRADO!');
    return;
  }
  
  console.log('✅ Grid de depoimentos encontrado!');
  
  if (typeof testimonialsDB === 'undefined') {
    console.error('❌ testimonialsDB não existe!');
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem; color:#dc3545;">Erro: Banco de depoimentos não carregado</div>';
    return;
  }
  
  console.log('💬 testimonialsDB tem', testimonialsDB.length, 'depoimentos');
  
  // Pega os 3 primeiros depoimentos
  const depoimentosParaMostrar = testimonialsDB.slice(0, 3);
  
  console.log('💬 Mostrando', depoimentosParaMostrar.length, 'depoimentos');
  
  let html = '';
  
  for (let i = 0; i < depoimentosParaMostrar.length; i++) {
    const d = depoimentosParaMostrar[i];
    const stars = '★'.repeat(d.avaliacao) + '☆'.repeat(5 - d.avaliacao);
    
    html += `
      <div style="background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: 1px solid #e2cfbc;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: #b28b6f; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">${d.nome.charAt(0).toUpperCase()}</div>
          <div>
            <h4 style="color: #6b4f3a; margin: 0;">${d.nome}</h4>
            <p style="color: #8b6f58; margin: 0; font-size: 0.9rem;">${d.cidade || 'Cliente'}</p>
          </div>
        </div>
        <div style="color: #ffc107; font-size: 1.1rem; margin-bottom: 0.5rem;">${stars}</div>
        <div style="background: #f9f2ea; padding: 0.3rem 1rem; border-radius: 30px; font-size: 0.9rem; display: inline-block; margin-bottom: 1rem;">${d.produtoNome}</div>
        <p style="color: #5a4a3a; font-style: italic; line-height: 1.6;">"${d.comentario.substring(0, 100)}..."</p>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2cfbc; color: #8b6f58; font-size: 0.9rem;">${formatarData(d.data)}</div>
      </div>
    `;
  }
  
  grid.innerHTML = html;
  console.log('✅ Depoimentos renderizados com sucesso!');
}

// ========================================
// SLIDER (OPCIONAL)
// ========================================

function iniciarSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  
  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    showSlide((currentSlide + 1) % totalSlides);
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Autoplay
  setInterval(() => {
    showSlide((currentSlide + 1) % totalSlides);
  }, 7000);
}

// ========================================
// VÍDEO (OPCIONAL)
// ========================================

function initVideoControls() {
  const playBtn = document.getElementById('video-play-pause');
  const muteBtn = document.getElementById('video-mute');
  const video = document.getElementById('youtube-video');
  
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const icon = playBtn.querySelector('i');
      if (icon.classList.contains('fa-play')) {
        icon.className = 'fas fa-pause';
        // Aqui você adicionaria a lógica de play do vídeo
      } else {
        icon.className = 'fas fa-play';
        // Aqui você adicionaria a lógica de pause
      }
    });
  }
  
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const icon = muteBtn.querySelector('i');
      if (icon.classList.contains('fa-volume-mute')) {
        icon.className = 'fas fa-volume-up';
      } else {
        icon.className = 'fas fa-volume-mute';
      }
    });
  }
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function getCategoriaNome(cat) {
  const nomes = {
    'utensilios': 'Utensílios',
    'mobiliario': 'Mobiliário',
    'organizacao': 'Organização',
    'jardinagem': 'Jardinagem',
    'decoracao': 'Decoração',
    'plantas-vivas': 'Plantas Vivas'
  };
  return nomes[cat] || cat;
}

function formatarData(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
}

// Função de emergência para criar o grid se ele não existir
function criarGridProdutos() {
  console.log('🆘 Criando grid de produtos automaticamente...');
  
  const secao = document.querySelector('.featured-products-section');
  if (!secao) return;
  
  const container = secao.querySelector('.container');
  if (!container) return;
  
  // Remove loading antigo se existir
  const oldGrid = document.getElementById('home-products-grid');
  if (oldGrid) oldGrid.remove();
  
  // Cria novo grid
  const novoGrid = document.createElement('div');
  novoGrid.id = 'home-products-grid';
  novoGrid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 2rem 0;';
  novoGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">Carregando...</div>';
  
  // Insere no lugar certo
  const titulo = container.querySelector('h2');
  if (titulo) {
    titulo.insertAdjacentElement('afterend', novoGrid);
  } else {
    container.appendChild(novoGrid);
  }
  
  console.log('✅ Grid criado com sucesso!');
  
  // Tenta carregar os produtos novamente
  setTimeout(carregarProdutosDestaque, 100);
}

// Inicia controles de vídeo
initVideoControls();
