class TrafficCamera {
  constructor(id, url, latitude, longitude, timestamp) {
    this.id = id;
    this.url = url;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;
    console.log(this.id, this.latitude, this.longitude);
  }

  getUrl() {
    return this.url;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }
}

export default TrafficCamera;
