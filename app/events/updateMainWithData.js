import { readFileSync } from 'fs'
import { MainScreen, loadStations } from '../ui/screens/main'
import { changeScreen } from '../ui/screen'

export const updateMainWithData = data => {
  const stations = readFileSync(data, 'cbor')
  changeScreen(MainScreen)
  loadStations(stations)
}
