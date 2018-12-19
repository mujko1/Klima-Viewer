import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;
  weatherDates: any;
  labels: any;
  constructor(private locationService: LocationService, private weatherService: WeatherService) {
    this.weatherDates = [{
      x: 1,
      y: 10
    }, {
      x: 2,
      y: 20
    }]
    this.labels = [1,2,3,4,6]
  }






  addLocation() {
    console.log("I try to save");
    this.locationService.addLocation("New York", 3456, "asdas")
  }

  ngOnInit() {
    console.log("Sto ne radi");
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels, // your labels array
        datasets: [
          {
            data: this.weatherDates, // your data array
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    console.log(this.chart);
  }


}
