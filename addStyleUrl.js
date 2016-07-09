/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function addStyleUrl(cssUrl) {
  if(typeof window === 'object') {
    if(typeof DEBUG !== "undefined" && DEBUG) {
      if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
    }
    var styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.type = "text/css";
    styleElement.href = cssUrl;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(styleElement);
    if(module.hot) {
      return function(cssUrl) {
        if(typeof cssUrl === "string") {
          styleElement.href = cssUrl;
        } else {
          head.removeChild(styleElement);
        }
      };
    }
  } else {
    if(!global.__universal) {
      throw new Error('addStyleUrl when run server side requires a global.__universal object defined to append to.')
    }
    global.__universal.links = global._universal.links || []
    global.__universal.links.push(cssUrl)
  }
}
