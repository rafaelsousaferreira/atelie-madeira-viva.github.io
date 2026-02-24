// Banco de dados de depoimentos (simulado)
let testimonialsDB = [
  {
    id: 1,
    nome: "Ana Silva",
    cidade: "São Paulo, SP",
    produto: "tabua-corte",
    produtoNome: "Tábua de Corte Profissional",
    avaliacao: 5,
    comentario: "A tábua de corte é simplesmente perfeita! Madeira de altíssima qualidade, acabamento impecável. Superou todas as expectativas.",
    fotos: ["assets/images/depoimentos/depo1-1.jpg"],
    data: "2025-02-15",
    destaque: true
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    cidade: "Campinas, SP",
    produto: "mesa",
    produtoNome: "Mesa de Jantar 6 lugares",
    avaliacao: 5,
    comentario: "Mesa robusta e linda! Exatamente como queríamos. O atendimento foi excelente e a entrega super rápida.",
    fotos: ["assets/images/depoimentos/depo2-1.jpg", "assets/images/depoimentos/depo2-2.jpg"],
    data: "2025-02-10",
    destaque: true
  },
  {
    id: 3,
    nome: "Mariana Costa",
    cidade: "São Paulo, SP",
    produto: "suporte-planta",
    produtoNome: "Suporte para Plantas Triplo",
    avaliacao: 5,
    comentario: "O suporte para plantas deu um charme especial na minha varanda. Super resistente e lindo!",
    fotos: [],
    data: "2025-02-05"
  },
  {
    id: 4,
    nome: "Roberto Alves",
    cidade: "Osasco, SP",
    produto: "poltrona",
    produtoNome: "Poltrona Rústica",
    avaliacao: 4,
    comentario: "Poltrona muito confortável e bem acabada. Único ponto é que demorou um pouco para entregar, mas valeu a pena.",
    fotos: ["assets/images/depoimentos/depo4-1.jpg"],
    data: "2025-01-28"
  },
  {
    id: 5,
    nome: "Patrícia Lima",
    cidade: "São Paulo, SP",
    produto: "vaso-gesso",
    produtoNome: "Vaso de Gesso Natural",
    avaliacao: 5,
    comentario: "Os vasos de gesso são uma delicadeza! Comprei 3 e já quero mais. Perfeitos para suculentas.",
    fotos: ["assets/images/depoimentos/depo5-1.jpg", "assets/images/depoimentos/depo5-2.jpg"],
    data: "2025-01-20"
  }
];

// Estado da aplicação
let testimonialsState = {
  filterProduto: '',
  filterRating: 0,
  filterPhotos: 'all',
  page: 1,
  itemsPerPage: 9
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  loadTestimonials();
  setupEventListeners();
  updateFilters();
  initRatingInput();
  initFileUpload();
  loadHomeTestimonials(); // Para página principal
});

// Carrega depoimentos
function loadTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  
  // Filtra
  let filtered = testimonialsDB.filter(test => {
    // Filtro por produto
    if (testimonialsState.filterProduto && test.produto !== testimonialsState.filterProduto) {
      return false;
    }
    
    // Filtro por nota
    if (testimonialsState.filterRating > 0 && test.avaliacao < testimonialsState.filterRating) {
      return false;
    }
    
    // Filtro por fotos
    if (testimonialsState.filterPhotos === 'with-photos' && test.fotos.length === 0) {
      return false;
    }
    
    return true;
  });
  
  // Ordena por data (mais recentes primeiro)
  filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
  
  // Atualiza estatísticas
  updateStats(filtered);
  
  // Paginação
  const start = (testimonialsState.page - 1) * testimonialsState.itemsPerPage;
  const paginated = filtered.slice(start, start + testimonialsState.itemsPerPage);
  
  // Renderiza
  renderTestimonials(grid, paginated);
  
  // Renderiza paginação
  renderPagination(filtered.length);
}

