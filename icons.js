const simpleIcons = require('simple-icons')
const { titleToFilename } = require('./utils.js')

// format title to filename
module.exports = Object.keys(simpleIcons).reduce((accu, curr) => {
  accu[titleToFilename(curr)] = simpleIcons[curr]
  return accu
}, {})
