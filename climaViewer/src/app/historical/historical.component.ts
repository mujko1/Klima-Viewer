import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TouchSequence } from 'selenium-webdriver';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;
  chartConfig: any;
  weatherDates: any;
  labels: any;
  locations: any;

  constructor(private locationService: LocationService) {
    this.chartConfig = [];
    this.chartConfig.interval = "Daily";
    this.chartConfig.showChart = false;
    this.chartConfig.type = "temperature";

    this.chartConfig.period = [];
    this.chartConfig.period.from = "21.08.2018";
    this.chartConfig.period.to = "25.08.2018";
    this.getLocations();

  }

  changeLocation(event){
    console.log(this.chartConfig.selectedLocation);
  };

  ngOnInit() {
    this.initChartData()
    this.chart = this.generateLineChart();
    this.chart = this.generateBarChart();
  }

  getLocations(){
   this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
        }
    )
  };

  initChartData(){
    this.weatherDates = [{
      x: 1,
      y: 10
    }, {
      x: 2,
      y: 20
    }]
    this.labels = [1,2,3,4,6]
  }

  applyChartConfigs(){
    this.weatherDates.push({
      x: 3,
      y: 15
    });
    this.chart.update();
  }

  // TODO: Use enum types
  changeData(type: String){
    this.chartConfig.type = type;
    if (this.chartConfig.type == 'precipitation')
      this.chart = this.generateBarChart();
    else 
      this.chart = this.generateLineChart();
    this.chart.update();  
  }

  generateLineChart(){
    return new Chart(this.chartRef.nativeElement, {
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
  }

  generateBarChart(){
    return new Chart(this.chartRef.nativeElement, {
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
  }

}
