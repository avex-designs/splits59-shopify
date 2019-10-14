bbdev.initSections = function() {
  document.addEventListener('shopify:section:load', function(ev) {
    if ($(ev.target).find('[data-section-type="50-50-cols"]').length) {
      bbdev.initHomepageVideos();
    }
  });
};
