bbdev.addIFrame = function(el, url, styles = {}) {
  let iframe = document.createElement('iframe');
  iframe.type = 'text/html';
  iframe.src = url;
  iframe.frameBorder = 0;
  el.append(iframe);
  iframe.className = 'object';
  iframe.style = bbdev.stylesString(styles);
  return iframe;
};

bbdev.extractPattern = function(url, regexps) {
  for (let i = regexps.length; i > 0; i--) {
    const matches = url.match(regexps[i - 1]);
    if (matches) {
      return matches[1];
    }
  }
};

bbdev.stylesString = function(stylesObj) {
  let stylesStr = '';
  for (let key in stylesObj) {
    stylesStr += key + ':' + stylesObj[key] + ';';
  }
  return stylesStr;
};

bbdev.hideElement = function(el) {
  el.style.position = 'absolute';
  el.style.width = 0;
  el.style.height = 0;
  el.style.opacity = 0;
};

bbdev.replaceVideoElement = function(
  url,
  el,
  styles = {},
  parentElement = null
) {
  if (!parentElement) {
    parentElement = el.parentElement;
  }

  var videoId = bbdev.extractPattern(url, [
    /youtube[^\.\?\/]*\.com\/watch\?v=([^&]+)/,
    /youtube[^\.\?\/]*\.com\/embed\/([^\/\?]+)[\/]?$/
  ]);
  if (videoId) {
    let embedUrl = `https://www.youtube.com/embed/${videoId}?playlist=${videoId}&autoplay=1&showinfo=0&controls=0&loop=1&mute=1`;
    return bbdev.addIFrame(parentElement, embedUrl);
  }

  videoId = bbdev.extractPattern(url, [/vimeo\.com\/([^&\?]+)/]);
  if (videoId) {
    let embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=true&byline=false&controls=false&loop=true&muted=true`;
    return bbdev.addIFrame(parentElement, embedUrl);
  }

  if (url.match(/^https?:\/\//i)) {
    var videoElement = document.createElement('video');
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.loop = true;
    videoElement.className = 'object';
    videoElement.style = bbdev.stylesString(styles);
    var sourceElement = document.createElement('source');
    sourceElement.src = url;
    videoElement.append(sourceElement);
    parentElement.append(videoElement);
    return videoElement;
  }
};

bbdev.initHomepageVideos = function() {
  var videoElements = document.querySelectorAll(
    '.home-page-video[data-video-url]'
  );
  videoElements.forEach(el => {
    var $el = $(el);

    var videoEl = bbdev.replaceVideoElement(
      $el.data('video-url'),
      el,
      {
        width: '100%',
        height: '100%'
      },
      el
    );
    if (videoEl && videoEl.tagName === 'VIDEO') {
      videoEl.style.objectFit = $el.data('video-fit');
      videoEl.style.backgroundColor = $el.data('video-background');
    }
  });
};

bbdev.initProductPageVideos = function() {
  var isMobile = $('.product__mobile').css('display') === 'block';
  var velements;

  if (isMobile) {
    $('.product__gallery .product__image.object').each(
      function() {
        var url = $(this).parent().data('alt-tag');
        var el = this;
    
        bbdev.replaceVideoElement(url, el, {
          width: '100%',
          height: '100%'
        });
      }
    );
  } else {
    velements = document.querySelectorAll(
      '.product-gallery__assets-container .product__card--image img'
    );
    velements.forEach(el => {
      const height = bbdev.extractPattern(el.alt, [/[\&\?]?h=([0-9]+)/]);
      if (height) {
        hideElement(el);
      }
  
      const videoEl = bbdev.replaceVideoElement(el.alt, el, {
        width: 'calc(100% - 12px)',
        left: '6px',
        height: height ? +height + 12 + 'px' : 'calc(100% - 12px)'
      });
  
      if (height) {
        videoEl.parentElement.style.height = +height + 12 + 'px';
      }
    });
  }
};
