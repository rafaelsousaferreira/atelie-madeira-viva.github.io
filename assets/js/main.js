// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSlider();
  initLazyLoading();
  initForm();
  initSmoothScroll();
});

// Menu Mobile
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.menu');
  
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
      menu.classList.toggle('active');
      
      // Altera ícone
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    
    // Fecha menu ao clicar em link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
    
    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }
}

// Slider
function initSlider() {
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  
  if (!slider || !slides.length) return;
  
  let currentIndex = 0;
  let isPlaying = true;
  let interval;
  
  // Cria dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualiza dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  function startAutoplay() {
    if (interval) clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoplay() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) stopAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) stopAutoplay();
  });
  
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoplay();
        pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        pauseBtn.setAttribute('aria-label', 'Continuar slideshow');
      } else {
        startAutoplay();
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.setAttribute('aria-label', 'Pausar slideshow');
      }
      isPlaying = !isPlaying;
    });
  }
  
  // Inicia autoplay
  startAutoplay();
  
  // Pausa ao passar mouse
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoplay();
  });
}

// Lazy loading para imagens de fundo
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-bg');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const bgUrl = img.dataset.bg;
          
          if (bgUrl) {
            // Pré-carrega a imagem
            const tempImg = new Image();
            tempImg.src = bgUrl;
            tempImg.onload = () => {
              img.style.backgroundImage = `url(${bgUrl})`;
              img.classList.add('loaded');
            };
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antigos
    lazyImages.forEach(img => {
      const bgUrl = img.dataset.bg;
      if (bgUrl) {
        img.style.backgroundImage = `url(${bgUrl})`;
        img.classList.add('loaded');
      }
    });
  }
}

// Formulário
function initForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  
  const btnSubmit = document.getElementById('btn-submit');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  // Validação em tempo real
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });
  
  function validateField(field) {
    const isValid = field.checkValidity();
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!isValid) {
      field.classList.add('error');
      if (errorElement) errorElement.style.display = 'block';
    } else {
      field.classList.remove('error');
      if (errorElement) errorElement.style.display = 'none';
    }
    
    return isValid;
  }
  
  function showToast(message, isError = false) {
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.remove('error', 'success');
    toast.classList.add(isError ? 'error' : 'success');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
  
  // Envio do formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Valida todos os campos
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      showToast('Por favor, preencha todos os campos obrigatórios corretamente.', true);
      
      // Rola para o primeiro erro
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }
    
    // Verifica honeypot (anti-spam)
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value !== '') {
      // Provavelmente é um bot, mas não avisamos
      showToast('Mensagem enviada com sucesso! (simulado)');
      form.reset();
      return;
    }
    
    // Simula envio
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<span class="loading"></span> Enviando...';
    
    try {
      // Simula requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em produção, aqui você faria o fetch para seu backend
      // const formData = new FormData(form);
      // const response = await fetch('https://seu-backend.com/api/orcamento', {
      //   method: 'POST',
      //   body: formData
      // });
      
      showToast('Orçamento solicitado com sucesso! Em breve entraremos em contato.');
      form.reset();
      
      // Limpa estados de erro
      inputs.forEach(input => {
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) errorElement.style.display = 'none';
      });
      
    } catch (error) {
      console.error('Erro:', error);
      showToast('Ocorreu um erro. Por favor, tente novamente.', true);
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i><span>Solicitar orçamento</span>';
    }
  });
}

// Scroll suave para links internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Atualiza link ativo no menu baseado na rolagem
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
});