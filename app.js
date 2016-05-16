(function () {
  if (!window.addEventListener) return // Check for IE9+

  const FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    display: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  }
  const SELECTORS = {
    headers: "h1, h2, h3, h4, h5, h6, header",
    body: "p, div"
  }
  const style = document.createElement("style")
  const WebFontConfig = {
    google: {
      families: []
    }
  }

  let options = INSTALL_OPTIONS

  function updateElements() {
    style.innerHTML = ""
    WebFontConfig.google.families = []
    const {fonts} = options

    fonts.forEach(({fontType, location, ...attrs}) => {
      const fontFamily = attrs[fontType]
      const selector = location === "custom" ? attrs.selector : SELECTORS[location]

      WebFontConfig.google.families.push(fontFamily)

      style.innerHTML += `
        ${selector} {
          font-family: '${fontFamily}', ${FONT_TYPE[fontType]};
        }
      `
    })

    window.WebFont.load(WebFontConfig)
  }

  function bootstrap () {
    const googleFontLoader = document.createElement("script")

    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.type = "text/javascript"
    googleFontLoader.async = "true"

    googleFontLoader.addEventListener("load", updateElements)

    document.head.appendChild(googleFontLoader)
    document.head.appendChild(style)
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
