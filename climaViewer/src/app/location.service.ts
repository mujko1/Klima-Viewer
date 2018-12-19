import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  uri = 'http://localhost:4000/location';

  constructor(private http: HttpClient) { }

  addLocation(name, zip, geoLocation) {
    const obj = {
      id: 1,
      name: name,
      zip: zip,
      geoLocation: geoLocation,
      addedDate: new Date().toISOString()
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getLocations() {
    return this
           .http
           .get(`${this.uri}`);
  };

}
