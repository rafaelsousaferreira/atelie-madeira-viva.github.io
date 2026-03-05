// ========================================
// HOME.JS - Versão com Carrossel de Produtos
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js iniciado');
  
  // Carrega produtos e depoimentos
  setTimeout(() => {
    carregarProdutosDestaque();
    carregarDepoimentosHome();
    iniciarSlider();
    initVideoControls();
  }, 300);
});

// ========================================
// CARROSSEL DE PRODUTOS
// ========================================

function carregarProdutosDestaque() {
  console.log('🔍 Configurando carrossel de produtos...');
  
  // Verifica se productsDB existe
  if (typeof productsDB === 'undefined') {
    console.error('❌ productsDB não existe!');
    return;
  }
  
  console.log('📦 productsDB tem', productsDB.length, 'produtos');
  
  // Pega produtos com destaque ou os primeiros 8
  let produtos = productsDB.filter(p => p.destaque === true);
  if (produtos.length === 0) {
    produtos = productsDB.slice(0, 8);
  } else {
    produtos = produtos.slice(0, 8);
  }
  
  // Cria a estrutura do carrossel
  criarEstruturaCarrossel(produtos);
}

function criarEstruturaCarrossel(produtos) {
  // Encontra a seção de produtos
  const secao = document.querySelector('.featured-products-section');
  if (!secao) {
    console.error('❌ Seção de produtos não encontrada');
    return;
  }
  
  const container = secao.querySelector('.container');
  if (!container) return;
  
  // Remove conteúdo antigo
  const existingCarousel = document.querySelector('.products-carousel-container');
  if (existingCarousel) existingCarousel.remove();
  
  // Cria o HTML do carrossel
  const carouselHTML = `
    <div class="products-carousel-container" style="position: relative; margin: 2rem 0;">
      <!-- Carrossel wrapper -->
      <div class="carousel-wrapper" style="overflow: hidden; border-radius: 20px;">
        <div class="carousel-track" id="products-track" style="display: flex; transition: transform 0.5s ease; gap: 20px;">
          ${produtos.map(produto => criarCardProduto(produto)).join('')}
        </div>
      </div>
      
      <!-- Botões de navegação -->
      <button class="carousel-btn prev" id="products-prev" style="position: absolute; top: 50%; left: -20px; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: var(--madeira-media); border: none; color: white; font-size: 1.2rem; cursor: pointer; z-index: 10; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-btn next" id="products-next" style="position: absolute; top: 50%; right: -20px; transform: translateY(-50%); width: 45px; height: 45px; border-radius: 50%; background: var(--madeira-media); border: none; color: white; font-size: 1.2rem; cursor: pointer; z-index: 10; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
        <i class="fas fa-chevron-right"></i>
      </button>
      
      <!-- Dots indicadores -->
      <div class="carousel-dots" id="products-dots" style="display: flex; justify-content: center; gap: 10px; margin-top: 2rem;"></div>
    </div>
    
    <!-- Botão ver todos -->
    <div style="text-align: center; margin-top: 2rem;">
      <a href="produtos.html" class="btn-secondary" style="display: inline-flex; align-items: center; gap: 10px; background: transparent; border: 3px solid var(--madeira-media); color: var(--madeira-escura); padding: 1rem 2.5rem; border-radius: 60px; font-size: 1.2rem; font-weight: 600; text-decoration: none; transition: all 0.3s;">
        <i class="fas fa-search"></i> Ver todos os produtos
      </a>
    </div>
  `;
  
  // Remove o título antigo e insere o carrossel
  const titulo = container.querySelector('h2');
  if (titulo) {
    titulo.insertAdjacentHTML('afterend', carouselHTML);
  }
  
  // Inicializa o carrossel
  setTimeout(() => {
    inicializarCarrossel();
  }, 100);
}

function criarCardProduto(produto) {
  // Pega a primeira imagem ou usa placeholder
  const imagemUrl = produto.imagens && produto.imagens.length > 0 
    ? produto.imagens[0] 
    : null;
  
  const estiloImagem = imagemUrl 
    ? `background-image: url('${imagemUrl}'); background-size: cover; background-position: center;` 
    : 'background: linear-gradient(145deg, #d9c5b0, #b28b6f);';
  
  return `
    <div class="product-card" onclick="window.location.href='produto.html?id=${produto.id}'" style="flex: 0 0 calc(25% - 15px); min-width: 250px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s; border: 1px solid #e2cfbc;">
      <span class="product-badge" style="position: absolute; top: 10px; right: 10px; background: var(--madeira-media); color: white; padding: 0.3rem 0.8rem; border-radius: 30px; font-size: 0.8rem; z-index: 2;">Destaque</span>
      <div class="product-image" style="height: 200px; ${estiloImagem}"></div>
      <div class="product-info" style="padding: 1.5rem;">
        <div class="product-category" style="color: var(--madeira-media); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem;">${getCategoriaNome(produto.categoria)}</div>
        <h3 class="product-title" style="font-size: 1.2rem; color: var(--madeira-escura); margin-bottom: 0.5rem;">${produto.nome}</h3>
        <p class="product-description" style="color: #5a4a3a; font-size: 0.9rem; margin-bottom: 0.5rem;">${produto.descricao.substring(0, 60)}...</p>
        <div class="product-price" style="font-size: 1.3rem; font-weight: 600; color: var(--madeira-escura);">R$ ${produto.preco.toFixed(2)}</div>
      </div>
    </div>
  `;
}

