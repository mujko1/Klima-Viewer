import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  uri = 'http://localhost:4000/location';

  constructor(private http: HttpClient) { }

  addLocation(data) {
    var location = {
      id: data.id,
      name: data.name,
      zip: "",
      geoLocation: JSON.stringify(data.coord),
      addedDate: String(new Date()),
    };
    this.http.post(`${this.uri}/add`, location)
        .subscribe(res => console.log('Save Data to location'));

  }

  getLocations() {
    return this
           .http
           .get(`${this.uri}`);
  };

}
