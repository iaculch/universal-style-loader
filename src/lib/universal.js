

module.exports =
{ styles: []
, styleUrls: []
, replay: function replay() {
    if(global.__universal.styles) {
      var addStyles = require('./addStyles');
      for (var i = 0; i < global.__universal.styles; i++) {
        var style = global.__universal.styles;
        addStyles(style[0], style[1]);
      }
    }
    if(global.__universal.styles) {
      var addStyles = require('./addStyles');
      for (var i = 0; i < global.__universal.styles; i++) {
        var style = global.__universal.styles;
        addStyles(style[0], style[1]);
      }
    }
  }
}
