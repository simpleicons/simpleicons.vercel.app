const fs = require('fs')
const { send } = require('micro')
const { router, get } = require('micro-fork')
const serveMarked = require('serve-marked')
const simpleIcons = require('simple-icons')

const notfound = (req, res) => send(res, 404, 'NOT FOUND')
const serveReadme = serveMarked('./README.md', {
  title: 'Simple Icons',
  inlineCSS: `
    @import "https://sindresorhus.com/github-markdown-css/github-markdown.css";
    .markdown-body { max-width: 640px; margin: 0 auto }
    h1 { text-align: center }
  `
})

const serveIcons = (req, res) => {
  const { color } = req.query
  const expected = `node_modules/simple-icons/icons/${req.params.name}`

  fs.access(expected, fs.constants.R, function (err) {
    if (err) {
      notfound(req, res)
    } else {
      const iconSource = fs.readFileSync(expected, 'utf-8')
      res.setHeader('Content-Type', 'image/svg+xml')
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=2419200')
      send(res, 200, transformSVG(iconSource, { fill: color }))
    }
  })
}

const transformSVG = (svgString, { fill }) => {
  if (fill) {
    svgString = svgString.replace(/^<svg /, `<svg fill="#${fill}" `)
  }
  return svgString
}

module.exports = router()(
  get('/icons/:name', serveIcons),
  get('/', serveReadme),
  get('*', notfound)
)

if (require.main === module) {
  require('micro')(module.exports).listen(3000)
}
