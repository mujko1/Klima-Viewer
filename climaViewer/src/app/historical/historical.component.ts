import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TouchSequence } from 'selenium-webdriver';
import { LocationService } from '../location.service';
import { WeatherRecordService } from '../weather-record.service';

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
  weatherRecords: any;

  constructor(private locationService: LocationService, private weatherRecordService: WeatherRecordService) {

    this.labels = [];
    this.weatherDates = [];

    this.chartConfig = [];
    this.chartConfig.interval = "daily";
    this.chartConfig.showChart = false;
    this.chartConfig.type = "temperature";

    this.chartConfig.period = [];
    this.chartConfig.period.dates = [];
    this.getLocations();

  }

  changeLocation(location) {
    this.getAllWeatherRecordsByID(location.id);
  };

  changeInterval(interval) {
    this.chartConfig.interval = interval;
  }

  getAllWeatherRecordsByID(id) {
    this.weatherRecordService.getWeatherRecordByID(id)
      .subscribe((data: any[]) => {
        this.weatherRecords = data;
        console.log(this.weatherRecords);
        this.initFormData();

      }
      )
  }

  initFormData() {
    for (let weatherRecord of this.weatherRecords) {
      let date = new Date(weatherRecord.date);
      weatherRecord.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
      if (!this.arrContains(weatherRecord.date, this.chartConfig.period.dates)) {
        this.chartConfig.period.dates.push({ id: weatherRecord._id, value: weatherRecord.date });
      }
    }
  }

  arrContains(value, array) {
    let arrContainsFlag = false;
    for (let obj of array) {
      if (value == obj.value)
        return true;
    }
    return false;
  }

  ngOnInit() {
    // this.initChartData()
    // this.chart = this.generateLineChart();
    // this.chart = this.generateBarChart();
  }

  getLocations() {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
      }
      )
  };

  initDailyChartData() {
    // This is needed for x-axis
    let index = 1;
    for (let date of this.chartConfig.period.dates) {
      this.labels.push(date.value);
      this.weatherDates.push({ x: index, y: 0 })
      index++;
    }

    // This is needed for y-axis
    for (let weatherRecord of this.weatherRecords) {
      for (let i = 0; i < this.chartConfig.period.dates.length; i++) {
        if (weatherRecord.date == this.chartConfig.period.dates[i].value) {
          if (this.weatherDates[i].y == 0) {
            if (this.chartConfig.type == "temperature")
              this.weatherDates[i].y = weatherRecord.temperature;

            if (this.chartConfig.type == "wind")
              this.weatherDates[i].y = weatherRecord.wind;

            if (this.chartConfig.type == "pressure")
              this.weatherDates[i].y = weatherRecord.pressure;

            if (this.chartConfig.type == "precipitation")
              this.weatherDates[i].y = weatherRecord.precipitation;
          } else {
            if (this.chartConfig.type == "temperature")
              this.weatherDates[i].y = (this.weatherDates[i].y + weatherRecord.temperature) / 2

            if (this.chartConfig.type == "wind")
              this.weatherDates[i].y = (this.weatherDates[i].y + weatherRecord.wind) / 2

            if (this.chartConfig.type == "pressure")
              this.weatherDates[i].y = (this.weatherDates[i].y + weatherRecord.pressure) / 2

            if (this.chartConfig.type == "precipitation")
              this.weatherDates[i].y = (this.weatherDates[i].y + weatherRecord.precipitation) / 2
          }
        }
      }
    }

  }

  applyChartConfigs() {
    this.labels = []
    this.weatherDates = []
    this.initDailyChartData();
    this.chart = this.generateLineChart();
    this.chart.update();
  }

  // TODO: Use enum types
  changeData(type: String) {
    this.chartConfig.type = type;
    this.applyChartConfigs();
    this.chart.update();
  }

  generateLineChart() {
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

  generateBarChart() {
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
