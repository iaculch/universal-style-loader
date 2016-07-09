/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra (style-loader)
 * Refactored by Cole Chamberlain <cole.chamberlain@gmail.com> @noderaider (ES2016 / universal-style-loader)
 */

export default function addStyleUrls(cssUrl) {
  if(typeof window === 'object') {
    if(typeof DEBUG !== 'undefined' && DEBUG) {
      if(typeof document !== 'object') throw new Error('The style-loader cannot be used in a non-browser environment')
    }
    var styleElement = document.createElement('link')
    styleElement.rel = 'stylesheet'
    styleElement.type = 'text/css'
    styleElement.href = cssUrl
    var head = document.getElementsByTagName('head')[0]
    head.appendChild(styleElement)
    if(module.hot) {
      return function(cssUrl) {
        if(typeof cssUrl === 'string') {
          styleElement.href = cssUrl
        } else {
          head.removeChild(styleElement)
        }
      }
    }
  } else {
    global.__universal = global.__universal || require('./universal')
    global.__universal.styleUrls.push(cssUrl)
  }
}
