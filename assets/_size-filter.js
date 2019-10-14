// Smooth scroll to a point on the page.
bbdev.initSizeFilter = function() {
  const matches = window.location.href.match(/[?&]size=([\w,]+)[&#]?/);
  if (matches && matches.length > 1) {
    const sizes = matches[1].split(',');
    $(document.body).removeClass('show-all-sizes');
    $(document.body).addClass(sizes.map(s => `show-size-${s}`).join(' '));
    sizes.forEach(s => {
      $(`.filter__item[data-size="${s}"]`).addClass('filter__item--active');
    });
    $('.filters').addClass('has-filters');
  }

  $('.filters .size-list .filter__item').on('click', function() {
    $(this).toggleClass('filter__item--active');
    $(document.body).toggleClass('show-size-' + $(this).data('size'));

    const sizes = $(this).parents('.filters').find('.size-list .filter__item--active')
      .map(function() {
        return $(this).data('size');
      })
      .get();
    let newUrl = '';
    if (sizes.length > 0) {
      $(document.body).removeClass('show-all-sizes');
      newUrl = window.location.origin + window.location.pathname + '?size=' + sizes.join(',');
    } else {
      $(document.body).addClass('show-all-sizes');
      newUrl = window.location.origin + window.location.pathname;
    }
    if ($('.filter__item--active').length > 0) {
      $('.filters').addClass('has-filters');
    } else {
      $('.filters').removeClass('has-filters');
    }
    window.history.pushState({}, document.title, newUrl);
  });

  $('.filters .colors-list a').on('click', function(ev) {
    ev.preventDefault();
    const url = $(this).attr('href');
    const sizes = $(this).parents('.filters').find('.size-list .filter__item--active')
      .map(function() {
        return $(this).data('size');
      })
      .get();
    if (sizes.length > 0) {
      window.location.href = url + '?size=' + sizes.join(',');
    } else {
      window.location.href = url;
    }
  });
};
