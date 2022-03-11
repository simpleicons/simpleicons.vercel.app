const fs = require('fs')
const { send } = require('micro')
const matchRoute = require('my-way')

const icons = require('./icons.js')
const serveHomepage = require('./home.js')

const serveIcon = (req, res, params) => {
  const { name, color, size } = params

  if (icons[name]) {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800')
    
    return send(res, 200, icons[name].toSVG({ fill: `#${color}`, width: `${size}`, height: `${size}`, xmlns: 'http://www.w3.org/2000/svg'}))
  }

  send(res, 404)
}

const serveCSS = (req, res) => {
  res.setHeader('Content-Type', 'text/css')
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800')
  return send(res, 200, fs.readFileSync('assets/stylesheets/style.css', 'utf-8'))
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

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return send(res, 403)
  }

  if (req.url === '/') {
    // res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=2592000')
    return serveHomepage(req, res)
  }
  
  if (req.url === '/styles') {
    return serveCSS(req, res)
  }

  const redirectParams = matchRoute('/icons/:name', req.url)

  if (redirectParams) {
    return serveRedirect(req, res, redirectParams)
  }
  
  const iconParams = matchRoute('/:name/:color?/:size?', req.url)
  if (iconParams) {
    return serveIcon(req, res, iconParams)
  }

  send(res, 404)
}

if (require.main === module) {
  require('micro')(module.exports).listen(3000)
}
