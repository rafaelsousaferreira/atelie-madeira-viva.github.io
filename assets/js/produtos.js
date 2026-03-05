// Banco de dados de produtos com múltiplas imagens
const productsDB = [
  // Utensílios
  {
    id: 1,
    nome: "Tábua de Corte Profissional",
    slug: "tabua-corte-profissional",
    categoria: "utensilios",
    subcategoria: "tabuas-corte",
    descricao: "Tábua de corte em madeira de demolição, ideal para cozinha profissional. Possui sulco para coleta de líquidos e pés antiderrapantes.",
    descricao_completa: "<p>A Tábua de Madeira Macica com azulejo personalizado é a escolha ideal para quem valoriza a qualidade e a estética na cozinha. Feita de madeira nobre, esta tábua combina durabilidade e elegancia, tornando-se um item indispensável para o preparo de suas receitas favoritas. É importante ressaltar que a tábua é livre de BPA, garantindo seguranca na preparacao dos alimentos. Ideal para presentear ou para uso pessoal, esta tábua é uma adicao valiosa a sua colecao de utensílios de cozinha. Garantia do vendedor: 1 meses</p><p><strong>Características:</strong></p><ul><li>Madeira: Nobre</li><li>Dimensões: 50cm x 15cm, 5x2cm</li><li>Acabamento com óleo mineral</li><li>Pés antiderrapantes</li><li>Sulco para coleta de líquidos</li></ul>",
    imagens: [
      "assets/images/produtos/tabua-corte-1.jpg",
      "assets/images/produtos/tabua-corte-2.jpg",
      "assets/images/produtos/tabua-corte-3.jpg",
      "assets/images/produtos/tabua-corte-4.jpg",
      "assets/images/produtos/tabua-corte-5.jpg"
    ],
    tags: ["madeira", "corte", "cozinha", "demolição"],
    preco: 139.90,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-4361324291-tabua-de-madeira-macica-50x155x2cm-cazulejo-personalizado-_JM?matt_tool=38524122#origin=share&sid=share",
    estoque: 15,
    sku: "TC-001",
    peso: "1.2kg",
    dimensoes: "40x30x2cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 2,
    nome: "Tábua de Servir com Alça",
    slug: "tabua-servir-alca",
    categoria: "utensilios",
    subcategoria: "tabuas-servir",
    descricao: "Tábua de servir em freijó com alça de couro, perfeita para queijos e frios. Acabamento com cera natural.",
    descricao_completa: "<p>Elegante e funcional, esta tábua de servir é ideal para apresentação de queijos, frios e petiscos.</p><p><strong>Características:</strong></p><ul><li>Madeira: Freijó</li><li>Dimensões: 35cm x 20cm x 2cm</li><li>Alça em couro legítimo</li><li>Acabamento com cera de abelha</li><li>Inclui jogo de facas para queijo (opcional)</li></ul>",
    imagens: [
      "assets/images/produtos/tabua-servir-1.jpg",
      "assets/images/produtos/tabua-servir-2.jpg",
      "assets/images/produtos/tabua-servir-3.jpg"
    ],
    tags: ["servir", "queijos", "frios", "couro"],
    preco: 129.90,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-9876543210-tabua-servir-freijo-alca-couro-_JM",
    estoque: 8,
    sku: "TS-002",
    peso: "0.9kg",
    dimensoes: "35x20x2cm",
    prazo_fabricacao: "12 dias"
  },
  
  // Mobiliário
  {
    id: 3,
    nome: "Poltrona Rústica",
    slug: "poltrona-rustica",
    categoria: "mobiliario",
    subcategoria: "poltronas",
    descricao: "Poltrona em madeira maciça com assento estofado em linho. Design atemporal que combina com diversos estilos de decoração.",
    descricao_completa: "<p>Conforto e elegância se encontram nesta poltrona feita artesanalmente.</p><p><strong>Características:</strong></p><ul><li>Estrutura: Madeira maciça (Cedro)</li><li>Estofado: Espuma D33 + Tecido Linho</li><li>Acabamento: Verniz fosco</li><li>Dimensões: 80cm (A) x 70cm (L) x 75cm (P)</li><li>Peso máximo suportado: 120kg</li></ul>",
    imagens: [
      "assets/images/produtos/poltrona-1.jpg",
      "assets/images/produtos/poltrona-2.jpg",
      "assets/images/produtos/poltrona-3.jpg"
    ],
    tags: ["poltrona", "estar", "conforto", "linho"],
    preco: 890.00,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-1122334455-poltrona-rustica-madeira-macica-_JM",
    estoque: 3,
    sku: "PL-003",
    peso: "15kg",
    dimensoes: "80x70x75cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 4,
    nome: "Banco Orgânico",
    slug: "banco-organico",
    categoria: "mobiliario",
    subcategoria: "bancos",
    descricao: "Banco em tronco maciço com acabamento natural. Peça única, esculpida à mão.",
    descricao_completa: "<p>Cada banco é único, mantendo as características naturais da madeira.</p><p><strong>Características:</strong></p><ul><li>Madeira: Tronco maciço de Imbuia</li><li>Acabamento: Resina ecológica</li><li>Altura: 45cm</li><li>Diâmetro aproximado: 35cm</li><li>Peça artesanal - medidas podem variar</li></ul>",
    imagens: [
      "assets/images/produtos/banco-1.jpg",
      "assets/images/produtos/banco-2.jpg"
    ],
    tags: ["banco", "rústico", "orgânico", "tronco"],
    preco: 450.00,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-9988776655-banco-organico-tronco-macico-_JM",
    estoque: 2,
    sku: "BN-004",
    peso: "8kg",
    dimensoes: "45x35x35cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 5,
    nome: "Mesa de Jantar 6 lugares",
    slug: "mesa-jantar-6-lugares",
    categoria: "mobiliario",
    subcategoria: "mesas",
    descricao: "Mesa em madeira maciça com tampo de 2 metros. Ideal para famílias que gostam de receber.",
    descricao_completa: "<p>Uma mesa imponente e elegante para seus momentos especiais.</p><p><strong>Características:</strong></p><ul><li>Madeira: Carvalho maciço</li><li>Dimensões: 200cm x 100cm x 76cm</li><li>Acabamento: Verniz marítimo</li><li>Base em formato X para maior estabilidade</li><li>Acompanha 6 cadeiras (vendidas separadamente)</li></ul>",
    imagens: [
      "assets/images/produtos/mesa-1.jpg",
      "assets/images/produtos/mesa-2.jpg",
      "assets/images/produtos/mesa-3.jpg"
    ],
    tags: ["mesa", "jantar", "6 lugares", "carvalho"],
    preco: 1890.00,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-5544332211-mesa-jantar-carvalho-6-lugares-_JM",
    estoque: 2,
    sku: "MS-005",
    peso: "45kg",
    dimensoes: "200x100x76cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 6,
    nome: "Cadeira Retrô",
    slug: "cadeira-retro",
    categoria: "mobiliario",
    subcategoria: "cadeiras",
    descricao: "Cadeira com design retrô em madeira e palhinha. Conforto e estilo para sua sala de jantar.",
    descricao_completa: "<p>Inspirada nas cadeiras dos anos 50, esta peça combina tradição e conforto.</p><p><strong>Características:</strong></p><ul><li>Madeira: Freijó</li><li>Assento: Palhinha natural</li><li>Acabamento: Cera incolor</li><li>Dimensões: 85cm (A) x 45cm (L) x 50cm (P)</li><li>Empilhável</li></ul>",
    imagens: [
      "assets/images/produtos/cadeira-1.jpg",
      "assets/images/produtos/cadeira-2.jpg"
    ],
    tags: ["cadeira", "retrô", "palhinha", "jantar"],
    preco: 390.00,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-6677889900-cadeira-retro-palhinha-freijo-_JM",
    estoque: 12,
    sku: "CD-006",
    peso: "5kg",
    dimensoes: "85x45x50cm",
    prazo_fabricacao: "12 dias"
  },
  
  // Organização
  {
    id: 7,
    nome: "Prateleira Flutuante",
    slug: "prateleira-flutuante",
    categoria: "organizacao",
    subcategoria: "prateleiras",
    descricao: "Prateleira flutuante em carvalho, 1,20m. Sistema invisível de fixação.",
    descricao_completa: "<p>O conceito flutuante cria um visual clean e moderno para qualquer ambiente.</p><p><strong>Características:</strong></p><ul><li>Madeira: Carvalho</li><li>Dimensões: 120cm x 20cm x 2.5cm</li><li>Sistema de fixação invisível incluso</li><li>Suporta até 15kg</li><li>Acabamento: Verniz acetinado</li></ul>",
    imagens: [
      "assets/images/produtos/prateleira-1.jpg",
      "assets/images/produtos/prateleira-2.jpg"
    ],
    tags: ["prateleira", "flutuante", "organização", "carvalho"],
    preco: 249.00,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-2233445566-prateleira-flutuante-carvalho-120m-_JM",
    estoque: 10,
    sku: "PR-007",
    peso: "3.5kg",
    dimensoes: "120x20x2.5cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 8,
    nome: "Móvel Multiuso",
    slug: "movel-multiuso",
    categoria: "organizacao",
    subcategoria: "moveis",
    descricao: "Móvel com prateleiras e gavetas, sob medida. Perfeito para sala ou escritório.",
    descricao_completa: "<p>Versátil e funcional, este móvel se adapta a diferentes necessidades.</p><p><strong>Características:</strong></p><ul><li>Madeira: Compensado naval com acabamento em Freijó</li><li>3 prateleiras reguláveis</li><li>2 gavetas com corrediças metálicas</li><li>Dimensões: 150cm x 40cm x 80cm</li><li>Pés reguláveis</li></ul>",
    imagens: [
      "assets/images/produtos/movel-1.jpg",
      "assets/images/produtos/movel-2.jpg",
      "assets/images/produtos/movel-3.jpg"
    ],
    tags: ["móvel", "organização", "gavetas", "escritório"],
    preco: 1250.00,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-3344556677-movel-multiuso-prateleiras-gavetas-_JM",
    estoque: 3,
    sku: "MV-008",
    peso: "35kg",
    dimensoes: "150x40x80cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 9,
    nome: "Nicho Decorativo",
    slug: "nicho-decorativo",
    categoria: "organizacao",
    subcategoria: "nichos",
    descricao: "Conjunto de 3 nichos geométricos para parede. Decoração e organização.",
    descricao_completa: "<p>Composição moderna para destacar objetos decorativos.</p><p><strong>Características:</strong></p><ul><li>Madeira: MDF reflorestado</li><li>Acabamento: Laca fosca na cor madeira</li><li>3 peças com formatos geométricos diferentes</li><li>Kit com parafusos e buchas</li><li>Pode ser pintado</li></ul>",
    imagens: [
      "assets/images/produtos/nicho-1.jpg",
      "assets/images/produtos/nicho-2.jpg"
    ],
    tags: ["nicho", "decoração", "geométrico", "parede"],
    preco: 189.00,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-4455667788-nichos-geometricos-decorativos-3pcs-_JM",
    estoque: 20,
    sku: "NC-009",
    peso: "2.8kg",
    dimensoes: "Varia por peça",
    prazo_fabricacao: "12 dias"
  },
  
  // Jardinagem
  {
    id: 10,
    nome: "Suporte para Plantas Triplo",
    slug: "suporte-plantas-triplo",
    categoria: "jardinagem",
    subcategoria: "suportes-plantas",
    descricao: "Estrutura em madeira para 3 vasos. Ideal para varandas e jardins.",
    descricao_completa: "<p>Organize suas plantas com estilo.</p><p><strong>Características:</strong></p><ul><li>Madeira: Eucalipto tratado</li><li>Altura: 120cm</li><li>3 níveis para vasos de até 25cm</li><li>Acabamento com stain incolor</li><li>Desmontável para fácil transporte</li></ul>",
    imagens: [
      "assets/images/produtos/suporte-planta-1.jpg",
      "assets/images/produtos/suporte-planta-2.jpg"
    ],
    tags: ["suporte", "plantas", "jardinagem", "varanda"],
    preco: 159.00,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-5566778899-suporte-plantas-madeira-3-vasos-_JM",
    estoque: 7,
    sku: "SP-010",
    peso: "4.2kg",
    dimensoes: "50x50x120cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 11,
    nome: "Casa de Pássaro Decorativa",
    slug: "cada-passaro-decorativa",
    categoria: "jardinagem",
    subcategoria: "casa-passaro",
    descricao: "Casa de pássaro em madeira com telhado ecológico. Peça charmosa para jardim.",
    descricao_completa: "<p>Além de abrigar pássaros, é um lindo objeto decorativo.</p><p><strong>Características:</strong></p><ul><li>Madeira: Pinus</li><li>Telhado: Ecológico (fibra de coco)</li><li>Altura: 25cm</li><li>Diâmetro da entrada: 3.5cm</li><li>Verniz atóxico</li></ul>",
    imagens: [
      "assets/images/produtos/casa-passaro-1.jpg"
    ],
    tags: ["pássaro", "jardim", "decoração", "ecológico"],
    preco: 79.90,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-6677889901-casa-passaro-madeira-telhado-ecologico-_JM",
    estoque: 15,
    sku: "CP-011",
    peso: "0.8kg",
    dimensoes: "25x20x20cm",
    prazo_fabricacao: "12 dias"
  },
  
  // Decoração
  {
    id: 12,
    nome: "Vaso de Gesso Natural",
    slug: "vaso-gesso-natural",
    categoria: "decoracao",
    subcategoria: "vasos-gesso",
    descricao: "Vaso artesanal em gesso com textura orgânica. Peça única feita à mão.",
    descricao_completa: "<p>A textura rústica e o acabamento artesanal dão charme a este vaso.</p><p><strong>Características:</strong></p><ul><li>Material: Gesso de alta densidade</li><li>Acabamento: Textura orgânica com cera</li><li>Altura: 15cm</li><li>Diâmetro: 12cm</li><li>Peça artesanal - pequenas variações fazem parte do charme</li></ul>",
    imagens: [
      "assets/images/produtos/vaso-gesso-1.jpg",
      "assets/images/produtos/vaso-gesso-2.jpg"
    ],
    tags: ["vaso", "gesso", "decoração", "artesanal"],
    preco: 45.00,
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-7788990011-vaso-gesso-artesanal-textura-organica-_JM",
    estoque: 25,
    sku: "VG-012",
    peso: "0.5kg",
    dimensoes: "15x12cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 13,
    nome: "Vaso de Argamassa",
    slug: "vaso-argamassa",
    categoria: "decoracao",
    subcategoria: "vasos-argamassa",
    descricao: "Vaso em argamassa com acabamento cimentício. Estilo industrial e moderno.",
    descricao_completa: "<p>O acabamento cimentício traz um ar contemporâneo e urbano.</p><p><strong>Características:</strong></p><ul><li>Material: Argamassa com pigmento</li><li>Acabamento: Queimado (efeito cimento queimado)</li><li>Altura: 18cm</li><li>Diâmetro: 15cm</li><li>Base com feltro antirrisco</li></ul>",
    imagens: [
      "assets/images/produtos/vaso-argamassa-1.jpg",
      "assets/images/produtos/vaso-argamassa-2.jpg"
    ],
    tags: ["argamassa", "cimento", "moderno", "industrial"],
    preco: 65.00,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-8899001122-vaso-argamassa-cimento-queimado-_JM",
    estoque: 18,
    sku: "VA-013",
    peso: "1.2kg",
    dimensoes: "18x15cm",
    prazo_fabricacao: "12 dias"
  },
  
  // Plantas Vivas (com restrição regional)
  {
    id: 14,
    nome: "Arranjo de Suculentas",
    slug: "arranjo-suculentas",
    categoria: "plantas-vivas",
    subcategoria: "arranjos-vivos",
    descricao: "Arranjo com diversas suculentas em vaso de cerâmica. Plantas vivas e saudáveis.",
    descricao_completa: "<p>Um mini jardim de suculentas para alegrar qualquer ambiente.</p><p><strong>Características:</strong></p><ul><li>Vaso: Cerâmica esmaltada (10cm)</li><li>Composição: 5 a 7 mudas de diferentes espécies</li><li>Camada de drenagem com argila expandida</li><li>Terra adubada</li><li>Pedriscos decorativos</li></ul><p><strong>⚠️ Entrega apenas para Salvador e Região Metropolitana</strong></p>",
    imagens: [
      "assets/images/produtos/arranjo-suculentas.jpg",
      "assets/images/produtos/suculentas-2.jpg",
      "assets/images/produtos/suculentas-3.jpg"
    ],
    tags: ["suculentas", "vivas", "arranjo", "jardim"],
    preco: 120.00,
    regional: true,
    regioes: ["BA", "Salvador", "Região Metropolitana"],
    destaque: true,
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-9900112233-arranjo-suculentas-vaso-ceramica-_JM",
    estoque: 5,
    sku: "AS-014",
    peso: "0.8kg",
    dimensoes: "10x10x15cm",
    prazo_fabricacao: "12 dias"
  },
  {
    id: 15,
    nome: "Mini Jardim Terrário",
    slug: "mini-jardim-terrario",
    categoria: "plantas-vivas",
    subcategoria: "arranjos-vivos",
    descricao: "Mini jardim em terrário de vidro com plantas vivas. Ecossistema fechado.",
    descricao_completa: "<p>Um ecossistema em miniatura para trazer a natureza para dentro de casa.</p><p><strong>Características:</strong></p><ul><li>Recipiente: Vidro soprado (20cm altura)</li><li>Plantas: Mini samambaias, musgos e fitônias</li><li>Camadas: Pedriscos, carvão ativado, terra</li><li>Manutenção mínima</li><li>Vedação com rolha de cortiça</li></ul><p><strong>⚠️ Entrega apenas para Salvador e Região Metropolitana</strong></p>",
    imagens: [
      "assets/images/produtos/terrario.jpg",
      "assets/images/produtos/terrario-2.jpg"
    ],
    tags: ["terrário", "jardim", "mini", "vidro"],
    preco: 150.00,
    regional: true,
    regioes: ["BA", "Salvador", "Região Metropolitana"],
    mercado_livre_url: "https://produto.mercadolivre.com.br/MLB-0011223344-mini-jardim-terrario-vidro-_JM",
    estoque: 3,
    sku: "TJ-015",
    peso: "1.5kg",
    dimensoes: "20x15cm",
    prazo_fabricacao: "12 dias"
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
  
  // ========================================
// FILTROS CORRIGIDOS
// ========================================

// Carrega produtos baseado nos filtros (versão corrigida)
function loadProducts() {
  const grid = document.getElementById('products-grid');
  const countElement = document.getElementById('products-total');
  
  if (!grid) {
    console.error('Grid de produtos não encontrado');
    return;
  }
  
  // Mostra loading
  grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Carregando produtos...</div>';
  
  // Pega parâmetros da URL (para filtro por categoria)
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategoria = urlParams.get('categoria');
  
  // Se veio da home com categoria, aplica o filtro
  if (urlCategoria && !currentState.categoria) {
    currentState.categoria = urlCategoria;
    
    // Atualiza o select de categoria
    const categoriaSelect = document.getElementById('categoria-filter');
    if (categoriaSelect) {
      categoriaSelect.value = urlCategoria;
    }
  }
  
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
    
    // Carrega subcategorias baseado na categoria atual
    loadSubcategorias();
  }, 300);
}

