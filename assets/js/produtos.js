// Banco de dados de produtos
const productsDB = [
  // Utensílios
  {
    id: 1,
    nome: "Tábua de Corte Profissional",
    categoria: "utensilios",
    subcategoria: "tabuas-corte",
    descricao: "Tábua de corte em madeira de demolição, ideal para cozinha profissional",
    imagem: "assets/images/produtos/tabua-corte-1.jpg",
    tags: ["madeira", "corte", "cozinha"],
    preco: 89.90,
    destaque: true
  },
  {
    id: 2,
    nome: "Tábua de Servir com Alça",
    categoria: "utensilios",
    subcategoria: "tabuas-servir",
    descricao: "Tábua de servir em freijó com alça de couro, perfeita para queijos e frios",
    imagem: "assets/images/produtos/tabua-servir-1.jpg",
    tags: ["servir", "queijos", "frios"],
    preco: 129.90,
    destaque: true
  },
  
  // Mobiliário
  {
    id: 3,
    nome: "Poltrona Rústica",
    categoria: "mobiliario",
    subcategoria: "poltronas",
    descricao: "Poltrona em madeira maciça com assento estofado",
    imagem: "assets/images/produtos/poltrona-1.jpg",
    tags: ["poltrona", "estar", "conforto"],
    preco: 890.00,
    destaque: true
  },
  {
    id: 4,
    nome: "Banco Orgânico",
    categoria: "mobiliario",
    subcategoria: "bancos",
    descricao: "Banco em tronco maciço com acabamento natural",
    imagem: "assets/images/produtos/banco-1.jpg",
    tags: ["banco", "rústico", "orgânico"],
    preco: 450.00
  },
  {
    id: 5,
    nome: "Mesa de Jantar 6 lugares",
    categoria: "mobiliario",
    subcategoria: "mesas",
    descricao: "Mesa em madeira maciça com tampo de 2 metros",
    imagem: "assets/images/produtos/mesa-1.jpg",
    tags: ["mesa", "jantar", "6 lugares"],
    preco: 1890.00,
    destaque: true
  },
  {
    id: 6,
    nome: "Cadeira Retrô",
    categoria: "mobiliario",
    subcategoria: "cadeiras",
    descricao: "Cadeira com design retrô em madeira e palhinha",
    imagem: "assets/images/produtos/cadeira-1.jpg",
    tags: ["cadeira", "retrô", "palhinha"],
    preco: 390.00
  },
  
  // Organização
  {
    id: 7,
    nome: "Prateleira Flutuante",
    categoria: "organizacao",
    subcategoria: "prateleiras",
    descricao: "Prateleira flutuante em carvalho, 1,20m",
    imagem: "assets/images/produtos/prateleira-1.jpg",
    tags: ["prateleira", "flutuante", "organização"],
    preco: 249.00,
    destaque: true
  },
  {
    id: 8,
    nome: "Móvel Multiuso",
    categoria: "organizacao",
    subcategoria: "moveis",
    descricao: "Móvel com prateleiras e gavetas, sob medida",
    imagem: "assets/images/produtos/movel-1.jpg",
    tags: ["móvel", "organização", "gavetas"],
    preco: 1250.00
  },
  {
    id: 9,
    nome: "Nicho Decorativo",
    categoria: "organizacao",
    subcategoria: "nichos",
    descricao: "Conjunto de 3 nichos geométricos",
    imagem: "assets/images/produtos/nicho-1.jpg",
    tags: ["nicho", "decoração", "geométrico"],
    preco: 189.00
  },
  
  // Jardinagem
  {
    id: 10,
    nome: "Suporte para Plantas Triplo",
    categoria: "jardinagem",
    subcategoria: "suportes-plantas",
    descricao: "Estrutura em madeira para 3 vasos",
    imagem: "assets/images/produtos/suporte-planta-1.jpg",
    tags: ["suporte", "plantas", "jardinagem"],
    preco: 159.00,
    destaque: true
  },
  {
    id: 11,
    nome: "Casa de Pássaro Decorativa",
    categoria: "jardinagem",
    subcategoria: "casa-passaro",
    descricao: "Casa de pássaro em madeira com telhado ecológico",
    imagem: "assets/images/produtos/casa-passaro-1.jpg",
    tags: ["pássaro", "jardim", "decoração"],
    preco: 79.90
  },
  
  // Decoração
  {
    id: 12,
    nome: "Vaso de Gesso Natural",
    categoria: "decoracao",
    subcategoria: "vasos-gesso",
    descricao: "Vaso artesanal em gesso com textura orgânica",
    imagem: "assets/images/produtos/vaso-gesso-1.jpg",
    tags: ["vaso", "gesso", "decoração"],
    preco: 45.00,
    destaque: true
  },
  {
    id: 13,
    nome: "Vaso de Argamassa",
    categoria: "decoracao",
    subcategoria: "vasos-argamassa",
    descricao: "Vaso em argamassa com acabamento cimentício",
    imagem: "assets/images/produtos/vaso-argamassa-1.jpg",
    tags: ["argamassa", "cimento", "moderno"],
    preco: 65.00
  },
  
  // Plantas Vivas (com restrição regional)
  {
    id: 14,
    nome: "Arranjo de Suculentas",
    categoria: "plantas-vivas",
    subcategoria: "arranjos-vivos",
    descricao: "Arranjo com diversas suculentas em vaso de cerâmica",
    imagem: "assets/images/produtos/arranjo-suculentas.jpg",
    tags: ["suculentas", "vivas", "arranjo"],
    preco: 120.00,
    regional: true,
    regioes: ["SP", "SP-Capital", "SP-Grande"],
    destaque: true
  },
  {
    id: 15,
    nome: "Mini Jardim Terrário",
    categoria: "plantas-vivas",
    subcategoria: "arranjos-vivos",
    descricao: "Mini jardim em terrário de vidro com plantas vivas",
    imagem: "assets/images/produtos/terrario.jpg",
    tags: ["terrário", "jardim", "mini"],
    preco: 150.00,
    regional: true,
    regioes: ["SP", "SP-Capital", "SP-Grande"]
  }
];

