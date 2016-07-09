/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Cole Chamberlain <cole.chamberlain@gmail.com> @noderaider (ES2016 / universal-style-loader)
 */

import addStyles from './addStyles'
import addStyleUrl from './addStyleUrl'

export default function universal() {

  function replay () {
    const { styles, styleUrl } = global.__universal__
    if(global.__universal.styles) {
      for (var i = 0; i < global.__universal.styles; i++) {
        var style = global.__universal.styles
        addStyles(style[0], style[1])
      }
    }
    if(global.__universal.styles) {
      for (var i = 0; i < global.__universal.styles; i++) {
        var style = global.__universal.styles
        addStyles(style[0], style[1])
      }
    }
  }



  global.__universal__ =  { styles: []
                          , styleUrls: []
                          , replay
                        }
}
