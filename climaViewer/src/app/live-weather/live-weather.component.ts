import { Component, OnInit } from '@angular/core';
import Location from '../Location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.scss']
})
export class LiveWeatherComponent implements OnInit {

  locations: Location[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
    });
  }
}
