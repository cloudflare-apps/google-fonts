(function () {
  if (!window.addEventListener) return // Check for IE9+

  const FONT_TYPE = {
    serif: "serif",
    sansSerif: "sans-serif",
    fancy: "cursive",
    handwriting: "cursive",
    monospace: "monospace"
  }
  const googleFontLoader = document.createElement("script")
  const stylesheet = document.createElement("style")

  let options = INSTALL_OPTIONS

  function updateElement() {
    const {headers, body, custom} = options
    const HEADER_FONT_FAMILY = {
      serif: headers.serif,
      sansSerif: headers.sansSerif,
      fancy: headers.fancy,
      handwriting: headers.handwriting,
      monospace: headers.monospace
    }
    const BODY_FONT_FAMILY = {
      serif: body.serif,
      sansSerif: body.sansSerif,
      fancy: body.fancy,
      handwriting: body.handwriting,
      monospace: body.monospace
    }
    const [headerFontFamily] = HEADER_FONT_FAMILY[headers.style].split(":")
    const [bodyFontFamily] = BODY_FONT_FAMILY[body.style].split(":")

    stylesheet.innerHTML = `
    h1, h2, h3, h4, h5, h6, headers {
      font-family: '${headerFontFamily.split("+").join(" ")}', ${FONT_TYPE[headers.style]};
    }

    body {
      font-family: '${bodyFontFamily.split("+").join(" ")}', ${FONT_TYPE[body.style]};
    }`

    const fontArray = custom.map(({style, ...attrs}) => attrs[style])

    fontArray.push(HEADER_FONT_FAMILY[headers.style], BODY_FONT_FAMILY[body.style])

    window.WebFont.load({
      active() {
        stylesheet.innerHTML += custom.reduce((rules, {style, ...attrs}) => {
          const [fontFamily] = attrs[style].split(":")

          return rules + `
            ${attrs.selector} {
              font-family: '${fontFamily.split("+").join(" ")}', ${FONT_TYPE[style]};
            }
          `
        }, "")

        document.head.appendChild(stylesheet)
      },
      google: {
        families: fontArray
      }
    })
    document.body.setAttribute("data-eager-google-fonts-state", "loaded")
  }

  function bootstrap () {
    document.body.setAttribute("data-eager-google-fonts-state", "loading")
    googleFontLoader.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    googleFontLoader.async = true

    googleFontLoader.addEventListener("load", updateElement)

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
      document.body.setAttribute("data-eager-google-fonts-state", "loading")

      stylesheet.innerHTML = ""
      stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet)

      updateElement()
    }
  }
}())
