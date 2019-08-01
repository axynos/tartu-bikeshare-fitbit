import { getStationsData } from './libs/tartu-smart-bike'
import { getLocation, distanceBetween } from './libs/geoUtil'

export const getStations = async () => {
  const stations = await getStationsData()
  const userLoc = await getLocation()

  console.log(`Current device location: ${JSON.stringify(userLoc)}`);
  console.log(`Stations in system: ${stations.length}`)

  let stationList = []

  stations.forEach(station => {
    const [lat, lng] = station.location
    const distance = distanceBetween(userLoc, { lat, lng })

    stationList = stationList.concat({
      "name": station.name,
      "location": {
        "lat": lat,
        "lng": lng
      },
      "distance": distance,
      "electricBikes": station.secondary_locked_cycle_count,
      "normalBikes": station.primary_locked_cycle_count
    })
    
  })

  // Sort to ascending order non-destructively
  const sortedStations = stationList.slice().sort((a, b) => {
    return a.distance - b.distance
  })

  return sortedStations
}
