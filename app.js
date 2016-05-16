(function () {
  if (!window.addEventListener) return // Check for IE9+

  const googleFonts = document.createElement("link") // Remove me >:(
  const style = document.createElement("style")
  const WebFontConfig = {
    google: {
      families: []
    }
  }

  let options = INSTALL_OPTIONS

  document.head.appendChild(googleFonts) // Remove me >:(
  document.head.appendChild(style)

  function updateElements() {
    style.innerHTML = ""
    const {fonts} = options

    console.log(fonts)

    let GOOGLE_FONTS_SOURCE = "https://fonts.googleapis.com/css?family="

    googleFonts.type = "text/javascript"
    googleFonts.className = "hello"
    googleFonts.async = "true"
    googleFonts.rel = "stylesheet"

    fonts.forEach(attrs => {
      // WebFontConfig.google.families.push(whatever)
      // stylesheets stuff
    })

    // WebFont.load(WebFontConfig)

    fonts.forEach(attrs => {
      console.log(attrs)
      let family

      if (attrs.fontType === "serif") {
        family = attrs.fontFamilySerif
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight
          console.log(GOOGLE_FONTS_SOURCE)
        }
        else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|"
          console.log(GOOGLE_FONTS_SOURCE)
        }
      }
      else if (attrs.fontType === "sans-serif") {
        family = attrs.fontFamilySansSerif
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight
          console.log(GOOGLE_FONTS_SOURCE)
        }
        else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|"
          console.log(GOOGLE_FONTS_SOURCE)
        }
      }
      else if (attrs.fontType === "display") {
        family = attrs.fontFamilyDisplay
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight
          console.log(GOOGLE_FONTS_SOURCE)
        }
        else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|"
          console.log(GOOGLE_FONTS_SOURCE)
        }
      }
      else if (attrs.fontType === "handwriting") {
        family = attrs.fontFamilyHandwriting
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight
          console.log(GOOGLE_FONTS_SOURCE)
        }
        else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|"
          console.log(GOOGLE_FONTS_SOURCE)
        }
      }
      else if (attrs.fontType === "monospace") {
        family = attrs.fontFamilyMonospace
        if (fonts.length === 1) {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight
          console.log(GOOGLE_FONTS_SOURCE)
        }
        else {
          GOOGLE_FONTS_SOURCE += family + attrs.fontWeight + "|"
          console.log(GOOGLE_FONTS_SOURCE)
        }
      }
      googleFonts.href = GOOGLE_FONTS_SOURCE

      const splitFamily = family.split("+")
      const newFamily = splitFamily.join(" ")

      const weight = attrs.fontWeight
      const splitWeight = weight.split(":")
      const newWeight = splitWeight[1]

      if (attrs.location === "headers") {
        style.innerHTML += `
          h1, h2, h3, h4, h5, h6, header {
            font-family: '${newFamily}', ${attrs.fontType};
            font-weight: ${newWeight};
          }`
      }
      else if (attrs.location === "body") {
        style.innerHTML += `
          p, div {
            font-family: '${newFamily}', ${attrs.fontType};
            font-weight: ${newWeight};
          }`
      }
      else if (attrs.location === "custom") {
        style.innerHTML += `
          ${attrs.selector} {
            font-family: '${newFamily}', ${attrs.fontType};
            font-weight: ${newWeight};
          }`
      }
    })
  }

  function bootstrap () {
    const googleFontLoader = document.createElement("script")
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.type = "text/javascript"
    googleFontLoader.async = "true"

    googleFontLoader.addEventListener("load", updateElements)

    document.head.appendChild(googleFontLoader)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap)
  }
  else {
    bootstrap()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions
      updateElements()
    }
  }
}())
