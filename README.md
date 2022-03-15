# Colored Octicon SVGs

[![license-src]][license-href]
[![github-src]][github-href]

Modified version of [simpleicons.vercel.app](https://simpleicons.vercel.app) (More prominently known as simpleicons.now.sh) that allows you to use coloured versions of GitHub's [Octicons](https://primer.style/octicons).

## URL patterns

The following patterns are available for you to use. You may also use https://octicons-col.vercel.app as a fallback should the other domain not work.

- `https://octicons.andre601.ch/:name`
- `https://octicons.andre601.ch/:name/:color`
- `https://octicons.andre601.ch/:name/:color/:size`

### Parameters

- `:name`  
  **Required**  
  Name of the Octicon to use. See the [Icons section](#icons) below for available names.
- `:color`  
  **Optional**  
  Sets the fill color of the Octicon. Only HEX colors (Without the `#`) are supported.
- `:size`  
  **Optional**  
  Sets the size of the SVG in pixels. **The `:color` parameter needs to be set if you want to use this one!**  
  Note that SVGs may look different depending on the used size (thiner/thicker lines).

## Examples

Some examples:

- Black GitHub logo: [`octicons.andre601.ch/mark-github/000`](https://octicons.andre601.ch/mark-github/000)
- Check icon with GitHub's `--color-btn-primary-bg` color: [`octicons.andre601.ch/check-circle-fill/238636`](https://octicons.andre601.ch/check-circle-fill/238636)
- Git Merge icon with GitHub's `--color-done-fg` color and size 100: [`octicons.andre601.ch/git-merge/a371f7/100`](https://octicons.andre601.ch/git-merge/a371f7/100)

[license-src]: https://img.shields.io/badge/License-MIT-blue
[license-href]: https://github.com/Andre601/octicons-col.vercel.app/blob/master/LICENSE
[github-src]: https://img.shields.io/badge/-Andre601%2Focticons--col.vercel.app-blue?logo=github&labelColor=777
[github-href]: https://github.com/Andre601/octicons-col.vercel.app
