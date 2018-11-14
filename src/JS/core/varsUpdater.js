/*!
 * Text Variables Updater
 * https://project-jste.github.io/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2017-09-15
 */
import elementValue from 'core/elementValue'
import DisplayJS from 'display.js'
window.varsArray = []
export default function varsUpdater () {
  window.displayJS = new DisplayJS(window.varsArray)
  window.displayJS.dynamic(function () {
    for (var i = 0; i < Object.keys(window.varsArray).length; i++) {
      if (Object.keys(window.varsArray)[i] == 'currentUserName') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(window.user)
      } else if (Object.keys(window.varsArray)[i] == 'currentUserEmail') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(window.email)
      } else if (Object.keys(window.varsArray)[i] == 'currentWindowLength') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(screen.availHeight)
      } else if (Object.keys(window.varsArray)[i] == 'currentWindowWidth') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(screen.availWidth)
      } else if (Object.keys(window.varsArray)[i] == 'currentScreenLength') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(screen.height)
      } else if (Object.keys(window.varsArray)[i] == 'currentScreenWidth') {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(screen.width)
      } else {
        window.varsArray[Object.keys(window.varsArray)[i]] = new String(elementValue.get(Object.keys(window.varsArray)[i]))
      }
    }
  })
  window.displayJS.var(true)
}
