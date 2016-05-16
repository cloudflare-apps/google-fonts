"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    display: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  };
  var SELECTORS = {
    headers: "h1, h2, h3, h4, h5, h6, header",
    body: "p, div"
  };
  var style = document.createElement("style");
  var WebFontConfig = {
    google: {
      families: []
    }
  };

  var options = INSTALL_OPTIONS;

  function updateElements() {
    style.innerHTML = "";
    WebFontConfig.google.families = [];
    var _options = options;
    var fonts = _options.fonts;


    fonts.forEach(function (_ref) {
      var fontType = _ref.fontType;
      var location = _ref.location;

      var attrs = _objectWithoutProperties(_ref, ["fontType", "location"]);

      var fontFamily = attrs[fontType];
      var selector = location === "custom" ? attrs.selector : SELECTORS[location];

      WebFontConfig.google.families.push(fontFamily);

      style.innerHTML += "\n        " + selector + " {\n          font-family: '" + fontFamily + "', " + FONT_TYPE[fontType] + ";\n        }\n      ";
    });

    window.WebFont.load(WebFontConfig);
  }

  function bootstrap() {
    var googleFontLoader = document.createElement("script");

    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.type = "text/javascript";
    googleFontLoader.async = "true";

    googleFontLoader.addEventListener("load", updateElements);

    document.head.appendChild(googleFontLoader);
    document.head.appendChild(style);
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