// ========================================
// HOME.JS - Versão Simplificada
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js iniciado');
  
  // Inicializa componentes
  setTimeout(() => {
    initHeroSlider();
    initVideoControls();
    loadFeaturedProducts();
    loadHomeTestimonials();
  }, 500);
});

// ========================================
// 1. HERO SLIDER
// ========================================

let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const totalSlides = slides.length;

function initHeroSlider() {
  if (slides.length === 0) return;
  
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  startSlideAutoplay();
}

function goToSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function startSlideAutoplay() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 7000);
}

// ========================================
// 2. VÍDEO
// ========================================

let player;
let isPlaying = true;
let isMuted = true;

function loadYouTubeAPI() {
  if (typeof YT === 'undefined') {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }
}

window.onYouTubeIframeAPIReady = function() {
  const videoElement = document.getElementById('youtube-video');
  if (!videoElement) return;
  
  player = new YT.Player('youtube-video', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  const playPauseBtn = document.getElementById('video-play-pause');
  const muteBtn = document.getElementById('video-mute');
  
  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  if (muteBtn) muteBtn.addEventListener('click', toggleMute);
  
  player.mute();
}

function onPlayerStateChange(event) {
  const playPauseBtn = document.getElementById('video-play-pause');
  if (!playPauseBtn) return;
  
  const icon = playPauseBtn.querySelector('i');
  icon.className = event.data === YT.PlayerState.PLAYING ? 'fas fa-pause' : 'fas fa-play';
  isPlaying = event.data === YT.PlayerState.PLAYING;
}

function togglePlay() {
  if (player) {
    isPlaying ? player.pauseVideo() : player.playVideo();
  }
}

function toggleMute() {
  if (player) {
    const muteBtn = document.getElementById('video-mute');
    const icon = muteBtn.querySelector('i');
    
    if (isMuted) {
      player.unMute();
      icon.className = 'fas fa-volume-up';
    } else {
      player.mute();
      icon.className = 'fas fa-volume-mute';
    }
    isMuted = !isMuted;
  }
}

loadYouTubeAPI();

// ========================================
// 3. PRODUTOS EM DESTAQUE - VERSÃO SIMPLIFICADA
// ========================================

function loadFeaturedProducts() {
  console.log('🔍 Procurando track de produtos...');
  
  // Verifica se productsDB existe
  if (typeof productsDB === 'undefined') {
    console.error('❌ productsDB não está definido!');
    return;
  }
  
  console.log('📦 productsDB encontrado com', productsDB.length, 'produtos');
  
  // Filtra produtos com destaque = true
  let featuredProducts = productsDB.filter(p => p.destaque === true);
  console.log('✨ Produtos com destaque encontrados:', featuredProducts.length);
  
  if (featuredProducts.length === 0) {
    console.log('📌 Nenhum produto com destaque, usando primeiros 4');
    featuredProducts = productsDB.slice(0, 4);
  } else {
    featuredProducts = featuredProducts.slice(0, 4);
  }
  
  // AGORA VAMOS ENCONTRAR O TRACK - Vamos procurar em todo o DOM
  console.log('🔍 Buscando elemento com ID relacionado a produtos...');
  
  // Lista todos os IDs da página para debug
  const allIds = [];
  document.querySelectorAll('[id]').forEach(el => allIds.push(el.id));
  console.log('IDs disponíveis na página:', allIds);
  
  // Tenta encontrar o track por diferentes estratégias
  let track = null;
  
  // Estratégia 1: Procurar por ID específico
  const possibleIds = ['products-carousel-track', 'product-carousel-track', 'featured-products', 'products-track'];
  
  for (const id of possibleIds) {
    const el = document.getElementById(id);
    if (el) {
      track = el;
      console.log('✅ Track encontrado com ID:', id);
      break;
    }
  }
  
  // Estratégia 2: Se não encontrou, procura por classe
  if (!track) {
    const possibleClasses = ['products-carousel-track', 'product-carousel', 'featured-products'];
    for (const cls of possibleClasses) {
      const els = document.getElementsByClassName(cls);
      if (els.length > 0) {
        track = els[0];
        console.log('✅ Track encontrado com classe:', cls);
        break;
      }
    }
  }
  
  // Estratégia 3: Procura por qualquer div que contenha produtos
  if (!track) {
    const productSections = document.querySelectorAll('.products-grid, .featured-products, .product-carousel');
    if (productSections.length > 0) {
      track = productSections[0];
      console.log('✅ Track encontrado por seção:', productSections[0].className);
    }
  }
  
  if (!track) {
    console.error('❌ Nenhum track de produtos encontrado!');
    return;
  }
  
  // Renderiza os produtos
  renderFeaturedProducts(track, featuredProducts);
}

function renderFeaturedProducts(track, products) {
  track.innerHTML = products.map(product => {
    const categoriaNome = getCategoriaNome(product.categoria);
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        <span class="product-badge">Destaque</span>
        <div class="product-image" style="background: linear-gradient(145deg, #d9c5b0, #b28b6f);"></div>
        <div class="product-info">
          <div class="product-category">${categoriaNome}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${product.descricao.substring(0, 60)}...</p>
          <div class="product-price">
            R$ ${product.preco.toFixed(2)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  console.log('✅ Produtos renderizados:', products.length);
  
  // Inicializa carrossel (se os botões existirem)
  initCarousel('products');
}

// ========================================
// 4. DEPOIMENTOS - VERSÃO SIMPLIFICADA
// ========================================

function loadHomeTestimonials() {
  console.log('💬 Carregando depoimentos...');
  
  if (typeof testimonialsDB === 'undefined') {
    console.error('❌ testimonialsDB não está definido!');
    return;
  }
  
  console.log('✅ testimonialsDB encontrado com', testimonialsDB.length, 'depoimentos');
  
  // Pega os 3 primeiros depoimentos
  let recentes = testimonialsDB.slice(0, 3);
  
  if (recentes.length === 0) {
    console.log('⚠️ Nenhum depoimento encontrado');
    return;
  }
  
  // Encontra o track de depoimentos
  let track = document.getElementById('testimonials-carousel-track');
  
  if (!track) {
    console.error('❌ Track de depoimentos não encontrado!');
    return;
  }
  
  renderTestimonials(track, recentes);
}

function renderTestimonials(track, testimonials) {
  track.innerHTML = testimonials.map(test => {
    const stars = '★'.repeat(test.avaliacao) + '☆'.repeat(5 - test.avaliacao);
    const avatar = test.nome.charAt(0).toUpperCase();
    
    return `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar">${avatar}</div>
          <div class="testimonial-author">
            <h4>${test.nome}</h4>
            <p>${test.cidade || 'Cliente'}</p>
          </div>
        </div>
        <div class="testimonial-rating">${stars}</div>
        <div class="testimonial-product">${test.produtoNome}</div>
        <div class="testimonial-content">"${test.comentario.substring(0, 100)}..."</div>
        <div class="testimonial-footer">${formatDate(test.data)}</div>
      </div>
    `;
  }).join('');
  
  console.log('✅ Depoimentos renderizados:', testimonials.length);
  
  // Inicializa carrossel
  initCarousel('testimonials');
}

// ========================================
// 5. CARROSSEL SIMPLIFICADO
// ========================================

function initCarousel(type) {
  const track = document.getElementById(`${type}-carousel-track`);
  const prevBtn = document.getElementById(`${type}-carousel-prev`);
  const nextBtn = document.getElementById(`${type}-carousel-next`);
  const dotsContainer = document.getElementById(`${type}-carousel-dots`);
  
  if (!track || !prevBtn || !nextBtn) return;
  
  const cards = track.children;
  if (cards.length <= 1) return;
  
  let currentIndex = 0;
  const gap = 20;
  
  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return type === 'products' ? 2 : 1;
    if (window.innerWidth <= 992) return type === 'products' ? 3 : 2;
    return type === 'products' ? 4 : 3;
  }
  
  let cardsPerView = getCardsPerView();
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const translateX = -(currentIndex * (cardWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
  }
  
  function createDots() {
    if (!dotsContainer) return;
    
    const totalDots = Math.ceil(cards.length / cardsPerView);
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = i * cardsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
        updateDots();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.children;
    const page = Math.floor(currentIndex / cardsPerView);
    
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === page);
    }
  }
  
  createDots();
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - cardsPerView);
      updateCarousel();
      updateDots();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex = Math.min(maxIndex, currentIndex + cardsPerView);
      updateCarousel();
      updateDots();
    }
  });
  
  window.addEventListener('resize', () => {
    const newPerView = getCardsPerView();
    if (newPerView !== cardsPerView) {
      cardsPerView = newPerView;
      currentIndex = 0;
      updateCarousel();
      createDots();
    }
  });
}

// ========================================
// 6. HELPERS
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

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}
