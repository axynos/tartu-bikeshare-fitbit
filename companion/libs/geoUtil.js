import gl from 'geolocator'
import { geolocation } from 'geolocation'
import { promisify } from './libs'


// Wrap getCurrentPosition in a promise so that it can be used with await.
geolocation.getCurrentPosition[promisify.custom] = () => {
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(resolve, reject);
  });
};
const getCurrentPosition = promisify(geolocation.getCurrentPosition)

export async function getLocation() {
  const location = await getCurrentPosition()

  return {
    "lat": location.coords.latitude,
    "lng": location.coords.longitude
  }
}

export function distanceBetween(from, to) {
  const distance = gl.calcDistance({
    from: {
        latitude: from.lat,
        longitude: from.lng
    },
    to: {
        latitude: to.lat,
        longitude: to.lng
    },
    formula: gl.DistanceFormula.HAVERSINE,
    unitSystem: gl.UnitSystem.METRIC
  });

  return distance
}
