// ========================================
// HOME.JS - Funcionalidades da Página Inicial
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initHeroSlider();
  initVideoControls();
  loadFeaturedProducts();
  loadHomeTestimonials();
  initCarousels();
  setupCEPAutocomplete();
});

// ========================================
// 1. HERO SLIDER COM VÍDEO
// ========================================

let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const totalSlides = slides.length;

function initHeroSlider() {
  if (slides.length === 0) return;
  
  // Event listeners dos controles
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Inicia autoplay
  startSlideAutoplay();
  
  // Pausa no hover
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
  const next = (currentSlide + 1) % totalSlides;
  goToSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(prev);
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
// 2. CONTROLES DE VÍDEO (YouTube API)
// ========================================

let player;
let isPlaying = true;
let isMuted = false;

// Carrega API do YouTube
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API ready
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
}

function onPlayerStateChange(event) {
  const playPauseBtn = document.getElementById('video-play-pause');
  if (!playPauseBtn) return;
  
  const icon = playPauseBtn.querySelector('i');
  if (event.data === YT.PlayerState.PLAYING) {
    icon.className = 'fas fa-pause';
    isPlaying = true;
  } else {
    icon.className = 'fas fa-play';
    isPlaying = false;
  }
}

function togglePlay() {
  if (player) {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }
}

