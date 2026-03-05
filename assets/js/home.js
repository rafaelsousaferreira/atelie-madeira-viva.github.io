// ========================================
// HOME.JS - Versão Corrigida
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js carregado');
  
  // Inicializa tudo após um pequeno delay
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
// 2. CONTROLES DE VÍDEO
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
// 3. PRODUTOS EM DESTAQUE
// ========================================

function loadFeaturedProducts() {
  const track = document.getElementById('products-carousel-track');
  if (!track) {
    console.error('❌ Track de produtos não encontrado!');
    return;
  }
  
  console.log('📦 Buscando produtos em destaque...');
  
  // Tenta acessar o productsDB
  let products = [];
  
  if (typeof productsDB !== 'undefined' && productsDB.length > 0) {
    products = productsDB;
    console.log(`✅ productsDB encontrado com ${products.length} produtos`);
  } else if (window.productsDB && window.productsDB.length > 0) {
    products = window.productsDB;
    console.log(`✅ window.productsDB encontrado com ${products.length} produtos`);
  } else {
    console.warn('⚠️ Nenhum produto encontrado, usando dados mockados');
    products = getMockProducts();
  }
  
  // Filtra produtos em destaque
  let featured = products.filter(p => p.destaque === true);
  
  if (featured.length === 0) {
    console.log('📌 Nenhum produto com destaque, mostrando os primeiros');
    featured = products.slice(0, 6);
  } else {
    featured = featured.slice(0, 6);
  }
  
  if (featured.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum produto disponível</div>';
    return;
  }
  
  renderProducts(featured);
}

function getMockProducts() {
  return [
    { id: 1, nome: "Tábua de Corte", categoria: "utensilios", descricao: "Tábua em madeira de demolição", preco: 89.90, destaque: true },
    { id: 2, nome: "Tábua de Servir", categoria: "utensilios", descricao: "Com alça de couro", preco: 129.90, destaque: true },
    { id: 3, nome: "Poltrona Rústica", categoria: "mobiliario", descricao: "Madeira maciça", preco: 890.00, destaque: true },
    { id: 4, nome: "Mesa de Jantar", categoria: "mobiliario", descricao: "6 lugares", preco: 1890.00, destaque: true },
    { id: 5, nome: "Prateleira", categoria: "organizacao", descricao: "Flutuante 1,20m", preco: 249.00, destaque: true },
    { id: 6, nome: "Suporte para Plantas", categoria: "jardinagem", descricao: "Triplo", preco: 159.00, destaque: true }
  ];
}

function renderProducts(products) {
  const track = document.getElementById('products-carousel-track');
  
  track.innerHTML = products.map(product => {
    const catNome = getCategoriaNome(product.categoria);
    const gradient = `linear-gradient(145deg, #d9c5b0, #b28b6f)`;
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        <span class="product-badge">Destaque</span>
        <div class="product-image" style="background: ${gradient};"></div>
        <div class="product-info">
          <div class="product-category">${catNome}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${product.descricao.substring(0, 50)}...</p>
          <div class="product-price">R$ ${product.preco.toFixed(2)}</div>
        </div>
      </div>
    `;
  }).join('');
  
  // Inicializa o carrossel após renderizar
  initProductsCarousel();
}

// ========================================
// 4. DEPOIMENTOS
// ========================================

function loadHomeTestimonials() {
  const track = document.getElementById('testimonials-carousel-track');
  if (!track) {
    console.error('❌ Track de depoimentos não encontrado!');
    return;
  }
  
  console.log('💬 Buscando depoimentos...');
  
  let testimonials = [];
  
  if (typeof testimonialsDB !== 'undefined' && testimonialsDB.length > 0) {
    testimonials = testimonialsDB;
    console.log(`✅ testimonialsDB encontrado com ${testimonials.length} depoimentos`);
  } else if (window.testimonialsDB && window.testimonialsDB.length > 0) {
    testimonials = window.testimonialsDB;
    console.log(`✅ window.testimonialsDB encontrado com ${testimonials.length} depoimentos`);
  } else {
    console.warn('⚠️ Nenhum depoimento encontrado, usando dados mockados');
    testimonials = getMockTestimonials();
  }
  
  // Pega os mais recentes
  let recentes = [...testimonials]
    .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
    .slice(0, 4);
  
  if (recentes.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum depoimento ainda</div>';
    return;
  }
  
  renderTestimonials(recentes);
}

function getMockTestimonials() {
  return [
    { nome: "Ana Silva", cidade: "Salvador", produtoNome: "Tábua de Corte", avaliacao: 5, comentario: "Produto excelente!", data: "2026-02-15" },
    { nome: "Carlos Mendes", cidade: "Camaçari", produtoNome: "Mesa de Jantar", avaliacao: 5, comentario: "Mesa linda!", data: "2026-02-10" },
    { nome: "Mariana Costa", cidade: "Lauro", produtoNome: "Suporte", avaliacao: 5, comentario: "Perfeito!", data: "2026-02-05" }
  ];
}

function renderTestimonials(testimonials) {
  const track = document.getElementById('testimonials-carousel-track');
  
  track.innerHTML = testimonials.map(test => {
    const stars = '★'.repeat(test.avaliacao) + '☆'.repeat(5 - test.avaliacao);
    const avatar = test.nome.charAt(0).toUpperCase();
    
    return `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar">${avatar}</div>
          <div>
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
  
  // Inicializa o carrossel após renderizar
  initTestimonialsCarousel();
}

// ========================================
// 5. CARROSSÉIS
// ========================================

function initProductsCarousel() {
  setupCarousel(
    'products-carousel-track',
    'products-carousel-prev',
    'products-carousel-next',
    'products-carousel-dots'
  );
}

function initTestimonialsCarousel() {
  setupCarousel(
    'testimonials-carousel-track',
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
  
  if (!track || !prevBtn || !nextBtn) return;
  
  const cards = track.children;
  if (cards.length === 0) return;
  
  let currentIndex = 0;
  const gap = 20;
  
  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return trackId.includes('products') ? 2 : 1;
    if (window.innerWidth <= 992) return trackId.includes('products') ? 3 : 2;
    return trackId.includes('products') ? 4 : 3;
  }
  
  let cardsPerView = getCardsPerView();
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  function getCardWidth() {
    return cards[0]?.offsetWidth || 0;
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
        updateCarousel();
        updateDots();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateCarousel() {
    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
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
