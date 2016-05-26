"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var STATE_ATTRIBUTE = "data-eager-google-fonts-state";
  var FONT_PATTERN = /\+/g;
  var FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    fancy: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  };

  var loadingStyle = document.createElement("style");

  loadingStyle.innerHTML = "\n    body, body * {\n      color: transparent !important;\n    }\n  ";
  var googleFontLoader = document.createElement("script");
  var fontStyles = document.createElement("style");

  var options = INSTALL_OPTIONS;

  function onFontLoadFinish() {
    document.body.setAttribute(STATE_ATTRIBUTE, "loaded");
    loadingStyle.parentNode && loadingStyle.parentNode.removeChild(loadingStyle);
  }

  function updateElement() {
    var _options = options;
    var headers = _options.headers;
    var body = _options.body;
    var custom = _options.custom;


    headers.selector = "h1, h2, h3, h4, h5, h6, headers";
    body.selector = "body";

    var fonts = [headers, body].concat(custom);

    var families = fonts.map(function (_ref) {
      var style = _ref.style;

      var attrs = _objectWithoutProperties(_ref, ["style"]);

      return attrs[style];
    });

    window.WebFont.load({
      active: function active() {
        fontStyles.innerHTML = fonts.reduce(function (rules, _ref2) {
          var style = _ref2.style;

          var attrs = _objectWithoutProperties(_ref2, ["style"]);

          var _attrs$style$split = attrs[style].split(":");

          var _attrs$style$split2 = _slicedToArray(_attrs$style$split, 1);

          var fontFamily = _attrs$style$split2[0];


          return rules + ("\n            " + attrs.selector + " {\n              font-family: '" + fontFamily.replace(FONT_PATTERN, " ") + "', " + FONT_TYPE[style] + ";\n            }\n          ");
        }, "");

        document.head.appendChild(fontStyles);
        onFontLoadFinish();
      },
      inactive: function inactive() {
        onFontLoadFinish();
      },

      google: { families: families }
    });
  }

  function bootstrap() {
    if (INSTALL_ID === "preview") {
      var _document$defaultView = document.defaultView.getComputedStyle(document.body);

      var color = _document$defaultView.color;

      var devStylesheet = document.createElement("style");

      devStylesheet.innerHTML = "\n        body[" + STATE_ATTRIBUTE + "] {\n          transition-duration: 150ms;\n          transition-property: color, text-shadow;\n          transition-timing-function: linear;\n        }\n\n        body[" + STATE_ATTRIBUTE + "=\"updating\"],\n        body[" + STATE_ATTRIBUTE + "=\"updating\"] * {\n          color: transparent !important;\n          text-shadow: 0 0 6px " + color + ";\n        }\n      ";
      document.head.appendChild(devStylesheet);
    }

    document.body.setAttribute(STATE_ATTRIBUTE, "boostrapping");
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
    googleFontLoader.async = true;

    googleFontLoader.addEventListener("load", updateElement);

    document.head.appendChild(googleFontLoader);
  }

  document.head.appendChild(loadingStyle);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      document.body.setAttribute(STATE_ATTRIBUTE, "updating");
      options = nextOptions;

      updateElement();
    }
  };
})();