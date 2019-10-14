
function addIFrame(el, url, styles = {}) {
    let iframe = document.createElement("iframe");
    iframe.type = "text/html";
    iframe.src = url;
    iframe.frameBorder = 0;
    el.append(iframe);
    iframe.className = "object";
    iframe.style = stylesString(styles);
    return iframe;
}

function extractPattern(url, regexps) {
    for (let i = regexps.length; i > 0; i--) {
        const matches = url.match(regexps[i - 1]);
        if (matches) {
            return matches[1];
        }
    }
}

function stylesString(stylesObj) {
    let stylesStr = '';
    for (let key in stylesObj) {
        stylesStr += key + ':' + stylesObj[key] + ';';
    }
    return stylesStr;
}

function hideElement(el) {
    el.style.position = "absolute";
    el.style.width = 0;
    el.style.height = 0;
    el.style.opacity = 0;
}

function replaceVideoElement(url, el, styles = {}, parentElement = null) {
    var videoId = extractPattern(url, [
        /youtube[^\.\?\/]*\.com\/watch\?v=([^&]+)/,
        /youtube[^\.\?\/]*\.com\/embed\/([^\/\?]+)[\/]?$/
    ]);

    if (!parentElement) {
        parentElement = el.parentElement;
    }

    if (videoId) {
        let embedUrl = `https://www.youtube.com/embed/${videoId}?playlist=${videoId}&autoplay=1&showinfo=0&controls=0&loop=1&mute=1`;
        return addIFrame(parentElement, embedUrl);
    }

    videoId = extractPattern(url, [/vimeo\.com\/([^&\?]+)/]);
    if (videoId) {
        let embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=true&byline=false&controls=false&loop=true&muted=true`;
        return addIFrame(parentElement, embedUrl);
    }

    if (url.match(/^https?:\/\//i)) {
        var videoElement = document.createElement("video");
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.loop = true;
        videoElement.className = "object";
        videoElement.style = stylesString(styles);
        var sourceElement = document.createElement("source");
        sourceElement.src = url;
        videoElement.append(sourceElement);
        parentElement.append(videoElement);
        return videoElement;
    }
}