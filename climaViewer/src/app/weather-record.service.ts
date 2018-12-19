import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherRecordService {

  uri = 'http://localhost:4000/weatherRecord';

  constructor(private http: HttpClient) { }

  getWeatherRecords() {
    return this
           .http
           .get(`${this.uri}`);
  };
}