// Estado da aplicação
let currentState = {
  searchTerm: '',
  categoria: '',
  subcategoria: '',
  sortBy: 'recentes',
  page: 1,
  itemsPerPage: 12,
  cepInfo: null
};

// Cache para imagens que falharam
const imageErrorCache = new Set();

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página de produtos iniciada');
  loadProducts();
  setupEventListeners();
  loadSubcategorias();
});

// Carrega produtos baseado nos filtros
function loadProducts() {
  const grid = document.getElementById('products-grid');
  const countElement = document.getElementById('products-total');
  
  if (!grid) {
    console.error('Grid de produtos não encontrado');
    return;
  }
  
  // Mostra loading
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>';
  
  // Filtra produtos
  setTimeout(() => {
    let filtered = filterProducts();
    
    // Atualiza contador
    if (countElement) countElement.textContent = filtered.length;
    
    // Paginação
    const start = (currentState.page - 1) * currentState.itemsPerPage;
    const paginated = filtered.slice(start, start + currentState.itemsPerPage);
    
    // Renderiza
    if (filtered.length === 0) {
      renderNoResults(grid);
    } else {
      renderProducts(grid, paginated);
    }
    
    // Renderiza paginação
    renderPagination(filtered.length);
  }, 300); // Pequeno delay para mostrar loading
}

// Filtra produtos
function filterProducts() {
  return productsDB.filter(product => {
    // Filtro de busca
    if (currentState.searchTerm) {
      const term = currentState.searchTerm.toLowerCase();
      const match = product.nome.toLowerCase().includes(term) ||
                   product.descricao.toLowerCase().includes(term) ||
                   product.tags.some(tag => tag.toLowerCase().includes(term));
      if (!match) return false;
    }
    
    // Filtro de categoria
    if (currentState.categoria && product.categoria !== currentState.categoria) {
      return false;
    }
    
    // Filtro de subcategoria
    if (currentState.subcategoria && product.subcategoria !== currentState.subcategoria) {
      return false;
    }
    
    return true;
  });
}

