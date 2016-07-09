/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra (style-loader)
 * Refactored by Cole Chamberlain <cole.chamberlain@gmail.com> @noderaider (ES2016 / universal-style-loader)
 */

import loaderUtils from 'loader-utils'
import path from 'path'

module.exports = function() {}
module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable()
  return ([ '// style-loader: Adds some reference to a css file to the DOM by adding a <link> tag'
          , `var update = require(${JSON.stringify(`!${path.join(__dirname, 'addStyleUrl.js')}`)})(`
          , `\trequire(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)})`
          , ');'
          , '// Hot Module Replacement'
          , 'if(module.hot) {'
          , `\tmodule.hot.accept(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)}, function() {`
          , `\t\tupdate(require(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)}));`
          , '\t});'
          , '\tmodule.hot.dispose(function() { update(); });'
          , '}'
          ]).join('\n')
}
