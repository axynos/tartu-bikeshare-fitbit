import document from 'document'
import { LoadingScreen } from './screens/loading'

/**
 * A screen
 * @typedef {Object} Screen
 */

const exampleScreen = {
  name: 'example',
  id: 'example',
  resource: 'example.gui',
  events: []
}

/**
 * Currently active screen.
 * @type {Screen}
 */
export let current = LoadingScreen

/**
 * Changes to desired screen
 * @param  {Screen} screen Screen to change to.
 * @return {undefined}
 */
export const changeScreen = screen => {
  document.replaceSync(screen.resource)
  current = screen
}