// Renderiza produtos com <img src>
function renderProducts(grid, products) {
  grid.innerHTML = products.map(product => {
    const regionalWarning = product.regional ? 
      `<div class="regional-warning">
        <i class="fas fa-map-marker-alt"></i>
        <span>Produto disponível apenas para região metropolitana de SP</span>
       </div>` : '';
    
    // Gera placeholder SVG para fallback
    const placeholderSVG = generatePlaceholderSVG(product);
    const placeholderDataURL = `data:image/svg+xml,${encodeURIComponent(placeholderSVG)}`;
    
    return `
      <article class="product-card" data-id="${product.id}">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        ${product.regional ? '<span class="product-badge region">📍 Regional</span>' : ''}
        
        <div class="product-image-container">
          <!-- Imagem principal com fallback em camadas -->
          <img 
            class="product-img" 
            src="${product.imagem}" 
            alt="${product.nome}"
            loading="lazy"
            onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';"
          >
          <!-- Fallback SVG (escondido inicialmente) -->
          <div class="product-img-fallback" style="display:none;">
            <img src="${placeholderDataURL}" alt="${product.nome} - placeholder" class="product-img-placeholder">
          </div>
        </div>
        
        <div class="product-info">
          <div class="product-category">${getCategoriaNome(product.categoria)}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${escapeHTML(product.descricao)}</p>
          
          <div class="product-tags">
            ${product.tags.map(tag => `<span class="product-tag">${escapeHTML(tag)}</span>`).join('')}
          </div>
          
          ${regionalWarning}
          
          <div class="product-footer">
            <div class="product-price">
              R$ ${product.preco.toFixed(2)} 
              <small>à vista</small>
            </div>
            <button class="btn-product" onclick="solicitarOrcamento(${product.id})">
              <i class="fab fa-whatsapp"></i> Orçamento
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Gera placeholder SVG
function generatePlaceholderSVG(product) {
  const cores = {
    'utensilios': '#d9c5b0',
    'mobiliario': '#b28b6f',
    'organizacao': '#c4a27a',
    'jardinagem': '#9cb08b',
    'decoracao': '#c7aa8e',
    'plantas-vivas': '#8ba88b'
  };
  
  const cor = cores[product.categoria] || '#d9c5b0';
  const icon = getProductIcon(product.categoria);
  
  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="${cor}"/>
    <rect width="400" height="300" fill="url(#wood)" opacity="0.3"/>
    <defs>
      <pattern id="wood" patternUnits="userSpaceOnUse" width="40" height="40">
        <path d="M0 0 L40 40" stroke="#634832" stroke-width="1" opacity="0.2"/>
        <path d="M40 0 L0 40" stroke="#634832" stroke-width="1" opacity="0.2"/>
      </pattern>
    </defs>
    <text x="200" y="150" font-family="'Font Awesome 6 Free', 'Segoe UI', Arial" 
          font-size="60" text-anchor="middle" fill="#3e2e23" opacity="0.8">${icon}</text>
    <text x="200" y="200" font-family="Arial" font-size="14" 
          text-anchor="middle" fill="#3e2e23" font-weight="bold">${escapeHTML(product.nome)}</text>
    <text x="200" y="230" font-family="Arial" font-size="11" 
          text-anchor="middle" fill="#634832">Clique para orçamento</text>
  </svg>`;
}

// Retorna ícone baseado na categoria
function getProductIcon(categoria) {
  const icons = {
    'utensilios': '🔪',
    'mobiliario': '🪑',
    'organizacao': '📦',
    'jardinagem': '🌱',
    'decoracao': '🏺',
    'plantas-vivas': '🌿'
  };
  return icons[categoria] || '🪵';
}

// Renderiza "sem resultados"
function renderNoResults(grid) {
  grid.innerHTML = `
    <div class="no-results">
      <i class="fas fa-search"></i>
      <h3>Nenhum produto encontrado</h3>
      <p>Tente buscar com outros termos ou remover os filtros</p>
      <button onclick="resetFilters()" class="btn-secondary">
        Limpar filtros
      </button>
    </div>
  `;
}

// Renderiza paginação
function renderPagination(totalItems) {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  
  const totalPages = Math.ceil(totalItems / currentState.itemsPerPage);
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // Botão anterior
  html += `<button class="next-prev" ${currentState.page === 1 ? 'disabled' : ''} 
           onclick="changePage(${currentState.page - 1})">
           <i class="fas fa-chevron-left"></i> Anterior</button>`;
  
  // Páginas
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentState.page - 2 && i <= currentState.page + 2)) {
      html += `<button class="${i === currentState.page ? 'active' : ''}" 
               onclick="changePage(${i})">${i}</button>`;
    } else if (i === currentState.page - 3 || i === currentState.page + 3) {
      html += `<button disabled>...</button>`;
    }
  }
  
  // Botão próximo
  html += `<button class="next-prev" ${currentState.page === totalPages ? 'disabled' : ''} 
           onclick="changePage(${currentState.page + 1})">
           Próximo <i class="fas fa-chevron-right"></i></button>`;
  
  pagination.innerHTML = html;
}

