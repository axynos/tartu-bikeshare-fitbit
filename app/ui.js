import document from "document";

export const update = (event) => {
  switch (event.type) {
    case 'withData':
      updateWithData(event.data)
      break;
    case 'loading':
      console.log('Switch to loading ui.');
      break;
    default:
      break;

  }
}

const updateWithData = stations => {
  // Log each station separately, because logging the entire object at once
  // causes an our of memory exception.
  stations.forEach(station => {
    // console.log(JSON.stringify(station));
  })

  // VirtualTileList implementation
  const VTList = document.getElementById('my-tile-list');
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
        type: 'colour-pool',
        color: 'black',
        index: index,
        name: name,
        distance: humanDist,
        electricBikes: electricBikes,
        normalBikes: normalBikes
      };
    },
    configureTile: function(tile, info) {
      tile.getElementById('bg').style.fill = info.color
      tile.getElementById('name').text = info.name
      tile.getElementById('distance').text = info.distance
      tile.getElementById('electric-count').text = info.electricBikes
      tile.getElementById('normal-count').text = info.normalBikes
    }
  }

  // KNOWN ISSUE: It is currently required that VTList.length be set AFTER VTList.delegate
  VTList.length = NUM_ELEMS;
}

const humanizeDistance = (distance) => {
  let unit;
  let adjustedDist;

  if (distance < 1) {
    unit = 'm'
    adjustedDist = Math.round(distance * 1000)
  } else {
    unit = 'km'
    adjustedDist = (Math.round(distance * 1000) / 1000).toFixed(2)
  }

  return `${adjustedDist} ${unit}`
}
