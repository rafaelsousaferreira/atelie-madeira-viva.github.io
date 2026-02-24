// Gerador automático de placeholders
(function() {
  // Só executa se as imagens não carregarem
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-img');
    
    images.forEach(img => {
      img.addEventListener('error', function() {
        // Já tem fallback, não precisa fazer nada
        // O onerror do HTML já cuida disso
      });
    });
  });
  
  // Função para pré-carregar imagens e verificar quais existem
  window.checkImages = function() {
    const produtos = [
      'tabua-corte-1', 'tabua-servir-1', 'poltrona-1', 'banco-1', 'mesa-1',
      'cadeira-1', 'prateleira-1', 'movel-1', 'nicho-1', 'suporte-planta-1',
      'casa-passaro-1', 'vaso-gesso-1', 'vaso-argamassa-1', 'arranjo-suculentas',
      'terrario'
    ];
    
    const resultados = [];
    
    produtos.forEach(produto => {
      const img = new Image();
      img.src = `assets/images/produtos/${produto}.jpg`;
      
      img.onload = () => {
        console.log(`✅ ${produto}.jpg - OK`);
      };
      
      img.onerror = () => {
        console.log(`❌ ${produto}.jpg - FALTANDO`);
        resultados.push(produto);
      };
    });
    
    if (resultados.length > 0) {
      console.log('Imagens faltando:', resultados);
      alert(`Atenção: ${resultados.length} imagens não encontradas. Usando placeholders.`);
    }
  };
})();