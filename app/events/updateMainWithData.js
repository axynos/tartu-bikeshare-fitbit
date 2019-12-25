import { readFileSync } from 'fs'
import { MainScreen, loadStations, updateStations } from '../ui/screens/main'
import { changeScreen, current } from '../ui/screen'

export const updateMainWithData = data => {
  const stations = readFileSync(data, 'cbor')
  if (current.id !== MainScreen.id) {
    changeScreen(MainScreen)
    loadStations(stations)
  } else {
    updateStations(stations)
  }
}