// Filtra produtos (versão corrigida)
function filterProducts() {
  return productsDB.filter(product => {
    // Filtro de busca
    if (currentState.searchTerm) {
      const term = currentState.searchTerm.toLowerCase().trim();
      if (term === '') return true;
      
      const match = product.nome.toLowerCase().includes(term) ||
                   product.descricao.toLowerCase().includes(term) ||
                   (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)));
      if (!match) return false;
    }
    
    // Filtro de categoria
    if (currentState.categoria && currentState.categoria !== '') {
      if (product.categoria !== currentState.categoria) {
        return false;
      }
    }
    
    // Filtro de subcategoria
    if (currentState.subcategoria && currentState.subcategoria !== '') {
      if (product.subcategoria !== currentState.subcategoria) {
        return false;
      }
    }
    
    return true;
  });
}

// Event Listeners corrigidos
function setupEventListeners() {
  // Busca - submit do formulário
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
  
  // Categoria - ao mudar
  const categoriaFilter = document.getElementById('categoria-filter');
  if (categoriaFilter) {
    categoriaFilter.addEventListener('change', (e) => {
      const newCategoria = e.target.value;
      currentState.categoria = newCategoria;
      currentState.subcategoria = ''; // Reseta subcategoria
      currentState.page = 1;
      
      // Atualiza URL sem recarregar a página
      const url = new URL(window.location);
      if (newCategoria) {
        url.searchParams.set('categoria', newCategoria);
      } else {
        url.searchParams.delete('categoria');
      }
      window.history.pushState({}, '', url);
      
      loadSubcategorias(); // Recarrega subcategorias
      loadProducts();
      updateActiveFilters();
    });
  }
  
  // Subcategoria - ao mudar
  const subcategoriaFilter = document.getElementById('subcategoria-filter');
  if (subcategoriaFilter) {
    subcategoriaFilter.addEventListener('change', (e) => {
      currentState.subcategoria = e.target.value;
      currentState.page = 1;
      loadProducts();
      updateActiveFilters();
    });
  }
  
  // Ordenação - ao mudar
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

// Carrega subcategorias baseado na categoria selecionada (corrigido)
function loadSubcategorias() {
  const categoria = currentState.categoria;
  const subGroup = document.getElementById('subcategoria-group');
  const subSelect = document.getElementById('subcategoria-filter');
  
  if (!subGroup || !subSelect) return;
  
  // Se não tem categoria selecionada, esconde o grupo de subcategoria
  if (!categoria || categoria === '') {
    subGroup.style.display = 'none';
    return;
  }
  
  // Filtra produtos da categoria selecionada
  const produtosDaCategoria = productsDB.filter(p => p.categoria === categoria);
  
  // Pega subcategorias únicas
  const subcategorias = [...new Set(
    produtosDaCategoria
      .map(p => p.subcategoria)
      .filter(Boolean) // Remove null/undefined
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

// Atualiza tags de filtros ativos (corrigido)
function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  if (!container) return;
  
  const filters = [];
  
  if (currentState.searchTerm && currentState.searchTerm.trim() !== '') {
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
  
  if (currentState.categoria && currentState.categoria !== '') {
    filters.push({
      type: 'Categoria',
      value: getCategoriaNome(currentState.categoria),
      remove: () => {
        currentState.categoria = '';
        currentState.subcategoria = '';
        const select = document.getElementById('categoria-filter');
        if (select) select.value = '';
        
        // Remove da URL
        const url = new URL(window.location);
        url.searchParams.delete('categoria');
        window.history.pushState({}, '', url);
        
        loadSubcategorias();
        loadProducts();
        updateActiveFilters();
      }
    });
  }
  
  if (currentState.subcategoria && currentState.subcategoria !== '') {
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
// Renderiza produtos com <img src>
function renderProducts(grid, products) {
  grid.innerHTML = products.map(product => {
    const regionalWarning = product.regional ? 
      `<div class="regional-warning">
        <i class="fas fa-map-marker-alt"></i>
        <span>Produto disponível apenas para Salvador e Região Metropolitana</span>
       </div>` : '';
    
    // Gera placeholder SVG para fallback
    const placeholderSVG = generatePlaceholderSVG(product);
    const placeholderDataURL = `data:image/svg+xml,${encodeURIComponent(placeholderSVG)}`;
    
    return `
      <article class="product-card" data-id="${product.id}" onclick="window.location.href='produto.html?id=${product.id}'" style="cursor: pointer;">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        ${product.regional ? '<span class="product-badge region">📍 Regional</span>' : ''}
        
        <div class="product-image-container">
          <!-- Imagem principal com fallback em camadas -->
          <img 
            class="product-img" 
            src="${product.imagens && product.imagens.length > 0 ? product.imagens[0] : product.imagem || ''}" 
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
          <p class="product-description">${escapeHTML(product.descricao.substring(0, 100))}...</p>
          
          <div class="product-tags">
            ${product.tags.slice(0, 3).map(tag => `<span class="product-tag">${escapeHTML(tag)}</span>`).join('')}
          </div>
          
          ${regionalWarning}
          
          <div class="product-footer">
            <div class="product-price">
              R$ ${product.preco.toFixed(2)} 
              <small>à vista</small>
            </div>
            <div class="product-buttons">
              <button class="btn-product" onclick="event.stopPropagation(); solicitarOrcamento(${product.id})">
                <i class="fab fa-whatsapp"></i>
              </button>
              ${product.mercado_livre_url ? `
                <a href="${product.mercado_livre_url}" target="_blank" rel="noopener noreferrer" class="btn-product btn-mercado-livre" onclick="event.stopPropagation();">
                  <i class="fas fa-store"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Slider automático para cards de produtos
function initProductSliders() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const imagesContainer = card.querySelector('.product-images-slider');
    if (!imagesContainer) return;
    
    const images = imagesContainer.querySelectorAll('img');
    if (images.length <= 1) return;
    
    let currentIndex = 0;
    let interval;
    
    // Função para mostrar imagem específica
    function showImage(index) {
      images.forEach((img, i) => {
        img.style.opacity = i === index ? '1' : '0';
      });
      
      // Atualiza indicadores
      const indicators = card.querySelector('.slider-indicators');
      if (indicators) {
        const dots = indicators.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    }
    
    // Avança para próxima imagem
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
    
    // Inicia slider automático
    function startSlider() {
      if (interval) clearInterval(interval);
      interval = setInterval(nextImage, 3000); // Muda a cada 3 segundos
    }
    
    // Para slider
    function stopSlider() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
    
    // Eventos de hover
    card.addEventListener('mouseenter', stopSlider);
    card.addEventListener('mouseleave', startSlider);
    
    // Cria indicadores se não existirem
    if (!card.querySelector('.slider-indicators')) {
      const indicators = document.createElement('div');
      indicators.className = 'slider-indicators';
      
      for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('span');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          currentIndex = i;
          showImage(i);
        });
        indicators.appendChild(dot);
      }
      
      card.querySelector('.product-image-container').appendChild(indicators);
    }
    
    // Inicia slider
    showImage(0);
    startSlider();
  });
}

// Modificar a função renderProducts para incluir o slider
function renderProducts(grid, products) {
  grid.innerHTML = products.map(product => {
    const regionalWarning = product.regional ? 
      `<div class="regional-warning">
        <i class="fas fa-map-marker-alt"></i>
        <span>Produto disponível apenas para Salvador e Região Metropolitana</span>
       </div>` : '';
    
    // Pega todas as imagens do produto
    const productImages = product.imagens || [product.imagem].filter(Boolean);
    
    // Gera placeholder SVG para fallback
    const placeholderSVG = generatePlaceholderSVG(product);
    const placeholderDataURL = `data:image/svg+xml,${encodeURIComponent(placeholderSVG)}`;
    
    return `
      <article class="product-card" data-id="${product.id}" onclick="window.location.href='produto.html?id=${product.id}'" style="cursor: pointer;">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        ${product.regional ? '<span class="product-badge region">📍 Regional</span>' : ''}
        
        <div class="product-image-container">
          <!-- Slider de imagens -->
          <div class="product-images-slider">
            ${productImages.map((img, index) => `
              <img 
                class="product-slider-img" 
                src="${img}" 
                alt="${product.nome} - Imagem ${index + 1}"
                style="opacity: ${index === 0 ? '1' : '0'}; position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease;"
                loading="lazy"
                onerror="this.onerror=null; this.src='${placeholderDataURL}';"
              >
            `).join('')}
          </div>
          
          <!-- Fallback para quando não há imagens -->
          ${productImages.length === 0 ? `
            <img class="product-img" src="${placeholderDataURL}" alt="${product.nome} - placeholder">
          ` : ''}
        </div>
        
        <div class="product-info">
          <div class="product-category">${getCategoriaNome(product.categoria)}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${escapeHTML(product.descricao.substring(0, 100))}...</p>
          
          <div class="product-tags">
            ${product.tags.slice(0, 3).map(tag => `<span class="product-tag">${escapeHTML(tag)}</span>`).join('')}
          </div>
          
          ${regionalWarning}
          
          <div class="product-footer">
            <div class="product-price">
              R$ ${product.preco.toFixed(2)} 
              <small>à vista</small>
            </div>
            <div class="product-buttons">
              <button class="btn-product" onclick="event.stopPropagation(); solicitarOrcamento(${product.id})">
                <i class="fab fa-whatsapp"></i>
              </button>
              ${product.mercado_livre_url ? `
                <a href="${product.mercado_livre_url}" target="_blank" rel="noopener noreferrer" class="btn-product btn-mercado-livre" onclick="event.stopPropagation();">
                  <i class="fas fa-store"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
  
  // Inicializa lazy loading e sliders
  initLazyLoading();
  initProductSliders();
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
          text-anchor="middle" fill="#634832">Clique para ver detalhes</text>
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
  
  window.open(`https://wa.me/557181804578?text=${mensagem}`, '_blank');
  
  // Impedir propagação se vier de evento de clique
  if (event) event.stopPropagation();
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
    product.imagens.forEach((img, index) => {
      const imgElement = new Image();
      imgElement.onload = () => console.log(`✅ ${product.nome} [${index+1}]: OK`);
      imgElement.onerror = () => console.warn(`❌ ${product.nome} [${index+1}]: NÃO encontrada em ${img}`);
      imgElement.src = img;
    });
  });
  console.groupEnd();
};