function inicializarCarrossel() {
  const track = document.getElementById('products-track');
  const prevBtn = document.getElementById('products-prev');
  const nextBtn = document.getElementById('products-next');
  const dotsContainer = document.getElementById('products-dots');
  
  if (!track || !prevBtn || !nextBtn) {
    console.error('❌ Elementos do carrossel não encontrados');
    return;
  }
  
  const cards = track.children;
  if (cards.length === 0) return;
  
  let currentIndex = 0;
  const gap = 20; // gap entre cards
  const cardsPerView = 4; // 4 cards por vez
  
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  // Cria dots
  function criarDots() {
    if (!dotsContainer) return;
    
    const totalDots = Math.ceil(cards.length / cardsPerView);
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot';
      dot.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--madeira-clara);
        cursor: pointer;
        transition: all 0.3s;
        border: 2px solid transparent;
        ${i === 0 ? 'background: var(--madeira-media); transform: scale(1.3);' : ''}
      `;
      
      dot.addEventListener('click', () => {
        currentIndex = i * cardsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        atualizarCarrossel();
        atualizarDots();
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Atualiza posição do carrossel
  function atualizarCarrossel() {
    const cardWidth = cards[0].offsetWidth;
    const translateX = -(currentIndex * (cardWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
  }
  
  // Atualiza dots ativos
  function atualizarDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.children;
    const page = Math.floor(currentIndex / cardsPerView);
    
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (i === page) {
        dot.style.background = 'var(--madeira-media)';
        dot.style.transform = 'scale(1.3)';
      } else {
        dot.style.background = 'var(--madeira-clara)';
        dot.style.transform = 'scale(1)';
      }
    }
  }
  
  // Event listeners dos botões
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - cardsPerView);
      atualizarCarrossel();
      atualizarDots();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex = Math.min(maxIndex, currentIndex + cardsPerView);
      atualizarCarrossel();
      atualizarDots();
    }
  });
  
  // Autoplay
  let autoplayInterval = setInterval(() => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    atualizarCarrossel();
    atualizarDots();
  }, 5000);
  
  // Pausa autoplay no hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', () => {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      atualizarCarrossel();
      atualizarDots();
    }, 5000);
  });
  
  // Inicializa
  criarDots();
  
  // Responsividade
  window.addEventListener('resize', () => {
    currentIndex = 0;
    atualizarCarrossel();
    atualizarDots();
  });
  
  console.log('✅ Carrossel inicializado com', cards.length, 'produtos');
}

// ========================================
// DEPOIMENTOS (GRID SIMPLES)
// ========================================

function carregarDepoimentosHome() {
  console.log('💬 Carregando depoimentos...');
  
  const grid = document.getElementById('home-testimonials-grid');
  if (!grid) {
    console.error('❌ Grid de depoimentos não encontrado');
    return;
  }
  
  if (typeof testimonialsDB === 'undefined') {
    console.error('❌ testimonialsDB não existe!');
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem; color:#dc3545;">Erro ao carregar depoimentos</div>';
    return;
  }
  
  console.log('✅ testimonialsDB tem', testimonialsDB.length, 'depoimentos');
  
  // Pega os 3 primeiros depoimentos
  const depoimentos = testimonialsDB.slice(0, 3);
  
  if (depoimentos.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">Nenhum depoimento ainda</div>';
    return;
  }
  
  let html = '';
  
  for (let i = 0; i < depoimentos.length; i++) {
    const d = depoimentos[i];
    const stars = '★'.repeat(d.avaliacao) + '☆'.repeat(5 - d.avaliacao);
    
    html += `
      <div class="testimonial-card" style="background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: 1px solid #e2cfbc;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--madeira-media); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">${d.nome.charAt(0).toUpperCase()}</div>
          <div>
            <h4 style="color: var(--madeira-escura); margin: 0;">${d.nome}</h4>
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
  console.log('✅ Depoimentos renderizados:', depoimentos.length);
}

// ========================================
// SLIDER PRINCIPAL
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
// VÍDEO
// ========================================

function initVideoControls() {
  const playBtn = document.getElementById('video-play-pause');
  const muteBtn = document.getElementById('video-mute');
  
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const icon = playBtn.querySelector('i');
      if (icon.classList.contains('fa-play')) {
        icon.className = 'fas fa-pause';
      } else {
        icon.className = 'fas fa-play';
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
