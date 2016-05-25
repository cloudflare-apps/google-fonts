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
  var googleFontLoader = document.createElement("script");
  var stylesheet = document.createElement("style");

  var options = INSTALL_OPTIONS;

  function updateElement() {
    var _options = options;
    var headers = _options.headers;
    var body = _options.body;
    var custom = _options.custom;

    var HEADER_FONT_FAMILY = {
      serif: headers.serif,
      sansSerif: headers.sansSerif,
      fancy: headers.fancy,
      handwriting: headers.handwriting,
      monospace: headers.monospace
    };
    var BODY_FONT_FAMILY = {
      serif: body.serif,
      sansSerif: body.sansSerif,
      fancy: body.fancy,
      handwriting: body.handwriting,
      monospace: body.monospace
    };

    var _HEADER_FONT_FAMILY$h = HEADER_FONT_FAMILY[headers.style].split(":");

    var _HEADER_FONT_FAMILY$h2 = _slicedToArray(_HEADER_FONT_FAMILY$h, 1);

    var headerFontFamily = _HEADER_FONT_FAMILY$h2[0];

    var _BODY_FONT_FAMILY$bod = BODY_FONT_FAMILY[body.style].split(":");

    var _BODY_FONT_FAMILY$bod2 = _slicedToArray(_BODY_FONT_FAMILY$bod, 1);

    var bodyFontFamily = _BODY_FONT_FAMILY$bod2[0];


    stylesheet.innerHTML = "\n    h1, h2, h3, h4, h5, h6, headers {\n      font-family: '" + headerFontFamily.split("+").join(" ") + "', " + FONT_TYPE[headers.style] + ";\n    }\n\n    body {\n      font-family: '" + bodyFontFamily.split("+").join(" ") + "', " + FONT_TYPE[body.style] + ";\n    }";

    var fontArray = custom.map(function (_ref) {
      var style = _ref.style;

      var attrs = _objectWithoutProperties(_ref, ["style"]);

      return attrs[style];
    });

    fontArray.push(HEADER_FONT_FAMILY[headers.style], BODY_FONT_FAMILY[body.style]);

    window.WebFont.load({
      active: function active() {
        stylesheet.innerHTML += custom.reduce(function (rules, _ref2) {
          var style = _ref2.style;

          var attrs = _objectWithoutProperties(_ref2, ["style"]);

          var _attrs$style$split = attrs[style].split(":");

          var _attrs$style$split2 = _slicedToArray(_attrs$style$split, 1);

          var fontFamily = _attrs$style$split2[0];


          return rules + ("\n            " + attrs.selector + " {\n              font-family: '" + fontFamily.split("+").join(" ") + "', " + FONT_TYPE[style] + ";\n            }\n          ");
        }, "");

        document.head.appendChild(stylesheet);
      },

      google: {
        families: fontArray
      }
    });
    document.body.setAttribute("data-eager-google-fonts-state", "loaded");
  }

  function bootstrap() {
    document.body.setAttribute("data-eager-google-fonts-state", "loading");
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.async = true;

    googleFontLoader.addEventListener("load", updateElement);

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
      document.body.setAttribute("data-eager-google-fonts-state", "loading");

      stylesheet.innerHTML = "";
      stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);

      updateElement();
    }
  };
})();