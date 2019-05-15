/**
 * [dist description]
 * @param  {Number} p1X [Point 1 x position]
 * @param  {Number} p1Y [Point 1 y position]
 * @param  {Number} p2X [Point 2 x position]
 * @param  {Number} p2Y [Point 2 y position]
 * @return {Number}     [Euclidian distance between two points]
 */
dist = (p1X, p1Y, p2X, p2Y) => Math.sqrt((p2X - p1X)**2 + (p2Y - p1Y)**2)

/**
 * [radToDeg Converts an angle in radian to degree]
 * @param  {Number} rad [Angle in radian]
 * @return {Number}     [Angle in degree]
 */
radToDeg = (rad) => rad * 180 / Math.PI

/**
 * [degToRad description]
 * @param  {[type]} deg [description]
 * @return {[type]}     [description]
 */
degToRad = (deg) => deg * Math.PI / 180

/**
 * [normalize Normalizes an input for a given range]
 * @param  {Number} input [Number to normalize]
 * @param  {Number} range [Normalization range]
 * @return {Number}       [The normalized number]
 */
normalize = (input, range) => input / range

/**
 * [denormalize Undo normalization on an input for a given range]
 * @param  {Number} input [Number to denormalize]
 * @param  {Number} range [Denormalization range]
 * @return {Number}       [The denormalized number]
 */
denormalize = (input, range) => range * input

/**
 * [getRandomInRange Returns a random number comprised in a given range]
 * @param  {Number} min [Range's minimum value]
 * @param  {Number} max [Range's maximum value]
 * @return {Number}     [A random number comprised in a given range]
 */
getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min
}

/**
 * [getRandomSampleFromArray Returns a random sub sample from an array]
 * @param  {Array} arr [Array to be sampled]
 * @param  {Number} n   [Number of desired sample]
 * @return {Array}     [Randomly sampled array]
 */
getRandomSampleFromArray = (arr, n) => {
  const copiedArr = arr.slice()
  const shuffled = copiedArr.sort(() => 0.5 - Math.random())

  return shuffled.slice(0, n)
}

/**
 * [computeDirectionToNearestFood Computes a mouse's heading to the nearest food]
 * @param  {[type]} mouse  [Mouse to direct]
 * @param  {[type]} cheese [Nearest chees]
 * @return {[type]}        [Returns the normalized heading -> normalized because it helps getting better results with the neural network]
 */
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
