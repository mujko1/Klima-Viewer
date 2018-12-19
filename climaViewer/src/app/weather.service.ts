import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeatherData(name) {
      return this
           .http
           .get(`https://api.openweathermap.org/data/2.5/weather?q=${name},ch&APPID=c5ff046efd910a43225f16e306180c09`);
  }
}
