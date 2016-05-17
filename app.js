(function () {
  if (!window.addEventListener) return // Check for IE9+

  const FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    fancy: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  }
  const SELECTORS = {
    headers: "h1, h2, h3, h4, h5, h6, header",
    body: "body"
  }
  const googleFontLoader = document.createElement("script")
  const stylesheet = document.createElement("style")

  let options = INSTALL_OPTIONS

  function updateElements() {
    stylesheet.innerHTML = ""
    stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet)

    const {fonts} = options

    window.WebFont.load({
      active() {
        stylesheet.innerHTML = fonts.reduce((rules, {style, location, ...attrs}) => {
          const [fontFamily] = attrs[style].split(":")

          const selector = location === "custom" ? attrs.selector : SELECTORS[location]

          return rules + `
            ${selector} {
              font-family: '${fontFamily.replace("+", " ")}', ${FONT_TYPE[style]};
            }
          `
        }, "")

        document.head.appendChild(stylesheet)
      },
      google: {
        families: fonts.map(({style, ...attrs}) => attrs[style])
      }
    })
  }

  function bootstrap () {
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.async = true

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
