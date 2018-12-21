import { Component, OnInit } from '@angular/core';
import Location from '../Location';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.scss']
})
export class LiveWeatherComponent implements OnInit {

  locations: any[];
  newCity: any;

  constructor(private locationService: LocationService, private weatherService: WeatherService) {

    this.newCity = "Example";
   }

  addLocation(){
    
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
        //console.log(data);
    });
  }
}


