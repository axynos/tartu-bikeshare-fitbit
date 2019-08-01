import { localStorage } from "local-storage";

export const saveStations = (stations) => {
  const index = createIndex()
  localStorage.setItem('_index', index)

  data.forEach(station => {
    const reducedStation = { ...station }
    // Remove distance from the saved object because it depends on user location.
    delete reducedStation.distance

    localStorage.setItem(station.name, reduced);
  })
}

export const loadStations = () => {
  const index = localStorage.getItem('_index')

  let stations = []

  index.forEach(station => {
    stations = stations.concat(localStorage.getItem(station))
  })

  return stations
}

export generateIndex = (stations) => {
  const index = stations.map(station => {
    station.name
  });

  return index
}
