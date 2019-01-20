/** 
* @desc Service of the location and db
* @author mujko1 kozinai
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// service of location
export class LocationService {
  uri = 'http://147.87.116.18:4000/location';

  constructor(private http: HttpClient) { }

  /**
  * @desc Save location to db
  * @param response data - response from openweathermap
  */
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

  /**
  * @desc get all locations from db
  * @return Location[] - return all locations
  */
  getLocations() {
    return this
           .http
           .get(`${this.uri}`);
  };

}
