export class Disc {
  constructor(image, title, artist, genre, tracks, year) {
    this.image = image;
    this.title = title;
    this.artist = artist;
    this.genre = genre;
    this.tracks = tracks;
    this.year = year;
  }
  getimage() {
    return this.image;
  }
  gettitle() {
    return this.title;
  }
  getartist() {
    return this.artist;
  }
  getgenre() {
    return this.genre;
  }
  gettracks() {
    return this.tracks;
  }
  getyear() {
    return this.year;
  }
}
