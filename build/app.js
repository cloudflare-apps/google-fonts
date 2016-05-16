"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var options = INSTALL_OPTIONS;

  var googleFonts = document.createElement("link");
  var style = document.createElement("style");

  document.head.appendChild(googleFonts);
  document.head.appendChild(style);

  function updateElements() {
    style.innerHTML = " ";
    var _options = options;
    var fonts = _options.fonts;


    console.log(fonts);

    var GOOGLE_FONTS_SOURCE = "https://fonts.googleapis.com/css?family=";

    googleFonts.type = "text/javascript";
    googleFonts.className = "hello";
    googleFonts.async = "true";
    googleFonts.rel = "stylesheet";

    fonts.forEach(function (attrs) {
      console.log(attrs);
      var family = void 0;

      if (attrs.fontType === "serif") {
        family = attrs.fontFamilySerif;
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight;
          console.log(GOOGLE_FONTS_SOURCE);
        } else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|";
          console.log(GOOGLE_FONTS_SOURCE);
        }
      } else if (attrs.fontType === "sans-serif") {
        family = attrs.fontFamilySansSerif;
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight;
          console.log(GOOGLE_FONTS_SOURCE);
        } else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|";
          console.log(GOOGLE_FONTS_SOURCE);
        }
      } else if (attrs.fontType === "display") {
        family = attrs.fontFamilyDisplay;
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight;
          console.log(GOOGLE_FONTS_SOURCE);
        } else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|";
          console.log(GOOGLE_FONTS_SOURCE);
        }
      } else if (attrs.fontType === "handwriting") {
        family = attrs.fontFamilyHandwriting;
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight;
          console.log(GOOGLE_FONTS_SOURCE);
        } else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|";
          console.log(GOOGLE_FONTS_SOURCE);
        }
      } else if (attrs.fontType === "monospace") {
        family = attrs.fontFamilyMonospace;
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight;
          console.log(GOOGLE_FONTS_SOURCE);
        } else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|";
          console.log(GOOGLE_FONTS_SOURCE);
        }
      }
      googleFonts.href = GOOGLE_FONTS_SOURCE;

      var splitFamily = family.split("+");
      var newFamily = splitFamily.join(" ");

      var weight = attrs.fontWeight;
      var splitWeight = weight.split(":");
      var newWeight = splitWeight[1];

      if (attrs.location === "headers") {
        style.innerHTML += "\n          h1, h2, h3, h4, h5, h6, header {\n            font-family: '" + newFamily + "', " + attrs.fontType + ";\n            font-weight: " + newWeight + ";\n          }";
      } else if (attrs.location === "body") {
        style.innerHTML += "\n          p, div {\n            font-family: '" + newFamily + "', " + attrs.fontType + ";\n            font-weight: " + newWeight + ";\n          }";
      } else if (attrs.location === "custom") {
        style.innerHTML += "\n          " + attrs.selector + " {\n            font-family: '" + newFamily + "', " + attrs.fontType + ";\n            font-weight: " + newWeight + ";\n          }";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElements);
  } else {
    updateElements();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
      updateElements();
    }
  };
})();