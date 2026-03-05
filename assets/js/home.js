// ========================================
// HOME.JS - Versão Definitiva
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js iniciado');
  console.log('📦 productsDB existe?', typeof productsDB !== 'undefined');
  console.log('📦 productsDB length:', productsDB ? productsDB.length : 0);
  
  // Aguarda um pouco para garantir que tudo carregou
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
  
  const slider = document.querySelector('.hero-slider-section');
  if (slider) {
    slider.addEventListener('mouseenter', stopSlideAutoplay);
    slider.addEventListener('mouseleave', startSlideAutoplay);
  }
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

function stopSlideAutoplay() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
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
// 3. PRODUTOS EM DESTAQUE - COM DEBUG
// ========================================

function loadFeaturedProducts() {
  console.log('🔍 Procurando track de produtos...');
  
  // Lista todos os elementos com ID que contém 'product' no DOM
  const allElements = document.querySelectorAll('[id*="product" i]');
  console.log('Elementos com "product" no ID:', allElements.length);
  allElements.forEach(el => console.log(' - ID:', el.id));
  
  // Tenta encontrar o track de produtos com diferentes IDs possíveis
  const possibleIds = [
    'products-carousel-track',
    'product-carousel-track',
    'featured-products-track',
    'products-track',
    'product-track'
  ];
  
  let track = null;
  let foundId = '';
  
  for (const id of possibleIds) {
    const element = document.getElementById(id);
    if (element) {
      track = element;
      foundId = id;
      console.log('✅ Track encontrado com ID:', id);
      break;
    }
  }
  
  if (!track) {
    console.error('❌ Nenhum track de produtos encontrado!');
    return;
  }
  
  console.log('📦 Carregando produtos em destaque...');
  
  // Verifica se productsDB existe
  if (typeof productsDB === 'undefined') {
    console.error('❌ productsDB não está definido!');
    track.innerHTML = '<div class="error-message">Erro ao carregar produtos</div>';
    return;
  }
  
  console.log('✅ productsDB encontrado com', productsDB.length, 'produtos');
  
  // Filtra produtos com destaque = true
  let featuredProducts = productsDB.filter(p => p.destaque === true);
  
  console.log('✨ Produtos com destaque encontrados:', featuredProducts.length);
  
  // Se não tiver produtos com destaque, usa os primeiros
  if (featuredProducts.length === 0) {
    console.log('📌 Usando primeiros 4 produtos');
    featuredProducts = productsDB.slice(0, 4);
  } else {
    featuredProducts = featuredProducts.slice(0, 4);
  }
  
  if (featuredProducts.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum produto disponível</div>';
    return;
  }
  
  renderFeaturedProducts(track, featuredProducts);
}

function renderFeaturedProducts(track, products) {
  track.innerHTML = products.map(product => {
    const categoriaNome = getCategoriaNome(product.categoria);
    
    // Usa gradiente em vez de imagem (mais confiável)
    const gradient = `linear-gradient(145deg, #d9c5b0, #b28b6f)`;
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        <span class="product-badge">Destaque</span>
        <div class="product-image" style="background: ${gradient};"></div>
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
  
  // Inicializa carrossel
  initProductsCarousel(track.id);
}

// ========================================
// 4. DEPOIMENTOS - COM DEBUG
// ========================================

function loadHomeTestimonials() {
  console.log('🔍 Procurando track de depoimentos...');
  
  // Lista todos os elementos com ID que contém 'testimonial' no DOM
  const allElements = document.querySelectorAll('[id*="testimonial" i]');
  console.log('Elementos com "testimonial" no ID:', allElements.length);
  allElements.forEach(el => console.log(' - ID:', el.id));
  
  // Tenta encontrar o track de depoimentos com diferentes IDs possíveis
  const possibleIds = [
    'testimonials-carousel-track',
    'testimonial-carousel-track',
    'testimonials-track',
    'testimonial-track',
    'home-depoimentos'
  ];
  
  let track = null;
  let foundId = '';
  
  for (const id of possibleIds) {
    const element = document.getElementById(id);
    if (element) {
      track = element;
      foundId = id;
      console.log('✅ Track de depoimentos encontrado com ID:', id);
      break;
    }
  }
  
  if (!track) {
    console.error('❌ Nenhum track de depoimentos encontrado!');
    return;
  }
  
  console.log('💬 Carregando depoimentos...');
  
  if (typeof testimonialsDB === 'undefined') {
    console.error('❌ testimonialsDB não está definido!');
    track.innerHTML = '<div class="error-message">Erro ao carregar depoimentos</div>';
    return;
  }
  
  console.log('✅ testimonialsDB encontrado com', testimonialsDB.length, 'depoimentos');
  
  // Pega os 3 primeiros depoimentos
  let recentes = testimonialsDB.slice(0, 3);
  
  if (recentes.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum depoimento ainda</div>';
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
  initTestimonialsCarousel(track.id);
}

// ========================================
// 5. CARROSSÉIS
// ========================================

function initProductsCarousel(trackId) {
  setupCarousel(
    trackId,
    'products-carousel-prev',
    'products-carousel-next',
    'products-carousel-dots'
  );
}

function initTestimonialsCarousel(trackId) {
  setupCarousel(
    trackId,
    'testimonials-carousel-prev',
    'testimonials-carousel-next',
    'testimonials-carousel-dots'
  );
}

function setupCarousel(trackId, prevId, nextId, dotsId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsContainer = document.getElementById(dotsId);
  
  if (!track) {
    console.log(`❌ Track ${trackId} não encontrado para carrossel`);
    return;
  }
  
  const cards = track.children;
  if (cards.length === 0) {
    console.log(`⚠️ Nenhum card no carrossel ${trackId}`);
    return;
  }
  
  console.log(`🔄 Configurando carrossel ${trackId} com ${cards.length} cards`);
  
  if (!prevBtn || !nextBtn) {
    console.log(`⚠️ Botões do carrossel ${trackId} não encontrados`);
    return;
  }
  
  // Esconde botões se não houver cards suficientes
  if (cards.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    return;
  }
  
  prevBtn.style.display = 'flex';
  nextBtn.style.display = 'flex';
  if (dotsContainer) dotsContainer.style.display = 'flex';
  
  let currentIndex = 0;
  const gap = 20;
  
  // Calcula quantos cards cabem na tela
  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return trackId.includes('products') ? 2 : 1;
    if (window.innerWidth <= 992) return trackId.includes('products') ? 3 : 2;
    return trackId.includes('products') ? 4 : 3;
  }
  
  let cardsPerView = getCardsPerView();
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  function getCardWidth() {
    if (cards.length === 0) return 0;
    return cards[0].offsetWidth;
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
  
  function updateCarousel() {
    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;
    const translateX = -(currentIndex * (cardWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
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
