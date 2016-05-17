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
    body: "body"
  };
  var googleFontLoader = document.createElement("script");
  var style = document.createElement("style");

  var options = INSTALL_OPTIONS;

  function updateElements() {
    var _options = options;
    var fonts = _options.fonts;


    window.WebFont.load({
      active: function active() {
        style.innerHTML = fonts.reduce(function (rules, _ref) {
          var fontType = _ref.fontType;
          var location = _ref.location;

          var attrs = _objectWithoutProperties(_ref, ["fontType", "location"]);

          var fontFamily = attrs[fontType];
          var selector = location === "custom" ? attrs.selector : SELECTORS[location];

          return rules + ("\n            " + selector + " {\n              font-family: '" + fontFamily + "', " + FONT_TYPE[fontType] + ";\n            }\n          ");
        }, "");
      },

      google: {
        families: fonts.map(function (_ref2) {
          var fontType = _ref2.fontType;

          var attrs = _objectWithoutProperties(_ref2, ["fontType"]);

          return attrs[fontType];
        })
      }
    });
  }

  function bootstrap() {
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.async = true;

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