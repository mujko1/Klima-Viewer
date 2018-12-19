import { Component, OnInit } from '@angular/core';
import Location from '../Location';
import { LocationService } from '../location.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  cityName: string;
  icon: string;
  temp: string;
  wind: string;
  pressure: string;
  precitipation: string;
}


@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.scss']
})
export class LiveWeatherComponent implements OnInit {

  locations: Location[];

  constructor(private locationService: LocationService) { }

  //DB LOOP, IF ARRAY CONTAINS %4=0 TILES THEN ADD NEW mat-grid-list
  tiles: Tile[] = [
    {cols: 1, rows: 2, color: 'transparent', cityName: 'Bern', icon: 'brightness_low', temp: '4°C', wind:'xy', pressure:'xy', precitipation:'xy'},
    {cols: 1, rows: 2, color: 'transparent', cityName: 'Bern', icon: 'brightness_low', temp: '4°C', wind:'xy', pressure:'xy', precitipation:'xy'},
    {cols: 1, rows: 2, color: 'transparent', cityName: 'Bern', icon: 'brightness_low', temp: '4°C', wind:'xy', pressure:'xy', precitipation:'xy'},
  ];

  ngOnInit() {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
        console.log(data);
    });
  }
}


