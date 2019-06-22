const fs = require('fs')
const path = require('path')
const { send } = require('micro')
const matchRoute = require('my-way')
const serveMarked = require('serve-marked')
const simpleIcons = require('simple-icons')

const { titleToFilename } = require('./utils.js')

// format title to filename
const icons = Object.keys(simpleIcons).reduce((accu, curr) => {
  accu[titleToFilename(curr)] = simpleIcons[curr]
  return accu
}, {})

const serveReadme = serveMarked(
  fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8'),
  {
    title: 'Simple Icons',
    inlineCSS: `.markdown-body h1 + p { text-align: center; margin: -40px 0 4em 0; }`,
    beforeHeadEnd: '<meta name="viewport" content="width=device-width">'
  }
)

const serveIcon = (req, res, params) => {
  const { name, color } = params

  if (icons[name]) {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=2419200')
    return send(res, 200, transformSVG(icons[name].svg, { fill: color }))
  }

  send(res, 404)
}

const serveRedirect = (req, res, params) => {
  const name = params.name.split('.')[0]

  if (icons[name]) {
    const { color } = require('url').parse(req.url, true).query
    res.setHeader('Location', `/${name}/${color}`)
    return send(res, 301)
  }

  send(res, 404)
}

const transformSVG = (svgString, { fill }) => {
  if (fill) {
    svgString = svgString.replace(/^<svg /, `<svg fill="#${fill}" `)
  }
  return svgString
}

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return send(res, 403)
  }

  if (req.url === '/') {
    return serveReadme(req, res)
  }

  const redirectParams = matchRoute('/icons/:name', req.url)

  if (redirectParams) {
    return serveRedirect(req, res, redirectParams)
  }

  const iconParams = matchRoute('/:name/:color?', req.url)
  if (iconParams) {
    return serveIcon(req, res, iconParams)
  }

  send(res, 404)
}

if (require.main === module) {
  require('micro')(module.exports).listen(3000)
}
