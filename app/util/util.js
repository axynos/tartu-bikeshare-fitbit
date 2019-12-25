export const humanizeDistance = (distance) => {
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
