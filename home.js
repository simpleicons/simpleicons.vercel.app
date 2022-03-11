const fs = require('fs')
const path = require('path')
const serveMarked = require('serve-marked').default

const icons = require('./icons.js')

const serveHome = serveMarked(
  fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8'),
  {
    title: 'Colored Octicon SVGs',
    beforeHeadEnd: `
      <meta name="viewport" content="width=device-width">
      
      <meta name="description" content="Simple website for getting colored Octicons SVGs from GitHub.">
      
      <meta name="twitter:card" content="summary">
      <meta name="twitter:title" content="Colored Octicon SVGs">
      <meta name="twitter:description" content="Simple website for getting colored Octicons SVGs from GitHub.">
      
      <meta name="og:site_name" content="Colored Octicon SVGs">
      <meta name="og:title" content="Colored Octicon SVGs">
      <meta name="og:description" content="Simple website for getting colored Octicons SVGs from GitHub.">
      <meta name="og:url" content="https://octicons-col.vercel.app/">
      
      <link href="https://www.andre601.ch/assets/img/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
      <link rel="icon" type="image/png" sizes="32x32" href="https://www.andre601.ch/assets/img/favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="https://www.andre601.ch/assets/img/favicons/favicon-16x16.png">
      
      <link rel="manifest" href="https://www.andre601.ch/assets/site.webmanifest">
      
      <link href="/stylesheets/style.css" rel="stylesheet">
    `,
    beforeBodyEnd: `
      <div id="icons" class="markdown-body">
        <h2>Icons</h2><div>${genIconsHtml()}</div>
      </div>
    `
  }
)

module.exports = function (req, res) {
  serveHome(req, res)
}

function genIconsHtml () {
  return Object.keys(icons).map(k => {
    return `<a href="/${k}/c9d1d9"><img src="/${k}/000" alt="${k}" />${k}</a>`
  }).join('')
}
