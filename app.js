(function () {
  if (!window.addEventListener) return // Check for IE9+

  const STATE_ATTRIBUTE = "data-eager-google-fonts-state"
  const FONT_PATTERN = /\+/g
  const FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    fancy: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  }

  const loadingStyle = document.createElement("style")

  loadingStyle.innerHTML = `
    body, body * {
      color: transparent !important;
    }
  `
  const googleFontLoader = document.createElement("script")
  const fontStyles = document.createElement("style")

  let options = INSTALL_OPTIONS

  function onFontLoadFinish() {
    document.body.setAttribute(STATE_ATTRIBUTE, "loaded")
    loadingStyle.parentNode && loadingStyle.parentNode.removeChild(loadingStyle)
  }

  function updateElement() {
    const {headers, body, custom} = options

    headers.selector = "h1, h2, h3, h4, h5, h6, headers"
    body.selector = "body"

    const fonts = [headers, body].concat(custom)

    const families = fonts.map(({category, ...attrs}) => attrs[category])

    window.WebFont.load({
      active() {
        fontStyles.innerHTML = fonts.reduce((rules, {category, ...attrs}) => {
          const [fontFamily] = attrs[category].split(":")

          return rules + `
            ${attrs.selector} {
              font-family: '${fontFamily.replace(FONT_PATTERN, " ")}', ${FONT_TYPE[category]};
            }
          `
        }, "")

        document.head.appendChild(fontStyles)
        onFontLoadFinish()
      },
      inactive() {
        onFontLoadFinish()
      },
      google: {families}
    })
  }

  function bootstrap () {
    if (INSTALL_ID === "preview") {
      const {color} = document.defaultView.getComputedStyle(document.body)
      const devStylesheet = document.createElement("style")

      devStylesheet.innerHTML = `
        body[${STATE_ATTRIBUTE}] {
          transition-duration: 150ms;
          transition-property: color, text-shadow;
          transition-timing-function: linear;
        }

        body[${STATE_ATTRIBUTE}="updating"],
        body[${STATE_ATTRIBUTE}="updating"] * {
          color: transparent !important;
          text-shadow: 0 0 6px ${color};
        }
      `
      document.head.appendChild(devStylesheet)
    }

    document.body.setAttribute(STATE_ATTRIBUTE, "boostrapping")
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.async = true

    googleFontLoader.addEventListener("load", updateElement)

    document.head.appendChild(googleFontLoader)
  }

  document.head.appendChild(loadingStyle)

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap)
  }
  else {
    bootstrap()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      document.body.setAttribute(STATE_ATTRIBUTE, "updating")
      options = nextOptions

      updateElement()
    }
  }
}())
