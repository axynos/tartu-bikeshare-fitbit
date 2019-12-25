import document from 'document'
import { humanizeDistance } from '../../util/util'

/**
 * Base definition for the main screen.
 * @type {Screen}
 */
export const MainScreen = {
  name: 'main',
  id: 'main',
  resource: 'screens/main/main.gui',
  events: ['dataUpdate'],
}

let heroStation = {}
let allStations = []
let secondaryStations = []
let savedTileList = {}

const populateHeroStation = _ => {
  const tile = document.getElementById('stations-hero')

  tile.getElementById('name').text = heroStation.name
  tile.getElementById('distance').text = humanizeDistance(heroStation.distance)
  tile.getElementById('electric').text = heroStation.electricBikes
  tile.getElementById('normal').text = heroStation.normalBikes
}

const createStationsPool = _ => {
  // VirtualTileList implementation
  const stations = secondaryStations
  const VTList = document.getElementById('stations-list');
  const NUM_ELEMS = stations.length;

  /****************************************************************************************************
   * The delegate object is what allows for us to customize tiles in the virtual list.
   * - .getTileInfo should return an object which contains a "type" field, specifying the id
   *       of the pool to get the tile from. Other than that, you can put any free-form data
   *       you want in there, and it will be passed in to configureTile.
   * - .configureTile takes in the actual VirtualTileListItem, and the info returned from .getTileInfo.
   *       This is where you can custom-style the element. Make sure you are styling it correctly
   *       for the pool specified in the type field.
   ***************************************************************************************************/
  VTList.delegate = {
    getTileInfo: function(index) {
      const station = stations[index]
      const { name, distance, electricBikes, normalBikes } = station
      const humanDist = humanizeDistance(distance)

      return {
        type: 'station-pool',
        index: index,
        name: name,
        distance: humanDist,
        electricBikes: electricBikes,
        normalBikes: normalBikes,
        id: index
      };
    },

    configureTile: function(tile, info) {
      tile.getElementById('name').text = info.name
      tile.getElementById('distance').text = info.distance
      tile.getElementById('electric').text = info.electricBikes
      tile.getElementById('normal').text = info.normalBikes

      // Save the pool tile and station pair so that it can be updated later.
      savedTileList[tile['id']] = {
        stationId: info.id,
        tileId: tile['id']
      }
    }
  }

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = NUM_ELEMS;
}

const updatePoolStations = tileInfoList => {
  tileInfoList.forEach(tileInfoKey => {
    const tileInfo = savedTileList[tileInfoKey]
    const tile = document.getElementById(tileInfo.tileId)
    const station = secondaryStations[tileInfo.stationId]

    console.log("tileId: " + tileInfo.tileId + " / " + "stationId: " + tileInfo.stationId)

    tile.getElementById('name').text = station.name
    tile.getElementById('distance').text = humanizeDistance(station.distance)
    tile.getElementById('electric').text = station.electricBikes
    tile.getElementById('normal').text = station.normalBikes
  })
}

/**
 * Initial load of the stations, creates the secondary stations pool.
 * @param  {Array} stations Data array of stations.
 * @return {undefined}
 */
export const loadStations = stations => {
  heroStation = stations[0]
  secondaryStations = stations.slice(1, stations.length - 1)

  populateHeroStation()
  createStationsPool()
}


/**
 * Update stations when the Virtual Tile List has already been created.
 * @param  {Array} stations Array with the updated stations information.
 * @return {undefined}
 */
export const updateStations = stations => {
  allStations = stations
  heroStation = stations[0]
  secondaryStations = stations.slice(1, stations.length - 1)

  populateHeroStation()
  updatePoolStations(Object.getOwnPropertyNames(savedTileList))
}