// Carrega subcategorias
function loadSubcategorias() {
  const categoria = currentState.categoria;
  const subGroup = document.getElementById('subcategoria-group');
  const subSelect = document.getElementById('subcategoria-filter');
  
  if (!subGroup || !subSelect) return;
  
  if (!categoria) {
    subGroup.style.display = 'none';
    return;
  }
  
  const subcategorias = [...new Set(
    productsDB
      .filter(p => p.categoria === categoria)
      .map(p => p.subcategoria)
  )];
  
  if (subcategorias.length > 0) {
    subGroup.style.display = 'block';
    subSelect.innerHTML = '<option value="">Todas as subcategorias</option>' +
      subcategorias.map(sub => {
        const nome = getSubcategoriaNome(sub);
        return `<option value="${sub}" ${currentState.subcategoria === sub ? 'selected' : ''}>${nome}</option>`;
      }).join('');
  } else {
    subGroup.style.display = 'none';
  }
}

// Ordena produtos
function sortProducts(products, sortBy) {
  const sorted = [...products];
  
  switch(sortBy) {
    case 'nome-asc':
      sorted.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case 'nome-desc':
      sorted.sort((a, b) => b.nome.localeCompare(a.nome));
      break;
    default:
      sorted.sort((a, b) => b.id - a.id);
      break;
  }
  
  return sorted;
}

// Event Listeners
function setupEventListeners() {
  // Busca
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = document.getElementById('product-search');
      if (searchInput) {
        currentState.searchTerm = searchInput.value;
        currentState.page = 1;
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  // Categoria
  const categoriaFilter = document.getElementById('categoria-filter');
  if (categoriaFilter) {
    categoriaFilter.addEventListener('change', (e) => {
      currentState.categoria = e.target.value;
      currentState.subcategoria = '';
      currentState.page = 1;
      loadSubcategorias();
      loadProducts();
      updateActiveFilters();
    });
  }
  
  // Subcategoria
  const subcategoriaFilter = document.getElementById('subcategoria-filter');
  if (subcategoriaFilter) {
    subcategoriaFilter.addEventListener('change', (e) => {
      currentState.subcategoria = e.target.value;
      currentState.page = 1;
      loadProducts();
      updateActiveFilters();
    });
  }
  
  // Ordenação
  const sortFilter = document.getElementById('sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      currentState.sortBy = e.target.value;
      loadProducts();
    });
  }
  
  // Input de busca com debounce
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentState.searchTerm = e.target.value;
        currentState.page = 1;
        loadProducts();
        updateActiveFilters();
      }, 500);
    });
  }
}

