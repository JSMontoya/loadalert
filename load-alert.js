/**
  * load-alert v1.1.0
  * (c) 2017 Juan Sebastián Montoya
  * @license MIT
  */
var loadalert = {
    show: function (arreglo, funcion) {
        var contenido = "<div class='cssload-container'><div class='cssload-whirlpool'></div></div>";
        if (arreglo)
            if (arreglo.content)
                contenido = arreglo.content;
        if (document.getElementsByClassName('loadalert').length === 0) {
            $div = document.createElement("div");
            $div.innerHTML = contenido;
            $div.className = 'loadalert';
            document.body.appendChild($div);
            loadalert.overflow = getStyle(document.body, 'overflow');
            document.body.style.overflow = 'hidden';
            loadalert.change_size();
            if (loadalert.config.verbose)
                console.log("adding resize listener");
            window.addEventListener("resize", loadalert.change_size);
            if (loadalert.config.verbose) 
                console.log("showing");
        } else {
            loadalert.hide();
            loadalert.show(arreglo, funcion);
        }
    },
    hide: function () {
        if (loadalert.config.verbose)
            console.log("hiding");
        var element = document.getElementsByClassName('loadalert')[0]
        document.body.removeChild(element);
        document.body.style.overflow = loadalert.overflow;
        if (loadalert.config.verbose)
            console.log("removing resize listener");
        window.removeEventListener("resize", loadalert.change_size);
    },
    change_size: function () {
        var height = window.innerHeight;
        height = height / 2;
        var element = document.getElementsByClassName('loadalert')[0].firstChild;
        h = getStyle(element, 'height');
        h = parseInt(h.substring(0, h.length - 2))
        if (h > 0) {
            height -= h / 2;
        }
        else {
            element = element.firstChild;
            h2 = getStyle(element, 'height');
            h2 = parseInt(h2.substring(0, h2.length - 2))
            if (h2 > 0) {
                height -= element.firstChild.innerHeight / 2;
                height -= 15;
            }
        }
        document.getElementsByClassName('loadalert')[0].style['padding-top'] = height + 'px';
        document.getElementsByClassName('loadalert')[0].style['padding-bottom'] = height + 'px';
        if (loadalert.config.verbose)
            console.log("resizing ", height);
    },
    overflow: document.body.style.overflow,
    config: {
        verbose: false,
    }
}

function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  if (defaultView && defaultView.getComputedStyle) {
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}

