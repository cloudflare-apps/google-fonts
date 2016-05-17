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
    body: "body"
  }
  const googleFontLoader = document.createElement("script")
  const style = document.createElement("style")

  let options = INSTALL_OPTIONS

  function updateElements() {
    const {fonts} = options

    window.WebFont.load({
      active() {
        style.innerHTML = fonts.reduce((rules, {fontType, location, ...attrs}) => {
          const fontFamily = attrs[fontType]
          const selector = location === "custom" ? attrs.selector : SELECTORS[location]

          return rules + `
            ${selector} {
              font-family: '${fontFamily}', ${FONT_TYPE[fontType]};
            }
          `
        }, "")
      },
      google: {
        families: fonts.map(({fontType, ...attrs}) => attrs[fontType])
      }
    })
  }

  function bootstrap () {
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.async = true

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
