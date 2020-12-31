const fs = require('fs')
const path = require('path')
const serveMarked = require('serve-marked').default

const icons = require('./icons.js')

const serveHome = serveMarked(
  fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8'),
  {
    title: 'Simple Icons',
    inlineCSS: `
      .markdown-body { max-width: 960px }
      .markdown-body h1 + p { text-align: center; margin: -40px 0 4em 0; }
      #icons a { display: inline-block; text-align: center; margin-right: 7px }
      #icons a { width: 80px; height: 120px; font-size: 12px; vertical-align: top }
      #icons a { color: #777; font-family: consolas, monospace }
      #icons img { width: 32px; display: block; margin: 1em auto }
    `,
    beforeHeadEnd: '<meta name="viewport" content="width=device-width">',
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
    const url = `/${k}/000`
    return `<a href="${url}"><img src="${url}" alt="${k}" />${k}</a>`
  }).join('')
}
