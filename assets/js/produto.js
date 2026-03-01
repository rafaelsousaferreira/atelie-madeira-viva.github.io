// Estado do produto atual
let currentProduct = null;
let currentImageIndex = 0;
let productImages = [];

// Configurar Komentas com os dados do produto atual
function setupKomentas() {
  if (!currentProduct) return;
  
  const komentasContainer = document.getElementById('komentas-container');
  if (!komentasContainer) return;
  
  // Atualizar atributos com dados do produto
  komentasContainer.dataset.pageId = `produto-${currentProduct.id}`;
  komentasContainer.dataset.pageTitle = currentProduct.nome;
  komentasContainer.dataset.pageUrl = window.location.href;
  komentasContainer.dataset.pageImage = currentProduct.imagens && currentProduct.imagens.length > 0 
    ? currentProduct.imagens[0] 
    : currentProduct.imagem || '';
  
  // Se o widget já foi carregado, recarregar
  if (window.Komentas && window.Komentas.reload) {
    window.Komentas.reload(komentasContainer);
  }
}
// Inicialização
// Chamar no carregamento do produto
document.addEventListener('DOMContentLoaded', function() {
  // ... seu código existente ...
  loadProduct();
  // Aguardar produto carregar
  setTimeout(() => {
    if (currentProduct) {
      setupKomentas();
    }
  }, 500);
});

// Carrega produto baseado no ID da URL
function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (!productId) {
    window.location.href = 'produtos.html';
    return;
  }
  
  // Busca produto no banco de dados (global productsDB)
  if (typeof productsDB === 'undefined') {
    console.error('Banco de dados não encontrado');
    return;
  }
  
  currentProduct = productsDB.find(p => p.id === productId);
  
  if (!currentProduct) {
    window.location.href = 'produtos.html';
    return;
  }
  
  // Prepara array de imagens
  productImages = currentProduct.imagens || [currentProduct.imagem].filter(Boolean);
  
  // Esconde loading e mostra conteúdo
  document.getElementById('loading').style.display = 'none';
  document.getElementById('product-content').style.display = 'block';
  
  // Renderiza todas as seções
  renderProduct();
  renderThumbnails();
  renderRelatedProducts();
  
  // Atualiza breadcrumb
  document.getElementById('product-name-breadcrumb').textContent = currentProduct.nome;
  
  // Configura eventos
  setupGalleryEvents();
}

