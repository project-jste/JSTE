/*!
 * Component Append
 * https://project-jste.github.io/
 *
 * Copyright 2017 Jste Team
 * Released under the GNU AGPLv3 license
 * https://project-jste.github.io/license
 *
 * Date: 2017-09-20
 */
export default function appendComponent (container, code) {
  if (container) {
    if ($('#' + container + '').hasClass('iziModal')) {
      $('#' + container + '').iziModal('setContent', code)
    } else {
      $('#' + container + '').append(code)
    }
  } else {
    $('contents').append(code)
  }
}