// Renderiza depoimentos
function renderTestimonials(grid, testimonials) {
  if (testimonials.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-comments"></i>
        <h3>Nenhum depoimento encontrado</h3>
        <p>Seja o primeiro a avaliar nossos produtos!</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = testimonials.map(test => `
    <article class="testimonial-card" data-id="${test.id}">
      <div class="testimonial-header">
        <div class="testimonial-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="testimonial-author">
          <h4>${escapeHTML(test.nome)}</h4>
          <div class="location">${escapeHTML(test.cidade)}</div>
        </div>
      </div>
      
      <div class="testimonial-rating">
        ${renderStars(test.avaliacao)}
      </div>
      
      <div class="testimonial-product">
        <span class="product-badge">${escapeHTML(test.produtoNome)}</span>
      </div>
      
      <div class="testimonial-content">
        ${escapeHTML(test.comentario)}
      </div>
      
      ${test.fotos.length > 0 ? `
        <div class="testimonial-photos">
          ${test.fotos.map((foto, index) => `
            <div class="testimonial-photo" onclick="openPhotoModal('${foto}', ${index}, ${JSON.stringify(test.fotos).replace(/"/g, '&quot;')})">
              <img src="${foto}" alt="Foto do produto" loading="lazy">
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="testimonial-date">
        ${formatDate(test.data)}
      </div>
    </article>
  `).join('');
}

// Renderiza estrelas
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// Atualiza estatísticas
function updateStats(testimonials) {
  const avgRating = testimonials.reduce((acc, t) => acc + t.avaliacao, 0) / testimonials.length || 0;
  const avgElement = document.getElementById('avg-rating');
  const starsElement = document.getElementById('avg-stars');
  const totalElement = document.getElementById('total-reviews');
  
  if (avgElement) avgElement.textContent = avgRating.toFixed(1);
  if (starsElement) starsElement.innerHTML = renderStars(Math.round(avgRating));
  if (totalElement) totalElement.textContent = `${testimonials.length} avaliações`;
}

// Carrega depoimentos na página inicial
function loadHomeTestimonials() {
  const container = document.getElementById('home-depoimentos');
  if (!container) return;
  
  // Pega apenas os destacados
  const destaques = testimonialsDB.filter(t => t.destaque).slice(0, 3);
  
  container.innerHTML = `
    <div class="testimonials-slider">
      ${destaques.map(test => `
        <div class="testimonial-card home-card">
          <div class="testimonial-header">
            <div class="testimonial-avatar"><i class="fas fa-user"></i></div>
            <div class="testimonial-author">
              <h4>${escapeHTML(test.nome)}</h4>
              <div class="location">${escapeHTML(test.cidade)}</div>
            </div>
          </div>
          <div class="testimonial-rating">${renderStars(test.avaliacao)}</div>
          <div class="testimonial-content">${escapeHTML(test.comentario.substring(0, 100))}...</div>
          <div class="testimonial-product">${escapeHTML(test.produtoNome)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Configura eventos
function setupEventListeners() {
  // Filtro produto
  const filterProduto = document.getElementById('filter-produto');
  if (filterProduto) {
    filterProduto.addEventListener('change', (e) => {
      testimonialsState.filterProduto = e.target.value;
      testimonialsState.page = 1;
      loadTestimonials();
    });
  }
  
  // Filtro rating
  const filterRating = document.getElementById('filter-rating');
  if (filterRating) {
    filterRating.addEventListener('change', (e) => {
      testimonialsState.filterRating = parseInt(e.target.value) || 0;
      testimonialsState.page = 1;
      loadTestimonials();
    });
  }
  
  // Filtro fotos
  const filterPhotos = document.getElementById('filter-photos');
  if (filterPhotos) {
    filterPhotos.addEventListener('change', (e) => {
      testimonialsState.filterPhotos = e.target.value;
      testimonialsState.page = 1;
      loadTestimonials();
    });
  }
}

// Atualiza opções de filtro
function updateFilters() {
  const filterProduto = document.getElementById('filter-produto');
  if (!filterProduto) return;
  
  // Pega produtos únicos dos depoimentos
  const produtos = [...new Set(testimonialsDB.map(t => t.produtoNome))];
  
  filterProduto.innerHTML = '<option value="">Todos os produtos</option>' +
    produtos.map(p => `<option value="${p}">${escapeHTML(p)}</option>`).join('');
}

// Inicializa input de rating
function initRatingInput() {
  const stars = document.querySelectorAll('.rating-input .stars i');
  const ratingInput = document.getElementById('avaliacao');
  
  if (!stars.length || !ratingInput) return;
  
  stars.forEach(star => {
    star.addEventListener('mouseover', function() {
      const rating = this.dataset.rating;
      highlightStars(rating);
    });
    
    star.addEventListener('mouseout', function() {
      const currentRating = ratingInput.value || 0;
      highlightStars(currentRating);
    });
    
    star.addEventListener('click', function() {
      const rating = this.dataset.rating;
      ratingInput.value = rating;
      highlightStars(rating);
      
      // Marca como preenchido
      stars.forEach(s => {
        if (s.dataset.rating <= rating) {
          s.classList.remove('far');
          s.classList.add('fas');
        } else {
          s.classList.remove('fas');
          s.classList.add('far');
        }
      });
    });
  });
}

// Destaca estrelas
function highlightStars(rating) {
  const stars = document.querySelectorAll('.rating-input .stars i');
  stars.forEach(star => {
    if (star.dataset.rating <= rating) {
      star.classList.add('hover');
    } else {
      star.classList.remove('hover');
    }
  });
}

// Inicializa upload de arquivos
function initFileUpload() {
  const fileInput = document.getElementById('fotos');
  const uploadArea = document.querySelector('.upload-area');
  const previewContainer = document.getElementById('preview-fotos');
  
  if (!fileInput || !uploadArea) return;
  
  // Click na área de upload
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });
  
  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--madeira-media)';
    uploadArea.style.background = '#f5e9de';
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--madeira-clara)';
    uploadArea.style.background = '#fffaf4';
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--madeira-clara)';
    uploadArea.style.background = '#fffaf4';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  });
  
  // Seleção de arquivos
  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });
  
  function handleFiles(files) {
    if (files.length > 5) {
      alert('Máximo de 5 fotos permitidas');
      return;
    }
    
    previewContainer.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith('image/')) {
        alert(`Arquivo ${file.name} não é uma imagem`);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert(`Arquivo ${file.name} excede 5MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.createElement('div');
        preview.className = 'preview-item';
        preview.innerHTML = `
          <img src="${e.target.result}" alt="Preview">
          <button type="button" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
          </button>
        `;
        previewContainer.appendChild(preview);
      };
      reader.readAsDataURL(file);
    });
  }
}

// Envio do formulário
document.getElementById('testimonial-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Verifica honeypot
  const website = document.getElementById('website-dep');
  if (website && website.value !== '') {
    // Provavelmente bot, não processa
    showToast('Depoimento enviado com sucesso!');
    this.reset();
    document.getElementById('preview-fotos').innerHTML = '';
    return;
  }
  
  // Coleta dados
  const formData = {
    nome: document.getElementById('nome-dep').value,
    cidade: document.getElementById('cidade-dep').value || 'Não informado',
    produto: document.getElementById('produto-dep').value,
    produtoNome: document.getElementById('produto-dep').selectedOptions[0].text,
    avaliacao: parseInt(document.getElementById('avaliacao').value),
    comentario: document.getElementById('comentario').value,
    fotos: [], // Em produção, enviaria os arquivos para um servidor
    data: new Date().toISOString().split('T')[0],
    destaque: false
  };
  
  // Validações
  if (!formData.avaliacao) {
    alert('Por favor, dê uma nota ao produto');
    return;
  }
  
  // Simula envio
  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="loading"></span> Enviando...';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Adiciona ao banco (em produção, enviaria para API)
    const newId = Math.max(...testimonialsDB.map(t => t.id)) + 1;
    formData.id = newId;
    testimonialsDB.unshift(formData);
    
    // Recarrega
    loadTestimonials();
    updateFilters();
    
    showToast('Depoimento enviado com sucesso! Agradecemos seu feedback.');
    this.reset();
    document.getElementById('preview-fotos').innerHTML = '';
    
    // Reseta estrelas
    document.querySelectorAll('.rating-input .stars i').forEach(star => {
      star.classList.remove('fas');
      star.classList.add('far');
    });
    
  } catch (error) {
    showToast('Erro ao enviar. Tente novamente.', true);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
});

// Funções auxiliares
window.openPhotoModal = function(photo, index, allPhotos) {
  const modal = document.createElement('div');
  modal.className = 'photo-modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <img src="${photo}" alt="Foto do produto">
      <button class="close-modal" onclick="this.closest('.photo-modal').remove()">
        <i class="fas fa-times"></i>
      </button>
      ${allPhotos.length > 1 ? `
        <button class="modal-prev" onclick="changePhoto(-1, ${index}, ${JSON.stringify(allPhotos).replace(/"/g, '&quot;')})">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="modal-next" onclick="changePhoto(1, ${index}, ${JSON.stringify(allPhotos).replace(/"/g, '&quot;')})">
          <i class="fas fa-chevron-right"></i>
        </button>
      ` : ''}
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fecha com ESC
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.remove();
  });
  modal.focus();
};

window.changePhoto = function(direction, currentIndex, allPhotos) {
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < allPhotos.length) {
    const modal = document.querySelector('.photo-modal.active');
    if (modal) {
      modal.remove();
      openPhotoModal(allPhotos[newIndex], newIndex, allPhotos);
    }
  }
};

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / testimonialsState.itemsPerPage);
  const pagination = document.getElementById('testimonials-pagination');
  
  if (!pagination) return;
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = '';
  
  html += `<button class="next-prev" ${testimonialsState.page === 1 ? 'disabled' : ''} 
           onclick="changePage(${testimonialsState.page - 1})">
           <i class="fas fa-chevron-left"></i> Anterior</button>`;
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= testimonialsState.page - 2 && i <= testimonialsState.page + 2)) {
      html += `<button class="${i === testimonialsState.page ? 'active' : ''}" 
               onclick="changePage(${i})">${i}</button>`;
    } else if (i === testimonialsState.page - 3 || i === testimonialsState.page + 3) {
      html += `<button disabled>...</button>`;
    }
  }
  
  html += `<button class="next-prev" ${testimonialsState.page === totalPages ? 'disabled' : ''} 
           onclick="changePage(${testimonialsState.page + 1})">
           Próximo <i class="fas fa-chevron-right"></i></button>`;
  
  pagination.innerHTML = html;
}

window.changePage = function(page) {
  testimonialsState.page = page;
  loadTestimonials();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>"]/g, function(match) {
    if (match === '&') return '&amp;';
    if (match === '<') return '&lt;';
    if (match === '>') return '&gt;';
    if (match === '"') return '&quot;';
    return match;
  });
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.remove('error', 'success');
    toast.classList.add(isError ? 'error' : 'success');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }
}