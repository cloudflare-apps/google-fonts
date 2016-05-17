"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    fancy: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  };
  var SELECTORS = {
    headers: "h1, h2, h3, h4, h5, h6, header",
    body: "body"
  };
  var googleFontLoader = document.createElement("script");
  var stylesheet = document.createElement("style");

  var options = INSTALL_OPTIONS;

  function updateElements() {
    stylesheet.innerHTML = "";
    stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);

    var _options = options;
    var fonts = _options.fonts;


    window.WebFont.load({
      active: function active() {
        stylesheet.innerHTML = fonts.reduce(function (rules, _ref) {
          var style = _ref.style;
          var location = _ref.location;

          var attrs = _objectWithoutProperties(_ref, ["style", "location"]);

          var _attrs$style$split = attrs[style].split(":");

          var _attrs$style$split2 = _slicedToArray(_attrs$style$split, 1);

          var fontFamily = _attrs$style$split2[0];


          var selector = location === "custom" ? attrs.selector : SELECTORS[location];

          return rules + ("\n            " + selector + " {\n              font-family: '" + fontFamily.replace("+", " ") + "', " + FONT_TYPE[style] + ";\n            }\n          ");
        }, "");

        document.head.appendChild(stylesheet);
      },

      google: {
        families: fonts.map(function (_ref2) {
          var style = _ref2.style;

          var attrs = _objectWithoutProperties(_ref2, ["style"]);

          return attrs[style];
        })
      }
    });
  }

  function bootstrap() {
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.async = true;

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