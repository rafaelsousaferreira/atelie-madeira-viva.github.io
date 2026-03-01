// Inicialização global do Komentas
(function() {
  // Configurações
  window.komentasSettings = {
    siteId: 'SEU_SITE_ID_AQUI', // ← SUBSTITUA AQUI
    theme: 'wood',
    language: 'pt-BR',
    moderation: 'auto',
    allowGuests: true,
    enableRatings: true
  };
  
  // Função para carregar o widget quando necessário
  window.loadKomentas = function(containerId) {
    const container = document.getElementById(containerId || 'komentas-container');
    if (!container) return;
    
    // Mostrar loading
    const loading = document.getElementById('komentas-loading');
    if (loading) loading.style.display = 'flex';
    
    // Carregar script se ainda não carregou
    if (!window.Komentas) {
      const script = document.createElement('script');
      script.src = 'https://cdn.komentas.com/widget.js';
      script.async = true;
      script.onload = function() {
        if (loading) loading.style.display = 'none';
      };
      document.head.appendChild(script);
    } else {
      if (loading) loading.style.display = 'none';
      if (window.Komentas.reload) {
        window.Komentas.reload(container);
      }
    }
  };
  
  // Auto-inicializar se houver container na página
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('komentas-container')) {
      setTimeout(() => window.loadKomentas(), 500);
    }
  });
})();