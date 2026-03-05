// ========================================
// HOME.JS - Funcionalidades da Página Inicial
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initHeroSlider();
  initVideoControls();
  loadFeaturedProducts();
  loadTestimonials();
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
  document.getElementById('hero-prev').addEventListener('click', prevSlide);
  document.getElementById('hero-next').addEventListener('click', nextSlide);
  
  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Inicia autoplay
  startSlideAutoplay();
  
  // Pausa no hover
  const slider = document.querySelector('.hero-slider-section');
  slider.addEventListener('mouseenter', stopSlideAutoplay);
  slider.addEventListener('mouseleave', startSlideAutoplay);
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
  slideInterval = setInterval(nextSlide, 7000); // Muda a cada 7 segundos
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
  player = new YT.Player('youtube-video', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  // Configura controles
  document.getElementById('video-play-pause').addEventListener('click', togglePlay);
  document.getElementById('video-mute').addEventListener('click', toggleMute);
}

function onPlayerStateChange(event) {
  // Atualiza ícone de play/pause
  const playPauseBtn = document.getElementById('video-play-pause').querySelector('i');
  if (event.data === YT.PlayerState.PLAYING) {
    playPauseBtn.className = 'fas fa-pause';
    isPlaying = true;
  } else {
    playPauseBtn.className = 'fas fa-play';
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
    const muteBtn = document.getElementById('video-mute').querySelector('i');
    if (isMuted) {
      player.unMute();
      muteBtn.className = 'fas fa-volume-up';
    } else {
      player.mute();
      muteBtn.className = 'fas fa-volume-mute';
    }
    isMuted = !isMuted;
  }
}

// Inicia API do YouTube
loadYouTubeAPI();

// ========================================
// 3. PRODUTOS EM DESTAQUE
// ========================================

function loadFeaturedProducts() {
  const track = document.getElementById('products-track');
  if (!track) return;
  
  // Simula carregamento
  track.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>';
  
  // Busca produtos do localStorage ou usa dados mockados
  setTimeout(() => {
    const featuredProducts = getFeaturedProducts();
    renderFeaturedProducts(featuredProducts);
    setupCarousel('products');
  }, 500);
}

function getFeaturedProducts() {
  // Tenta buscar do localStorage primeiro
  const stored = localStorage.getItem('woodart_products');
  if (stored) {
    const products = JSON.parse(stored);
    return products.filter(p => p.destaque).slice(0, 8);
  }
  
  // Dados mockados
  return [
    {
      id: 1,
      nome: "Tábua de Corte Profissional",
      categoria: "utensilios",
      imagem: "assets/images/produtos/tabua-corte-1.jpg",
      preco: 89.90,
      destaque: true
    },
    {
      id: 2,
      nome: "Tábua de Servir com Alça",
      categoria: "utensilios",
      imagem: "assets/images/produtos/tabua-servir-1.jpg",
      preco: 129.90,
      destaque: true
    },
    {
      id: 3,
      nome: "Poltrona Rústica",
      categoria: "mobiliario",
      imagem: "assets/images/produtos/poltrona-1.jpg",
      preco: 890.00,
      destaque: true
    },
    {
      id: 5,
      nome: "Mesa de Jantar 6 lugares",
      categoria: "mobiliario",
      imagem: "assets/images/produtos/mesa-1.jpg",
      preco: 1890.00,
      destaque: true
    },
    {
      id: 7,
      nome: "Prateleira Flutuante",
      categoria: "organizacao",
      imagem: "assets/images/produtos/prateleira-1.jpg",
      preco: 249.00,
      destaque: true
    },
    {
      id: 10,
      nome: "Suporte para Plantas Triplo",
      categoria: "jardinagem",
      imagem: "assets/images/produtos/suporte-planta-1.jpg",
      preco: 159.00,
      destaque: true
    },
    {
      id: 12,
      nome: "Vaso de Gesso Natural",
      categoria: "decoracao",
      imagem: "assets/images/produtos/vaso-gesso-1.jpg",
      preco: 45.00,
      destaque: true
    },
    {
      id: 14,
      nome: "Arranjo de Suculentas",
      categoria: "plantas-vivas",
      imagem: "assets/images/produtos/arranjo-suculentas.jpg",
      preco: 120.00,
      destaque: true
    }
  ];
}