// Atualiza filtros ativos
function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  if (!container) return;
  
  const filters = [];
  
  if (currentState.searchTerm) {
    filters.push({
      type: 'Busca',
      value: currentState.searchTerm,
      remove: () => {
        currentState.searchTerm = '';
        const input = document.getElementById('product-search');
        if (input) input.value = '';
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  if (currentState.categoria) {
    filters.push({
      type: 'Categoria',
      value: getCategoriaNome(currentState.categoria),
      remove: () => {
        currentState.categoria = '';
        currentState.subcategoria = '';
        const select = document.getElementById('categoria-filter');
        if (select) select.value = '';
        loadSubcategorias();
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  if (currentState.subcategoria) {
    filters.push({
      type: 'Subcategoria',
      value: getSubcategoriaNome(currentState.subcategoria),
      remove: () => {
        currentState.subcategoria = '';
        const select = document.getElementById('subcategoria-filter');
        if (select) select.value = '';
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  if (filters.length === 0) {
    container.innerHTML = '';
  } else {
    container.innerHTML = filters.map(filter => `
      <span class="filter-tag">
        ${filter.type}: ${escapeHTML(filter.value)}
        <button onclick="(${filter.remove})()" aria-label="Remover filtro">
          <i class="fas fa-times"></i>
        </button>
      </span>
    `).join('');
  }
}

// Funções globais
window.changePage = function(page) {
  currentState.page = page;
  loadProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.resetFilters = function() {
  currentState = {
    searchTerm: '',
    categoria: '',
    subcategoria: '',
    sortBy: 'recentes',
    page: 1,
    itemsPerPage: 12,
    cepInfo: currentState.cepInfo
  };
  
  const searchInput = document.getElementById('product-search');
  if (searchInput) searchInput.value = '';
  
  const categoriaSelect = document.getElementById('categoria-filter');
  if (categoriaSelect) categoriaSelect.value = '';
  
  const subcategoriaSelect = document.getElementById('subcategoria-filter');
  if (subcategoriaSelect) subcategoriaSelect.innerHTML = '';
  
  const sortSelect = document.getElementById('sort-filter');
  if (sortSelect) sortSelect.value = 'recentes';
  
  const subGroup = document.getElementById('subcategoria-group');
  if (subGroup) subGroup.style.display = 'none';
  
  loadProducts();
  updateActiveFilters();
};

window.solicitarOrcamento = function(productId) {
  const product = productsDB.find(p => p.id === productId);
  if (!product) return;
  
  const mensagem = `Olá! Gostaria de solicitar um orçamento para o produto: 
*${product.nome}*
Categoria: ${getCategoriaNome(product.categoria)}
Preço: R$ ${product.preco.toFixed(2)}

Poderia me passar mais informações?`.replace(/\n/g, '%0A');
  
  window.open(`https://wa.me/5511975321894?text=${mensagem}`, '_blank');
};

// Helpers
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

function getSubcategoriaNome(subcategoria) {
  const nomes = {
    'tabuas-corte': 'Tábuas de Corte',
    'tabuas-servir': 'Tábuas de Servir',
    'poltronas': 'Poltronas',
    'bancos': 'Bancos',
    'mesas': 'Mesas',
    'cadeiras': 'Cadeiras',
    'prateleiras': 'Prateleiras',
    'moveis': 'Móveis',
    'nichos': 'Nichos',
    'suportes-plantas': 'Suportes para Plantas',
    'casa-passaro': 'Casas de Pássaro',
    'vasos-gesso': 'Vasos de Gesso',
    'vasos-argamassa': 'Vasos de Argamassa',
    'arranjos-vivos': 'Arranjos Vivos'
  };
  return nomes[subcategoria] || subcategoria;
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

// Função para pré-carregar e verificar imagens (útil para debug)
window.verificarImagens = function() {
  console.group('🔍 Verificação de Imagens');
  productsDB.forEach(product => {
    const img = new Image();
    img.onload = () => console.log(`✅ ${product.nome}: imagem OK`);
    img.onerror = () => console.warn(`❌ ${product.nome}: imagem NÃO encontrada em ${product.imagem}`);
    img.src = product.imagem;
  });
  console.groupEnd();
};
