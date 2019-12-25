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

const populateHeroStation = station => {
  const tile = document.getElementById('stations-hero')

  tile.getElementById('name').text = station.name
  tile.getElementById('distance').text = humanizeDistance(station.distance)
  //tile.getElementById('electric').text = 69
  //tile.getElementById('normal').text = 69
  tile.getElementById('electric').text = station.electricBikes
  tile.getElementById('normal').text = station.normalBikes
}

const populateSecondaryStations = stations => {
  // Log each station separately, because logging the entire object at once
  // causes an our of memory exception.
  stations.forEach(station => {
    //console.log(JSON.stringify(station))
  })

  // VirtualTileList implementation
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
        normalBikes: normalBikes
      };
    },
    configureTile: function(tile, info) {
      tile.getElementById('name').text = info.name
      tile.getElementById('distance').text = info.distance
      tile.getElementById('electric').text = info.electricBikes
      tile.getElementById('normal').text = info.normalBikes
      //tile.getElementById('electric').text = 13
      //tile.getElementById('normal').text = 37
    }
  }

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = NUM_ELEMS;
}

export const loadStations = stations => {
  const heroStation = stations[0]
  const secondaryStations = stations.slice(1, stations.length - 1)

  populateHeroStation(heroStation)
  populateSecondaryStations(secondaryStations)
}
