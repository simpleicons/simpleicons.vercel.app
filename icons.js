const octicons = require('@primer/octicons')
const { titleToFilename } = require('./utils.js')

// format title to filename
module.exports = Object.keys(octicons).reduce((accu, curr) => {
  accu[titleToFilename(curr)] = octicons[curr]
  return accu
}, {})
