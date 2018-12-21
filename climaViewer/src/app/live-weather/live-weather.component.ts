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

  constructor(private locationService: LocationService, private weatherRecordService: WeatherRecordService, private weatherService: WeatherService) {

    this.newCity = "e.x Jegensdorf";
   }

  addLocation(){
    this.weatherService.getCurrentWeatherData(this.newCity).subscribe(res => {
      this.locationService.addLocation(res);
      this.weatherRecordService.addWeatherRecord(res);
    }, err => {
      console.log(err);
    })
  }


  ngOnInit() {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
        for(let location of this.locations){
          this.weatherService.getCurrentWeatherData(location.name).subscribe(res => {
            location.response = res;
            console.log(location)
          })
        }
    });
  }
}


