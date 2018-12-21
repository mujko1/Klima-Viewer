import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherRecordService {

  uri = 'http://localhost:4000/weatherRecord';

  constructor(private http: HttpClient) { }

  addWeatherRecord(data){
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
        .subscribe(res => console.log('Save data to weatherRecord'));
  }


  getWeatherRecords() {
    return this
           .http
           .get(`${this.uri}`);
  };
}
