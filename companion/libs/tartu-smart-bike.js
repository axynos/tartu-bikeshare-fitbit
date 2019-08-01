const apiBaseUrl = 'https://ratas.tartu.ee/stations/'
const stations = apiBaseUrl + 'stations/'
const zones = apiBaseUrl + 'zones/'

export const getData = async (url) => {
  let response = await fetch(url)
  return response.json()
}

export const getStationsData = async () => {
  let data = await getData(stations)
  return data
}

export const getZones = async () => {
  let data = await getData(zones)
  return data
}
