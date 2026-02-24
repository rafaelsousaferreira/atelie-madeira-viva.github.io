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

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  setupEventListeners();
  loadSubcategorias();
  checkCEPFromLocalStorage();
});

// Carrega produtos baseado nos filtros
function loadProducts() {
  const grid = document.getElementById('products-grid');
  const countElement = document.getElementById('products-total');
  
  // Filtra produtos
  let filtered = productsDB.filter(product => {
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
    
    // Filtro regional para plantas vivas
    if (product.regional && currentState.cepInfo) {
      // Verifica se o CEP está na região permitida
      const cepPermitido = verificarCEPRestricao(product.regioes, currentState.cepInfo);
      if (!cepPermitido) return false;
    }
    
    return true;
  });
  
  // Ordena
  filtered = sortProducts(filtered, currentState.sortBy);
  
  // Atualiza contador
  countElement.textContent = filtered.length;
  
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
}

// Renderiza produtos
function renderProducts(grid, products) {
  grid.innerHTML = products.map(product => {
    const regionalWarning = product.regional ? 
      `<div class="regional-warning">
        <i class="fas fa-map-marker-alt"></i>
        <span>Produto disponível apenas para região metropolitana de SP</span>
       </div>` : '';
    
    return `
      <article class="product-card" data-id="${product.id}">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        ${product.regional ? '<span class="product-badge region">📍 Regional</span>' : ''}
        
        <div class="product-image lazy-bg" data-bg="${product.imagem}" 
             style="background-color: #d9c5b0;" 
             role="img" aria-label="${product.nome}"></div>
        
        <div class="product-info">
          <div class="product-category">${getCategoriaNome(product.categoria)}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${product.descricao}</p>
          
          <div class="product-tags">
            ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
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
  
  // Inicializa lazy loading para novas imagens
  initLazyLoading();
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
  const totalPages = Math.ceil(totalItems / currentState.itemsPerPage);
  const pagination = document.getElementById('pagination');
  
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

// Carrega subcategorias baseado na categoria selecionada
function loadSubcategorias() {
  const categoria = currentState.categoria;
  const subGroup = document.getElementById('subcategoria-group');
  const subSelect = document.getElementById('subcategoria-filter');
  
  if (!categoria) {
    subGroup.style.display = 'none';
    return;
  }
  
  // Mapeia subcategorias
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
    case 'recentes':
    default:
      // Assume que IDs maiores são mais recentes
      sorted.sort((a, b) => b.id - a.id);
      break;
  }
  
  return sorted;
}

// Verifica restrição de CEP
function verificarCEPRestricao(regioesPermitidas, cepInfo) {
  // Simula verificação de CEP
  // Em produção, isso seria feito via API ou regras de negócio reais
  if (!cepInfo) return false;
  
  const cep = cepInfo.replace(/\D/g, '');
  const faixaSP = ['01000-000', '09999-999']; // Faixa de CEP de SP
  
  // Verifica se CEP está na faixa de SP
  return cep >= '01000000' && cep <= '09999999';
}

// Verifica CEP via API (ViaCEP)
async function verificarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  
  if (cepLimpo.length !== 8) {
    return null;
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();
    
    if (!data.erro) {
      return {
        cep: cep,
        cidade: data.localidade,
        uf: data.uf,
        regiao: `${data.uf}-${data.localidade}`
      };
    }
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
  }
  
  return null;
}

// Event Listeners
function setupEventListeners() {
  // Busca
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('product-search');
    currentState.searchTerm = searchInput.value;
    currentState.page = 1;
    loadProducts();
    updateActiveFilters();
  });
  
  // Categoria
  document.getElementById('categoria-filter').addEventListener('change', (e) => {
    currentState.categoria = e.target.value;
    currentState.subcategoria = ''; // Reseta subcategoria
    currentState.page = 1;
    loadSubcategorias();
    loadProducts();
    updateActiveFilters();
  });
  
  // Subcategoria
  document.getElementById('subcategoria-filter').addEventListener('change', (e) => {
    currentState.subcategoria = e.target.value;
    currentState.page = 1;
    loadProducts();
    updateActiveFilters();
  });
  
  // Ordenação
  document.getElementById('sort-filter').addEventListener('change', (e) => {
    currentState.sortBy = e.target.value;
    loadProducts();
  });
  
  // Input de busca com debounce
  let searchTimeout;
  document.getElementById('product-search').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentState.searchTerm = e.target.value;
      currentState.page = 1;
      loadProducts();
      updateActiveFilters();
    }, 500);
  });
}

// Atualiza tags de filtros ativos
function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  const filters = [];
  
  if (currentState.searchTerm) {
    filters.push({
      type: 'Busca',
      value: currentState.searchTerm,
      remove: () => {
        currentState.searchTerm = '';
        document.getElementById('product-search').value = '';
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
        document.getElementById('categoria-filter').value = '';
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
        document.getElementById('subcategoria-filter').value = '';
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  container.innerHTML = filters.map(filter => `
    <span class="filter-tag">
      ${filter.type}: ${filter.value}
      <button onclick="(${filter.remove})()" aria-label="Remover filtro">
        <i class="fas fa-times"></i>
      </button>
    </span>
  `).join('');
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
  
  document.getElementById('search-form').reset();
  document.getElementById('categoria-filter').value = '';
  document.getElementById('subcategoria-filter').innerHTML = '';
  document.getElementById('sort-filter').value = 'recentes';
  document.getElementById('subcategoria-group').style.display = 'none';
  
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
  
  window.open(`https://wa.me/557181804578?text=${mensagem}`, '_blank');
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

// Lazy loading
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-bg');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const bg = img.dataset.bg;
          if (bg) {
            img.style.backgroundImage = `url(${bg})`;
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => {
      if (img.dataset.bg) {
        img.style.backgroundImage = `url(${img.dataset.bg})`;
      }
    });
  }
}
