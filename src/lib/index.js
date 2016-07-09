/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra (style-loader)
 * Refactored by Cole Chamberlain <cole.chamberlain@gmail.com> @noderaider (ES2016 / universal-style-loader)
 */

import loaderUtils from 'loader-utils'
import path from 'path'

module.exports = function() {}
module.exports.pitch = function(remainingRequest) {
  if(this.cacheable) this.cacheable()
  var query = loaderUtils.parseQuery(this.query)

  return ([ '// universal-style-loader: Adds some css to the DOM by adding a <style> tag'
          , ''
          , '// load the styles'
          , `var content = require(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)});`
          , 'if(typeof content === \'string\') content = [[module.id, content, \'\']];'
          , '// add the styles to the DOM'
          , `var update = require(${loaderUtils.stringifyRequest(this, `!${path.join(__dirname, 'addStyles.js')}`)})(content, ${JSON.stringify(query)});`
          , 'if(content.locals) module.exports = content.locals;'
          , '// Hot Module Replacement'
          , 'if(module.hot) {'
          , ' // When the styles change, update the <style> tags'
          , ' if(!content.locals) {'
          , `   module.hot.accept(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)}, function() {`
          , `     var newContent = require(${loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)});`
          , '     if(typeof newContent === \'string\') newContent = [[module.id, newContent, \'\']];'
          , '     update(newContent);'
          , '   });'
          , ' }'
          , ' // When the module is disposed, remove the <style> tags'
          , ' module.hot.dispose(function() { update(); });'
          , '}'
          ]).join('\n')
}
