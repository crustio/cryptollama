export function measureDistance(lat1, lon1, lat2, lon2){
  /**
   * @returns {number} distance in meters
   */
    let R = 6378.137; // Radius of earth in KM
    let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d * 1000; // meters
}

export function mercatorLatLonToMetersCoord({lat: latDeg, lng: lonDeg}) {
  const lonRad = (lonDeg / 180.0 * Math.PI)
  const latRad = (latDeg / 180.0 * Math.PI)
  const earthR = 6378137.0

  return {
    x: earthR * lonRad,
    y: earthR * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad)),
  }
}
