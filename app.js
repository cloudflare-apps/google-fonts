(function () {
  if (!window.addEventListener) return // Check for IE9+

  const style = document.createElement("style")
  const WebFontConfig = {
    google: {
      families: []
    }
  }

  let options = INSTALL_OPTIONS

  document.head.appendChild(style)

  function updateElements() {
    style.innerHTML = ""
    WebFontConfig.google.families = []
    const {fonts} = options

    fonts.forEach(attrs => {
      const FONT_FAMILY = {
        serif: attrs.fontFamilySerif,
        sansSerif: attrs.fontFamilySansSerif,
        display: attrs.fontFamilyDisplay,
        handwriting: attrs.fontFamilyHandwriting,
        monospace: attrs.fontFamilyMonospace
      }
      const FONT_TYPE = {
        serif: "serif",
        sansSerif: "sans-serif",
        display: "cursive",
        handwriting: "cursive",
        monospace: "monospace"
      }
      const LOCATION = {
        headers: "h1, h2, h3, h4, h5, h6, header",
        body: "p, div",
        custom: attrs.selector
      }

      WebFontConfig.google.families.push(FONT_FAMILY[attrs.fontType])

      style.innerHTML += `
        ${LOCATION[attrs.location]} {
          font-family: '${FONT_FAMILY[attrs.fontType]}', ${FONT_TYPE[attrs.fontType]};
        }`
    })
    WebFont.load(WebFontConfig)
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
