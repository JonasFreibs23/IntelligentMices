dist = (p1X, p1Y, p2X, p2Y) => Math.sqrt((p2X - p1X)**2 + (p2Y - p1Y)**2)

radToDeg = (rad) => rad * 180 / Math.PI
degToRad = (deg) => deg * Math.PI / 180

normalize = (input, range) => input / range

denormalize = (input, range) => range * input

getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min
}

getRandomSampleFromArray = (arr, n) => {
  const cpArr = arr.slice()
  const shuffled = cpArr.sort(() => 0.5 - Math.random())

  return shuffled.slice(0, n)
}

computeDirectionToNearestFood = (mouse, cheese) => {
  let dx = cheese.x - mouse.x
  let dy = cheese.y - mouse.y
  let dAlpha = Math.atan2(dy, dx) - mouse.alpha
  if(dAlpha > Math.PI){
    dAlpha -= Math.PI * 2
  }
  if(dAlpha < -Math.PI){
    dAlpha =  -Math.PI * 2 - dAlpha
  }
  return normalize(dAlpha, Math.PI)
}
