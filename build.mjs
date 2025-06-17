import { readFileSync, writeFileSync } from 'fs';
import { hyperMarked } from 'hyper-marked';
import * as simpleIcons from 'simple-icons';

const markdown = readFileSync('README.md', 'utf8');
const customCSS = readFileSync('public/index.css', 'utf8');

function main() {
  const icons = Object.keys(simpleIcons).reduce((accu, curr) => {
    accu[titleToFilename(curr)] = simpleIcons[curr]
    return accu
  }, {})

  const html = hyperMarked(markdown, {
    title: 'Simple Icons',
    css: customCSS,
    beforeHeadEnd: `
    <meta name="description" content="Serve colorful simpleicons on Vercel CDN">
    <meta name="keywords" content="simple icons, svg icons, vercel, cdn">
    <meta property="og:title" content="simpleicons.vercel.app">
    <meta property="og:description" content="Serve colorful simpleicons on Vercel CDN">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary">
  `,
    beforeBodyEnd: `
    <div id="icons" class="markdown-body">
      <h2>Icons</h2><div>${genIconsHtml(icons)}</div>
    </div>
  `,
    markedOptions: {
      breaks: true,
      gfm: true
    }
  });

  writeFileSync('public/index.html', html);

  console.log('✅ Build completed: README.md → public/index.html');
}

main();

function genIconsHtml (icons) {
  return Object.keys(icons).map(k => {
    const url = `/${k}/000`
    return `<a href="${url}"><img src="${url}" alt="${k}" loading="lazy" />${k}</a>`
  }).join('')
}

function titleToFilename(title) {
  return title.toLowerCase()
    .replace(/^si/, "")
    .replace(/\+/g, "plus")
    .replace(/^\./, "dot-")
    .replace(/\.$/, "-dot")
    .replace(/\./g, "-dot-")
    .replace(/^&/, "and-")
    .replace(/&$/, "-and")
    .replace(/&/g, "-and-")
    .replace(/[ !’]/g, "")
    .replace(/à|á|â|ã|ä/, "a")
    .replace(/ç/, "c")
    .replace(/è|é|ê|ë/, "e")
    .replace(/ì|í|î|ï/, "i")
    .replace(/ñ/, "n")
    .replace(/ò|ó|ô|õ|ö/, "o")
    .replace(/ù|ú|û|ü/, "u")
    .replace(/ý|ÿ/, "y")
}
