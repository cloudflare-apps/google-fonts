"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var style = document.createElement("style");
  var WebFontConfig = {
    google: {
      families: []
    }
  };

  var options = INSTALL_OPTIONS;

  document.head.appendChild(style);

  function updateElements() {
    style.innerHTML = "";
    WebFontConfig.google.families = [];
    var _options = options;
    var fonts = _options.fonts;


    fonts.forEach(function (attrs) {
      var FONT_FAMILY = {
        serif: attrs.fontFamilySerif,
        sansSerif: attrs.fontFamilySansSerif,
        display: attrs.fontFamilyDisplay,
        handwriting: attrs.fontFamilyHandwriting,
        monospace: attrs.fontFamilyMonospace
      };
      var FONT_TYPE = {
        serif: "serif",
        sansSerif: "sans-serif",
        display: "cursive",
        handwriting: "cursive",
        monospace: "monospace"
      };
      var LOCATION = {
        headers: "h1, h2, h3, h4, h5, h6, header",
        body: "p, div",
        custom: attrs.selector
      };

      WebFontConfig.google.families.push(FONT_FAMILY[attrs.fontType]);

      style.innerHTML += "\n        " + LOCATION[attrs.location] + " {\n          font-family: '" + FONT_FAMILY[attrs.fontType] + "', " + FONT_TYPE[attrs.fontType] + ";\n        }";
    });
    WebFont.load(WebFontConfig);
  }

  function bootstrap() {
    var googleFontLoader = document.createElement("script");

    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.type = "text/javascript";
    googleFontLoader.async = "true";

    googleFontLoader.addEventListener("load", updateElements);

    document.head.appendChild(googleFontLoader);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
      updateElements();
    }
  };
})();