// Renderiza informações do produto
function renderProduct() {
  // Informações básicas
  document.getElementById('product-category').textContent = getCategoriaNome(currentProduct.categoria);
  document.getElementById('product-title').textContent = currentProduct.nome;
  
  // Tags
  const tagsContainer = document.getElementById('product-tags');
  tagsContainer.innerHTML = currentProduct.tags.map(tag => 
    `<span>${escapeHTML(tag)}</span>`
  ).join('');
  
  // Preço
  const priceElement = document.getElementById('product-price');
  priceElement.innerHTML = `R$ ${currentProduct.preco.toFixed(2)} <small>à vista</small>`;
  
  // Parcelamento
  const installmentElement = document.getElementById('product-installments');
  const parcelas = Math.min(12, Math.floor(currentProduct.preco / 20));
  const valorParcela = (currentProduct.preco / parcelas).toFixed(2);
  installmentElement.innerHTML = `ou <strong>${parcelas}x de R$ ${valorParcela}</strong> sem juros`;
  
  // Estoque
  const stockElement = document.getElementById('product-stock');
  if (currentProduct.estoque > 5) {
    stockElement.innerHTML = '<i class="fas fa-check-circle"></i> Em estoque';
    stockElement.className = 'product-stock';
  } else if (currentProduct.estoque > 0) {
    stockElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Apenas ${currentProduct.estoque} em estoque`;
    stockElement.className = 'product-stock low-stock';
  } else {
    stockElement.innerHTML = '<i class="fas fa-times-circle"></i> Fora de estoque';
    stockElement.className = 'product-stock out-of-stock';
  }

  // Prazo de fabricação
const prazoElement = document.createElement('div');
prazoElement.className = 'product-delivery';

let prazoHTML = '';
if (currentProduct.prazo_fabricacao) {
  if (currentProduct.prazo_fabricacao.includes('Pronta')) {
    prazoHTML = `
      <div class="delivery-info ready">
        <i class="fas fa-check-circle"></i>
        <div>
          <strong>Pronta entrega</strong>
          <span>Produto disponível para envio imediato</span>
        </div>
      </div>
    `;
  } else {
    prazoHTML = `
      <div class="delivery-info custom">
        <i class="fas fa-clock"></i>
        <div>
          <strong>Prazo de fabricação</strong>
          <span>${currentProduct.prazo_fabricacao}</span>
          <small>Produzido artesanalmente sob encomenda</small>
        </div>
      </div>
    `;
  }
} else {
  prazoHTML = `
    <div class="delivery-info custom">
      <i class="fas fa-clock"></i>
      <div>
        <strong>Prazo de fabricação</strong>
        <span>Consulte-nos</span>
        <small>Produzido artesanalmente sob encomenda</small>
      </div>
    </div>
  `;
}

prazoElement.innerHTML = prazoHTML;

// Insere após o preço/estoque
const priceBox = document.querySelector('.product-price-box');
if (priceBox) {
  priceBox.appendChild(prazoElement);
}
  
  // Descrição
  document.getElementById('product-description').innerHTML = currentProduct.descricao_completa || 
    `<p>${escapeHTML(currentProduct.descricao)}</p>`;
  
  // Especificações
  renderSpecs();
  
  // Imagem principal
  if (productImages.length > 0) {
    document.getElementById('main-image').src = productImages[0];
  }
  
  // Botões
  document.getElementById('btn-orcamento').onclick = () => solicitarOrcamento(currentProduct.id);
  
  const btnMercadoLivre = document.getElementById('btn-mercado-livre');
  if (currentProduct.mercado_livre_url) {
    btnMercadoLivre.href = currentProduct.mercado_livre_url;
    btnMercadoLivre.style.display = 'flex';
  } else {
    btnMercadoLivre.style.display = 'none';
  }
}

// Renderiza especificações
function renderSpecs() {
  const specs = [
    { label: 'SKU', value: currentProduct.sku },
    { label: 'Peso', value: currentProduct.peso },
    { label: 'Dimensões', value: currentProduct.dimensoes },
    { label: 'Categoria', value: getCategoriaNome(currentProduct.categoria) }
  ];
  
  const specsContainer = document.getElementById('product-specs');
  specsContainer.innerHTML = specs.map(spec => `
    <div class="spec-item">
      <span class="spec-label">${spec.label}</span>
      <span class="spec-value">${spec.value || '-'}</span>
    </div>
  `).join('');
}

// Renderiza thumbnails
function renderThumbnails() {
  const container = document.getElementById('thumbnail-slider');
  
  if (productImages.length <= 1) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'flex';
  container.innerHTML = productImages.map((img, index) => `
    <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
      <img src="${img}" alt="Thumbnail ${index + 1}" loading="lazy"
           onerror="this.src='${generatePlaceholderSVG(currentProduct)}';">
    </div>
  `).join('');
}

// Troca imagem principal
window.changeImage = function(index) {
  if (index >= 0 && index < productImages.length) {
    currentImageIndex = index;
    document.getElementById('main-image').src = productImages[index];
    
    // Atualiza thumbnail ativo
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }
};

// Navegação entre imagens
function nextImage() {
  const next = (currentImageIndex + 1) % productImages.length;
  changeImage(next);
}

function prevImage() {
  const prev = (currentImageIndex - 1 + productImages.length) % productImages.length;
  changeImage(prev);
}

// Configura eventos da galeria
function setupGalleryEvents() {
  const mainImage = document.getElementById('main-image');
  const zoomBtn = document.getElementById('zoom-btn');
  const zoomModal = document.getElementById('zoom-modal');
  const zoomModalImage = document.getElementById('zoom-modal-image');
  const zoomClose = document.querySelector('.zoom-modal-close');
  
  // Zoom ao clicar na imagem
  mainImage.addEventListener('click', openZoom);
  zoomBtn.addEventListener('click', openZoom);
  
  // Fechar zoom
  zoomClose.addEventListener('click', () => {
    zoomModal.classList.remove('active');
  });
  
  // Navegação no zoom
  document.getElementById('zoom-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
    zoomModalImage.src = productImages[currentImageIndex];
  });
  
  document.getElementById('zoom-next').addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
    zoomModalImage.src = productImages[currentImageIndex];
  });
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomModal.classList.contains('active')) {
      zoomModal.classList.remove('active');
    }
    
    // Navegação com setas no zoom
    if (zoomModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        prevImage();
        zoomModalImage.src = productImages[currentImageIndex];
      } else if (e.key === 'ArrowRight') {
        nextImage();
        zoomModalImage.src = productImages[currentImageIndex];
      }
    }
  });
}

// Abre modal de zoom
function openZoom() {
  const zoomModal = document.getElementById('zoom-modal');
  const zoomModalImage = document.getElementById('zoom-modal-image');
  
  zoomModalImage.src = productImages[currentImageIndex];
  zoomModal.classList.add('active');
}

// Renderiza produtos relacionados
function renderRelatedProducts() {
  const container = document.getElementById('related-products');
  
  // Busca produtos da mesma categoria, excluindo o atual
  const related = productsDB
    .filter(p => p.categoria === currentProduct.categoria && p.id !== currentProduct.id)
    .slice(0, 4);
  
  if (related.length === 0) {
    container.parentElement.style.display = 'none';
    return;
  }
  
  container.innerHTML = related.map(product => {
    return `
      <article class="product-card" onclick="window.location.href='produto.html?id=${product.id}'">
        ${product.destaque ? '<span class="product-badge">Destaque</span>' : ''}
        
        <div class="product-image-container">
          <img class="product-img" src="${product.imagens[0] || product.imagem}" 
               alt="${product.nome}" loading="lazy"
               onerror="this.src='${generatePlaceholderSVG(product)}';">
        </div>
        
        <div class="product-info">
          <div class="product-category">${getCategoriaNome(product.categoria)}</div>
          <h3 class="product-title">${product.nome}</h3>
          <p class="product-description">${escapeHTML(product.descricao.substring(0, 60))}...</p>
          
          <div class="product-footer">
            <div class="product-price">
              R$ ${product.preco.toFixed(2)}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Funções de compartilhamento
window.shareProduct = function(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(currentProduct.nome);
  const description = encodeURIComponent(currentProduct.descricao);
  
  let shareUrl = '';
  
  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
      break;
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${description}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${title}%20-%20${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};

window.copyLink = function() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  });
};

// Gera placeholder SVG (mesma função do produtos.js)
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
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${cor}"/>
      <text x="200" y="150" font-family="Arial" font-size="60" text-anchor="middle" fill="#3e2e23" opacity="0.8">${icon}</text>
      <text x="200" y="200" font-family="Arial" font-size="14" text-anchor="middle" fill="#3e2e23">${escapeHTML(product.nome)}</text>
    </svg>
  `)}`;
}

// Helper para ícone
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

// Helper de categoria
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

// Escape HTML
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

// Função de orçamento
window.solicitarOrcamento = function(productId) {
  const product = productsDB.find(p => p.id === productId);
  if (!product) return;
  
  const mensagem = `Olá! Gostaria de solicitar um orçamento para o produto: 
*${product.nome}*
Categoria: ${getCategoriaNome(product.categoria)}
Preço: R$ ${product.preco.toFixed(2)}

Vi no site e me interessei. Poderia me passar mais informações?`.replace(/\n/g, '%0A');
  
  window.open(`https://wa.me/557181804578?text=${mensagem}`, '_blank');
};
