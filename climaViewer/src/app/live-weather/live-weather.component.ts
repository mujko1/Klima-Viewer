/** 
  * @desc This class handle all the logic in the liveweather page
  * @author mujko1 kozinai
*/

// Logic controller of liveweather page
import { Component, OnInit } from '@angular/core';
import Location from '../Location';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';
import { WeatherRecordService } from '../weather-record.service';

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.scss']
})
export class LiveWeatherComponent implements OnInit {

  locations: any[];
  newCity: any;

  /**
  * @desc Init the class
  * @param LocationService locationService - service for work with location from db
  * @param weatherRecordService weatherRecordService - service for work with weatherRecord from db
  * @param WeatherService weatherService - service for api request to openweathermap
  */
  constructor(private locationService: LocationService, private weatherRecordService: WeatherRecordService, private weatherService: WeatherService) {
    this.newCity = "";
  }

  /**
  * @desc Add location to db and view. And check if there city is already in db
  */
  addLocation() {
    this.weatherService.getCurrentWeatherData(this.newCity).subscribe(res => {
        if(!this.isLocationInArr(res)){
          this.locationService.addLocation(res);
          this.weatherRecordService.addWeatherRecord(res);
          alert("Location saved in Database");
        }else{
          alert("Location is already in Database");
        }
    }, err => {
      console.log(err);
    })
  }


  /**
  * @desc Check if location is already in Location[]
  * @param string location - name of requested location
  * @return bool - found and not found
  */
  isLocationInArr(location){
    for (let location of this.locations){
      if(location.id == location.id)
        return true;
    }
    return false;
  }


  /**
  * @desc Get all location after init ng components. And set them.
  */
  ngOnInit() {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
        for (let location of this.locations) {
          this.weatherService.getCurrentWeatherData(location.name).subscribe(res => {
            location.response = res;
            location.iconPath = this.getImagePath(res);
            console.log(location)
          })
        }
      });
  }

  /**
  * @desc Get all location after init ng components. And set them.
  * @param any res - the response from request on openweathermap
  * @return string - icon path for suitable icon for weather situation
  */
  getImagePath(res) {
    let weather = res.weather[0].main;

    switch (weather) {
      case 'Rain': {
        return 'assets/icons/rain.png';
        break;
      }
      case 'Clouds': {
        return 'assets/icons/cloudy.png';
        break;
      }
      case 'Snow': {
        return 'assets/icons/snow.png';
        break;
      }
      case 'Clear': {
        return 'assets/icons/summer.png';
        break;
      }
      default: {
        return 'assets/icons/summer.png';
        break;
      }
    }


  }

}


