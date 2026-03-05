// ========================================
// HOME.JS - Funcionalidades da Página Inicial
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Home.js carregado');
  
  // Aguarda um pouco para garantir que os bancos de dados estejam carregados
  setTimeout(() => {
    initHeroSlider();
    initVideoControls();
    loadFeaturedProducts();
    loadHomeTestimonials();
    initCarousels();
    setupCEPAutocomplete();
  }, 300);
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
  
  console.log('🎬 Inicializando hero slider');
  
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
let isMuted = true;

function loadYouTubeAPI() {
  if (typeof YT === 'undefined') {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}

window.onYouTubeIframeAPIReady = function() {
  console.log('🎥 YouTube API ready');
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
  console.log('🎥 Player pronto');
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

loadYouTubeAPI();

// ========================================
// 3. PRODUTOS EM DESTAQUE (CORRIGIDO)
// ========================================

function loadFeaturedProducts() {
  const track = document.getElementById('products-track');
  if (!track) {
    console.error('❌ Track de produtos não encontrado');
    return;
  }
  
  console.log('📦 Carregando produtos em destaque...');
  
  // Tentativa 1: productsDB global
  let products = [];
  
  if (typeof productsDB !== 'undefined') {
    products = productsDB;
    console.log('📦 productsDB encontrado com', products.length, 'produtos');
  } 
  // Tentativa 2: window.productsDB
  else if (window.productsDB) {
    products = window.productsDB;
    console.log('📦 window.productsDB encontrado com', products.length, 'produtos');
  }
  // Tentativa 3: dados mockados (fallback)
  else {
    console.warn('⚠️ productsDB não encontrado, usando dados mockados');
    products = getMockProducts();
  }
  
  // Verifica produtos com destaque = true
  let featuredProducts = products.filter(p => p.destaque === true);
  
  console.log('✨ Produtos com destaque:', featuredProducts.length);
  
  // Se não tem produtos com destaque, pega os 8 primeiros
  if (featuredProducts.length === 0) {
    console.log('📌 Nenhum produto com destaque, mostrando primeiros 8');
    featuredProducts = products.slice(0, 8);
  } else {
    featuredProducts = featuredProducts.slice(0, 8);
  }
  
  if (featuredProducts.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum produto disponível no momento</div>';
    return;
  }
  
  renderFeaturedProducts(featuredProducts);
}

// Fallback de produtos mockados
function getMockProducts() {
  return [
    {
      id: 1,
      nome: "Tábua de Corte Profissional",
      categoria: "utensilios",
      descricao: "Tábua de corte em madeira de demolição",
      preco: 89.90,
      destaque: true,
      imagens: []
    },
    {
      id: 2,
      nome: "Tábua de Servir com Alça",
      categoria: "utensilios",
      descricao: "Tábua de servir em freijó com alça de couro",
      preco: 129.90,
      destaque: true,
      imagens: []
    },
    {
      id: 3,
      nome: "Poltrona Rústica",
      categoria: "mobiliario",
      descricao: "Poltrona em madeira maciça com assento estofado",
      preco: 890.00,
      destaque: true,
      imagens: []
    },
    {
      id: 5,
      nome: "Mesa de Jantar 6 lugares",
      categoria: "mobiliario",
      descricao: "Mesa em madeira maciça com tampo de 2 metros",
      preco: 1890.00,
      destaque: true,
      imagens: []
    }
  ];
}

function renderFeaturedProducts(products) {
  const track = document.getElementById('products-track');
  
  track.innerHTML = products.map(product => {
    // Pega a categoria em português
    const categoriaNome = getCategoriaNome(product.categoria);
    
    // Gera um gradiente único baseado no ID para variar as cores
    const hue = (product.id * 30) % 360;
    const gradient = `linear-gradient(145deg, hsl(${hue}, 30%, 75%), hsl(${hue}, 40%, 55%))`;
    
    return `
      <div class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        <span class="product-badge">Destaque</span>
        <div class="product-image" style="background: ${gradient};"></div>
        <div class="product-info">
          <div class="product-category">${categoriaNome}</div>
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
// 4. DEPOIMENTOS NA HOME (CORRIGIDO)
// ========================================

function loadHomeTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) {
    console.error('❌ Track de depoimentos não encontrado');
    return;
  }
  
  console.log('💬 Carregando depoimentos...');
  
  // Tentativa 1: testimonialsDB global
  let testimonials = [];
  
  if (typeof testimonialsDB !== 'undefined') {
    testimonials = testimonialsDB;
    console.log('💬 testimonialsDB encontrado com', testimonials.length, 'depoimentos');
  } 
  // Tentativa 2: window.testimonialsDB
  else if (window.testimonialsDB) {
    testimonials = window.testimonialsDB;
    console.log('💬 window.testimonialsDB encontrado com', testimonials.length, 'depoimentos');
  }
  // Tentativa 3: dados mockados (fallback)
  else {
    console.warn('⚠️ testimonialsDB não encontrado, usando dados mockados');
    testimonials = getMockTestimonials();
  }
  
  // Pega depoimentos destacados ou os mais recentes
  let featuredTestimonials = testimonials.filter(t => t.destaque === true);
  
  // Se não tiver destacados, pega os 6 mais recentes
  if (featuredTestimonials.length === 0) {
    featuredTestimonials = [...testimonials]
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 6);
  } else {
    featuredTestimonials = featuredTestimonials.slice(0, 6);
  }
  
  console.log('✨ Depoimentos selecionados:', featuredTestimonials.length);
  
  if (featuredTestimonials.length === 0) {
    track.innerHTML = '<div class="empty-message">Nenhum depoimento no momento</div>';
    return;
  }
  
  renderHomeTestimonials(featuredTestimonials);
}

// Fallback de depoimentos mockados
function getMockTestimonials() {
  return [
    {
      id: 1,
      nome: "Ana Silva",
      cidade: "Salvador, BA",
      produtoNome: "Tábua de Corte",
      avaliacao: 5,
      comentario: "Produto excelente! Superou todas as expectativas.",
      data: "2026-02-15",
      destaque: true
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      cidade: "Camaçari, BA",
      produtoNome: "Mesa de Jantar",
      avaliacao: 5,
      comentario: "Mesa linda e muito bem feita. Atendimento nota 10.",
      data: "2026-02-10",
      destaque: true
    },
    {
      id: 3,
      nome: "Mariana Costa",
      cidade: "Lauro de Freitas, BA",
      produtoNome: "Suporte para Plantas",
      avaliacao: 5,
      comentario: "O suporte ficou perfeito na minha varanda.",
      data: "2026-02-05",
      destaque: false
    }
  ];
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
        <div class="testimonial-content">"${escapeHTML(test.comentario.substring(0, 120))}..."</div>
        <div class="testimonial-footer">
          <span>${formatDate(test.data)}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// 5. CONTROLES DOS CARROSSÉIS (CORRIGIDO)
// ========================================

function initCarousels() {
  // Aguarda a renderização dos cards
  setTimeout(() => {
    setupCarousel('products');
    setupCarousel('testimonials');
  }, 500);
}

function setupCarousel(type) {
  const track = document.getElementById(`${type}-track`);
  const prevBtn = document.getElementById(`${type}-prev`);
  const nextBtn = document.getElementById(`${type}-next`);
  const dotsContainer = document.getElementById(`${type}-dots`);
  
  if (!track) {
    console.log(`❌ Track ${type} não encontrado`);
    return;
  }
  
  const cards = track.children;
  
  if (cards.length === 0) {
    console.log(`⚠️ Nenhum card no carrossel ${type}`);
    return;
  }
  
  console.log(`🔄 Configurando carrossel ${type} com ${cards.length} cards`);
  
  if (!prevBtn || !nextBtn) {
    console.log(`⚠️ Botões do carrossel ${type} não encontrados`);
    return;
  }
  
  // Esconde botões se não houver cards suficientes para rolar
  if (cards.length <= getCardsPerView(type)) {
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
    if (window.innerWidth <= 768) return type === 'products' ? 2 : 1;
    if (window.innerWidth <= 992) return type === 'products' ? 3 : 2;
    return type === 'products' ? 4 : 3;
  }
  
  let cardsPerView = getCardsPerView();
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  // Calcula a largura do card
  function getCardWidth() {
    if (cards.length === 0) return 0;
    const firstCard = cards[0];
    return firstCard.offsetWidth;
  }
  
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
    updateDots();
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
      clearInterval(autoplayInterval);
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
