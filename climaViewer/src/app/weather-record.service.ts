/** 
* @desc Service of the location and db
* @author mujko1 kozinai
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
// service of location
export class WeatherRecordService {

  uri = 'http://147.87.116.18:4000/weatherRecord';

  constructor(private http: HttpClient) { }

  /**
 * @desc Save weatherRecord to db
 * @param response data - response from openweathermap
 */
  addWeatherRecord(data) {
    return new Promise((resolve, reject) => {
    var weatherRecord = {
      id: data.id,
      temperature: data.main.temp,
      wind: data.wind.speed,
      pressure: data.main.pressure,
      precipitation: (typeof (data.precipitation) !== 'undefined') ? data.precipitation : "",
      date: String(new Date()),
      response: JSON.stringify(data)
    };

    this.http.post(`${this.uri}/add`, weatherRecord)
      .subscribe(res => {
        resolve();
        console.log('Save data to weatherRecord');
      }, error => {
        reject();
      });
    });
  }

  /**
  * @desc get all weatherRecords by specific id from db
  * @param String id - id from openweathermap defined
  * @return Location[] - return all locations by id
  */
  getWeatherRecordByID(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }

  /**
  * @desc get all weatherRecords from db
  * @return Location[] - return all locations
  */
  getWeatherRecords() {
    return this
      .http
      .get(`${this.uri}`);
  };
}
