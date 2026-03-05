// ========================================
// HOME.JS - Versão Final com Grid
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
// 3. PRODUTOS EM DESTAQUE - GRID
// ========================================

function loadFeaturedProducts() {
  const grid = document.getElementById('home-products-grid');
  
  if (!grid) {
    console.error('❌ Grid de produtos não encontrado!');
    return;
  }
  
  console.log('📦 Carregando produtos em destaque...');
  
  // Verifica se productsDB existe
  if (typeof productsDB === 'undefined') {
    console.error('❌ productsDB não está definido!');
    grid.innerHTML = '<div class="error-message">Erro ao carregar produtos</div>';
    return;
  }
  
  console.log('✅ productsDB encontrado com', productsDB.length, 'produtos');
  
  // Filtra produtos com destaque = true
  let featuredProducts = productsDB.filter(p => p.destaque === true);
  
  console.log('✨ Produtos com destaque encontrados:', featuredProducts.length);
  
  // Se não tiver produtos com destaque, usa os primeiros 4
  if (featuredProducts.length === 0) {
    console.log('📌 Nenhum produto com destaque, usando primeiros 4');
    featuredProducts = productsDB.slice(0, 4);
  } else {
    featuredProducts = featuredProducts.slice(0, 4);
  }
  
  if (featuredProducts.length === 0) {
    grid.innerHTML = '<div class="empty-message">Nenhum produto disponível</div>';
    return;
  }
  
  renderFeaturedProducts(grid, featuredProducts);
}

function renderFeaturedProducts(grid, products) {
  grid.innerHTML = products.map(product => {
    const categoriaNome = getCategoriaNome(product.categoria);
    
    // Pega a primeira imagem ou usa gradiente
    const imagem = product.imagens && product.imagens.length > 0 
      ? product.imagens[0] 
      : null;
    
    const imageStyle = imagem 
      ? `style="background-image: url('${imagem}'); background-size: cover; background-position: center;"`
      : `style="background: linear-gradient(145deg, #d9c5b0, #b28b6f);"`;
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        <span class="product-badge">Destaque</span>
        <div class="product-image" ${imageStyle}></div>
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
}

// ========================================
// 4. DEPOIMENTOS - GRID
// ========================================

function loadHomeTestimonials() {
  const grid = document.getElementById('home-testimonials-grid');
  
  if (!grid) {
    console.error('❌ Grid de depoimentos não encontrado!');
    return;
  }
  
  console.log('💬 Carregando depoimentos...');
  
  if (typeof testimonialsDB === 'undefined') {
    console.error('❌ testimonialsDB não está definido!');
    grid.innerHTML = '<div class="error-message">Erro ao carregar depoimentos</div>';
    return;
  }
  
  console.log('✅ testimonialsDB encontrado com', testimonialsDB.length, 'depoimentos');
  
  // Pega os 3 primeiros depoimentos
  let recentes = testimonialsDB.slice(0, 3);
  
  if (recentes.length === 0) {
    grid.innerHTML = '<div class="empty-message">Nenhum depoimento ainda</div>';
    return;
  }
  
  renderTestimonials(grid, recentes);
}

function renderTestimonials(grid, testimonials) {
  grid.innerHTML = testimonials.map(test => {
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
}

// ========================================
// 5. HELPERS
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