function renderFeaturedProducts(products) {
  const track = document.getElementById('products-track');
  
  track.innerHTML = products.map(product => `
    <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
      ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
      <div class="product-image">
        <img src="${product.imagem}" alt="${product.nome}" loading="lazy"
             onerror="this.src='assets/images/placeholder.jpg'">
      </div>
      <div class="product-info">
        <div class="product-category">${getCategoriaNome(product.categoria)}</div>
        <h3 class="product-title">${product.nome}</h3>
        <div class="product-price">
          R$ ${product.preco.toFixed(2)} <small>à vista</small>
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// 4. DEPOIMENTOS EM DESTAQUE
// ========================================

function loadTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  
  track.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Carregando depoimentos...</div>';
  
  setTimeout(() => {
    const testimonials = getTestimonials();
    renderTestimonials(testimonials);
    setupCarousel('testimonials');
  }, 500);
}

function getTestimonials() {
  // Tenta buscar do localStorage
  const stored = localStorage.getItem('woodart_reviews');
  if (stored) {
    const reviews = JSON.parse(stored);
    return reviews.slice(0, 6).map(r => ({
      id: r.id,
      name: r.name || 'Anônimo',
      city: r.city || 'Cliente',
      rating: r.rating || 5,
      product: r.productName || 'Produto',
      comment: r.comment,
      date: r.date
    }));
  }
  
  // Dados mockados
  return [
    {
      id: 1,
      name: "Ana Silva",
      city: "Salvador, BA",
      rating: 5,
      product: "Tábua de Corte",
      comment: "Produto excelente! Superou minhas expectativas. A madeira é de altíssima qualidade e o acabamento impecável.",
      date: "2026-02-15"
    },
    {
      id: 2,
      name: "Carlos Mendes",
      city: "Camaçari, BA",
      rating: 5,
      product: "Mesa de Jantar",
      comment: "Mesa linda e muito bem feita. Minha família adorou! Atendimento nota 10.",
      date: "2026-02-10"
    },
    {
      id: 3,
      name: "Mariana Costa",
      city: "Lauro de Freitas, BA",
      rating: 5,
      product: "Suporte para Plantas",
      comment: "O suporte ficou perfeito na minha varanda. Super resistente e bonito. Recomendo!",
      date: "2026-02-05"
    },
    {
      id: 4,
      name: "Roberto Alves",
      city: "Salvador, BA",
      rating: 4,
      product: "Poltrona Rústica",
      comment: "Poltrona muito confortável e bem acabada. Único ponto é que demorou um pouco para entregar.",
      date: "2026-01-28"
    },
    {
      id: 5,
      name: "Patrícia Lima",
      city: "Camaçari, BA",
      rating: 5,
      product: "Vaso de Gesso",
      comment: "Os vasos são uma delicadeza! Comprei 3 e já quero mais. Perfeitos para suculentas.",
      date: "2026-01-20"
    },
    {
      id: 6,
      name: "João Pedro",
      city: "Salvador, BA",
      rating: 5,
      product: "Prateleira Flutuante",
      comment: "Prateleira linda e super resistente. O sistema de fixação é invisível, ficou perfeita na parede.",
      date: "2026-01-15"
    }
  ];
}

function renderTestimonials(testimonials) {
  const track = document.getElementById('testimonials-track');
  
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${t.name.charAt(0).toUpperCase()}</div>
        <div class="testimonial-author">
          <h4>${t.name}</h4>
          <p>${t.city}</p>
        </div>
      </div>
      <div class="testimonial-rating">
        ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}
      </div>
      <div class="testimonial-product">${t.product}</div>
      <div class="testimonial-content">${t.comment}</div>
      <div class="testimonial-footer">
        <span>${formatDate(t.date)}</span>
      </div>
    </div>
  `).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// ========================================
// 5. CONTROLES DOS CARROSSÉIS
// ========================================

function setupCarousel(type) {
  const track = document.getElementById(`${type}-track`);
  const prevBtn = document.getElementById(`${type}-prev`);
  const nextBtn = document.getElementById(`${type}-next`);
  const dotsContainer = document.getElementById(`${type}-dots`);
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const cards = track.children;
  const cardWidth = cards[0]?.offsetWidth || 300;
  const gap = 20;
  
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
  if (type === 'products') {
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
