/** 
* @desc Service of the location and db
* @author mujko1 kozinai
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  /**
  * @desc Send request to openweathermap 
  * @param String name - name of the location to request
  * @return any - response from request
  */
  getCurrentWeatherData(name) {
      return this
           .http
           .get(`https://api.openweathermap.org/data/2.5/weather?q=${name},ch&APPID=c5ff046efd910a43225f16e306180c09`);
  }
}