function toggleMute() {
  if (player) {
    const muteBtn = document.getElementById('video-mute');
    if (!muteBtn) return;
    
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

// Inicia API do YouTube
loadYouTubeAPI();

// ========================================
// 3. PRODUTOS EM DESTAQUE (do produtos.js)
// ========================================

function loadFeaturedProducts() {
  const track = document.getElementById('products-track');
  if (!track) return;
  
  // Verifica se productsDB existe (vindo do produtos.js)
  if (typeof productsDB === 'undefined') {
    console.error('productsDB não encontrado. Verifique se produtos.js foi carregado.');
    track.innerHTML = '<div class="error-message">Erro ao carregar produtos</div>';
    return;
  }
  
  // Filtra apenas produtos com destaque = true
  const featuredProducts = productsDB.filter(p => p.destaque === true).slice(0, 8);
  
  if (featuredProducts.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum produto em destaque no momento</div>';
    return;
  }
  
  renderFeaturedProducts(featuredProducts);
}

function renderFeaturedProducts(products) {
  const track = document.getElementById('products-track');
  
  track.innerHTML = products.map(product => {
    // Pega a primeira imagem ou usa placeholder
    const imageUrl = product.imagens && product.imagens.length > 0 
      ? product.imagens[0] 
      : (product.imagem || 'assets/images/placeholder.jpg');
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        <div class="product-image">
          <img src="${imageUrl}" 
               alt="${product.nome}" 
               loading="lazy"
               onerror="this.src='assets/images/placeholder.jpg'">
        </div>
        <div class="product-info">
          <div class="product-category">${getCategoriaNome(product.categoria)}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${product.descricao.substring(0, 60)}...</p>
          <div class="product-price">
            R$ ${product.preco.toFixed(2)} <small>à vista</small>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// 4. DEPOIMENTOS NA HOME (do depoimentos.js)
// ========================================

function loadHomeTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  
  // Verifica se testimonialsDB existe (vindo do depoimentos.js)
  if (typeof testimonialsDB === 'undefined') {
    console.error('testimonialsDB não encontrado. Verifique se depoimentos.js foi carregado.');
    track.innerHTML = '<div class="error-message">Erro ao carregar depoimentos</div>';
    return;
  }
  
  // Pega depoimentos destacados ou os mais recentes
  let featuredTestimonials = testimonialsDB.filter(t => t.destaque === true);
  
  // Se não tiver destacados, pega os 6 mais recentes
  if (featuredTestimonials.length === 0) {
    featuredTestimonials = [...testimonialsDB]
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 6);
  } else {
    featuredTestimonials = featuredTestimonials.slice(0, 6);
  }
  
  if (featuredTestimonials.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum depoimento no momento</div>';
    return;
  }
  
  renderHomeTestimonials(featuredTestimonials);
}

function renderHomeTestimonials(testimonials) {
  const track = document.getElementById('testimonials-track');
  
  track.innerHTML = testimonials.map(test => {
    const stars = '★'.repeat(test.avaliacao) + '☆'.repeat(5 - test.avaliacao);
    const avatarLetter = test.nome.charAt(0).toUpperCase();
    
    return `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-avatar">${avatarLetter}</div>
          <div class="testimonial-author">
            <h4>${escapeHTML(test.nome)}</h4>
            <p>${escapeHTML(test.cidade || 'Cliente')}</p>
          </div>
        </div>
        <div class="testimonial-rating">${stars}</div>
        <div class="testimonial-product">${escapeHTML(test.produtoNome)}</div>
        <div class="testimonial-content">${escapeHTML(test.comentario.substring(0, 120))}...</div>
        <div class="testimonial-footer">
          <span>${formatDate(test.data)}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// 5. CONTROLES DOS CARROSSÉIS
// ========================================

function initCarousels() {
  setupCarousel('products');
  setupCarousel('testimonials');
}

function setupCarousel(type) {
  const track = document.getElementById(`${type}-track`);
  const prevBtn = document.getElementById(`${type}-prev`);
  const nextBtn = document.getElementById(`${type}-next`);
  const dotsContainer = document.getElementById(`${type}-dots`);
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const cards = track.children;
  
  if (cards.length === 0) return;
  
  const cardStyle = window.getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth;
  const gap = 20; // gap entre cards
  
  // Calcula quantos cards cabem na tela
  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return type === 'products' ? 2 : 1;
    if (window.innerWidth <= 992) return type === 'products' ? 3 : 2;
    return type === 'products' ? 4 : 3;
  }
  
  let cardsPerView = getCardsPerView();
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  // Cria dots
  function createDots() {
    if (!dotsContainer) return;
    
    const totalDots = Math.ceil(cards.length / cardsPerView);
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  createDots();
  
  function goToPage(page) {
    currentIndex = Math.min(page * cardsPerView, maxIndex);
    updateCarousel();
    updateDots(page);
  }
  
  function updateCarousel() {
    const translateX = -(currentIndex * (cardWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
  }
  
  function updateDots(currentPage) {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.children;
    const page = Math.floor(currentIndex / cardsPerView);
    
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === page);
    }
  }
  
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
  
  // Atualiza no resize
  window.addEventListener('resize', () => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      currentIndex = 0;
      updateCarousel();
      createDots();
    }
  });
  
  // Autoplay do carrossel de produtos
  if (type === 'products' && cards.length > cardsPerView) {
    let autoplayInterval = setInterval(() => {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
      updateDots();
    }, 5000);
    
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
        updateDots();
      }, 5000);
    });
  }
}

// ========================================
// 6. AUTOCOMPLETE DE CEP
// ========================================

function setupCEPAutocomplete() {
  const cepInput = document.getElementById('cep');
  const cidadeInput = document.getElementById('cidade');
  
  if (!cepInput || !cidadeInput) return;
  
  cepInput.addEventListener('blur', async function() {
    const cep = this.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          cidadeInput.value = `${data.localidade} - ${data.uf}`;
        } else {
          cidadeInput.value = 'CEP não encontrado';
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        cidadeInput.value = 'Erro ao buscar CEP';
      }
    }
  });
}

// ========================================
// 7. HELPER FUNCTIONS
// ========================================

function getCategoriaNome(categoria) {
  const nomes = {
    'utensilios': 'Utensílios',
    'mobiliario': 'Mobiliário',
    'organizacao': 'Organização',
    'jardinagem': 'Jardinagem',
    'decoracao': 'Decoração',
    'plantas-vivas': 'Plantas Vivas'
  };
  return nomes[categoria] || categoria;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"]/g, function(match) {
    if (match === '&') return '&amp;';
    if (match === '<') return '&lt;';
    if (match === '>') return '&gt;';
    if (match === '"') return '&quot;';
    return match;
  });
}
