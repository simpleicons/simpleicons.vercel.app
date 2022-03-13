# Colored Octicon SVGs

[![license-src]][license-href]
[![github-src]][github-href]

Modified version of [simpleicons.vercel.app](https://simpleicons.vercel.app) (More prominently known as simpleicons.now.sh) that allows you to use coloured versions of GitHub's [Octicons](https://primer.style/octicons).

## URL patterns

The below URL patterns are available to use. You may also use https://octicons-col.vercel.app as an alternative URL.

- `https://octi.vercel.app/:name`
- `https://octi.vercel.app/:name/:color`
- `https://octi.vercel.app/:name/:color/:size`

### Parameters

- `:name`  
  **Required**  
  Name of the Octicon to use. See [Icons section](#icons) below for details.
- `:color`  
  **Optional**  
  Sets the fill color of the Octicon. Currently supported are only HEX color values (without the `#`).  
  If not set will `undefined` be used.
- `:size`  
  **Optional**  
  Sets the size (in pixels) of the Octicon. This option requires the `:color` parameter to be set!  
  If not set will `undefined` be used.  
  Due to limitations (And me sucking at JS) may lines of SVGs look different (Smaller) depending on the size.

## Examples

Some examples:

- Black GitHub logo: [`https://octi.vercel.app/mark-github/000`](https://octi.vercel.app/mark-github/000)
- Check icon with GitHub's `--color-btn-primary-bg` color: [`https://octi.vercel.app/check-circle-fill/238636`](https://octi.vercel.app/check-circle-fill/238636)
- Git Merge icon with GitHub's `--color-done-fg`color and size 100: [`octi.vercel.app/git-merge/a371f7/100`](https://octi.vercel.app/git-merge/a371f7/100)

[license-src]: https://img.shields.io/badge/License-MIT-blue
[license-href]: https://github.com/Andre601/octicons-col.vercel.app/blob/master/LICENSE
[github-src]: https://img.shields.io/badge/-Andre601%2Focticons--col.vercel.app-blue?logo=github&labelColor=777
[github-href]: https://github.com/Andre601/octicons-col.vercel.app
