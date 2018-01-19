var triggerWhenAllLoaded = function (selector, callback) {
  var nodes = document.querySelectorAll(selector)
  var nodeCount = nodes.length
  var loadedCount = 0

  var onload = function () {
    loadedCount += 1
    if (nodeCount === loadedCount) {
      callback(nodes)
    }
  }

  for (var i = 0; i < nodes.length; i += 1 ) {
    if (nodes[i].complete) {
      onload()
    } else {
      nodes[i].onload =  onload
    }
  }
}

var wrapImageWithLink = function (imageNode) {
  if (imageNode.parentNode.tagName !== 'A') {
    var newHTML = '<a href="' + imageNode.getAttribute('src') + '">' + imageNode.outerHTML + '</a>'
    imageNode.outerHTML = newHTML
  }
}

var parseThumbnailElements = function (elements) {
  var thumbElements = elements,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

  for(var i = 0; i < numNodes; i++) {
    figureEl = thumbElements[i];
    // include only element nodes
    if(figureEl.nodeType !== 1) {
      continue;
    }

    linkEl = figureEl.parentNode

    // create slide object
    item = {
      src: linkEl.getAttribute('href'),
      msrc: linkEl.getAttribute('href'),
      w: figureEl.width,
      h: figureEl.height
    };

    if(figureEl.getAttribute('alt')) {
      item.title = figureEl.getAttribute('alt')
    }

    item.el = figureEl; // save link to element for getThumbBoundsFn
    items.push(item);
  }

  return items;
}

var initPhotoSwipeFromDOM = function(gallerySelector) {
  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll( gallerySelector );
  var items = parseThumbnailElements(galleryElements)

  var pswpElement = document.querySelectorAll('.pswp')[0];

  for (var i = 0; i < items.length; i++) {
    items[i].el.parentNode.onclick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var index = items.findIndex(function(item) {
        return e.target.getAttribute('src') === item.src
      })

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, {
        index: index
      });
      gallery.init();
    }
  }

};

var init = function () {
  triggerWhenAllLoaded('.post.markdown-body .post-content img', function(imageNodes) {
    for (var i = 0; i < imageNodes.length; i += 1) {
      wrapImageWithLink(imageNodes[i])
    }
    // execute above function
    initPhotoSwipeFromDOM('.post.markdown-body .post-content img');
  })
}

document.addEventListener("turbolinks:load", function () {
  init()
})