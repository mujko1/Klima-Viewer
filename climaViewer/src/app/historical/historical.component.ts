/**
 * @desc This class handle all the logic in the historical page
 * @author mujko1 kozinai
 */

// Logic controller of historical page
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Chart } from "chart.js";
import { TouchSequence } from "selenium-webdriver";
import { LocationService } from "../location.service";
import { WeatherRecordService } from "../weather-record.service";
import * as XLSX from "xlsx";

@Component({
  selector: "app-historical",
  templateUrl: "./historical.component.html",
  styleUrls: ["./historical.component.scss"]
})
export class HistoricalComponent implements OnInit {
  @ViewChild("lineChart") private chartRef;
  chart: any;
  chartConfig: any;
  weatherDates: any;
  labels: any;
  locations: any;
  weatherRecords: any;

  btnColorDaily: any;
  btnColorThreeHours: any;

  btnColorTemperature: String = "primary";
  btnColorWind: String;
  btnColorPressure: String;
  btnColorPrecipitation: String;

  /**
   * @desc Init the class
   * @param LocationService locationService - service for work with location from db
   * @param weatherRecordService weatherRecordService - service for work with weatherRecord from db
   */
  constructor(
    private locationService: LocationService,
    private weatherRecordService: WeatherRecordService,
    private cdr: ChangeDetectorRef
  ) {
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

  /**
   * @desc If trigger than get all weatherRecords from this location
   * @param Location location - location object
   */
  changeLocation(location) {
    this.resetDates();
    this.getAllWeatherRecordsByID(location.id);
  }

  /**
   * @desc Reset date period because there can be old dates from previous selected location
   */
  resetDates() {
    this.chartConfig.period = [];
    this.chartConfig.period.dates = [];
  }

  /**
   * @desc Set manually the new value of interval
   * @param string interval - value of interval 'daily'|'threeHours'
   */
  changeInterval(interval) {
    this.chartConfig.interval = interval;
    this.changeButtonColorIntervall(interval);
  }

  changeButtonColorIntervall(interval) {
    if (interval == "daily") {
      this.btnColorDaily = "primary";
      this.btnColorThreeHours = "";
    } else {
      this.btnColorDaily = "";
      this.btnColorThreeHours = "primary";
    }
  }

  changeButtonColorCharts(type) {
    switch (type) {
      case "temperature":
        this.btnColorTemperature = "primary";
        this.btnColorWind = "";
        this.btnColorPressure = "";
        this.btnColorPrecipitation = "";
        break;
      case "wind":
        this.btnColorTemperature = "";
        this.btnColorWind = "primary";
        this.btnColorPressure = "";
        this.btnColorPrecipitation = "";
        break;
      case "pressure":
        this.btnColorTemperature = "";
        this.btnColorWind = "";
        this.btnColorPressure = "primary";
        this.btnColorPrecipitation = "";
        break;
      case "precipitation":
        this.btnColorTemperature = "";
        this.btnColorWind = "";
        this.btnColorPressure = "";
        this.btnColorPrecipitation = "primary";
        break;
      default:
        alert("Not supported type");
    }
  }

  /**
   * @desc If trigger than get all weatherRecords from this location
   * @param string id - id of the location
   */
  getAllWeatherRecordsByID(id) {
    this.weatherRecordService
      .getWeatherRecordByID(id)
      .subscribe((data: any[]) => {
        this.weatherRecords = data;
        this.initFormData();
      });
  }

  /**
   * @desc Init the form data to use it for the next configurations
   */
  initFormData() {
    for (let weatherRecord of this.weatherRecords) {
      let date = new Date(weatherRecord.date);
      weatherRecord.dayDate =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      if (
        !this.arrContains(weatherRecord.dayDate, this.chartConfig.period.dates)
      ) {
        this.chartConfig.period.dates.push({
          id: weatherRecord._id,
          value: weatherRecord.dayDate
        });
      }
    }
  }

  /**
   * @desc check if input value is in input array
   * @param any value - value which is to search
   * @param any[] array - array which have to be searched
   * @return bool - found or not found
   */
  arrContains(value, array) {
    let arrContainsFlag = false;
    for (let obj of array) {
      if (value == obj.value) return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {}

  /**
   * @desc get all Locations from db
   */
  getLocations() {
    this.locationService.getLocations().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }

  /**
   * @desc init chart data for daily chart
   */
  initDailyChartData() {
    // This is needed for x-axis
    let index = 1;
    for (let date of this.chartConfig.period.dates) {
      if (this.containsDate(this.parseDate(date.value))) {
        this.labels.push(date.value);
        this.weatherDates.push({ x: index, y: 0 });
        index++;
      }
    }

    // This is needed for y-axis
    for (let weatherRecord of this.weatherRecords) {
      if (this.containsDate(weatherRecord.date)) {
        for (let i = 0; i < this.chartConfig.period.dates.length; i++) {
          if (weatherRecord.dayDate == this.chartConfig.period.dates[i].value) {
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
                this.weatherDates[i].y =
                  (this.weatherDates[i].y + weatherRecord.temperature) / 2;

              if (this.chartConfig.type == "wind")
                this.weatherDates[i].y =
                  (this.weatherDates[i].y + weatherRecord.wind) / 2;

              if (this.chartConfig.type == "pressure")
                this.weatherDates[i].y =
                  (this.weatherDates[i].y + weatherRecord.pressure) / 2;

              if (this.chartConfig.type == "precipitation")
                this.weatherDates[i].y =
                  (this.weatherDates[i].y + weatherRecord.precipitation) / 2;
            }
          }
        }
      }
    }
  }

  /**
   * @desc init chart data for threeHours chart
   */
  initThreeHoursChartData() {
    let i = 1;
    for (let weatherRecord of this.weatherRecords) {
      if (this.containsDate(weatherRecord.date)) {
        let date = new Date(weatherRecord.date);
        let dateFormat =
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes();

        this.labels.push(dateFormat);

        if (this.chartConfig.type == "temperature")
          this.weatherDates.push({ x: i, y: weatherRecord.temperature });

        if (this.chartConfig.type == "wind")
          this.weatherDates.push({ x: i, y: weatherRecord.wind });

        if (this.chartConfig.type == "pressure")
          this.weatherDates.push({ x: i, y: weatherRecord.pressure });

        if (this.chartConfig.type == "precipitation")
          this.weatherDates.push({ x: i, y: weatherRecord.precipitation });
        i++;
      }
    }
  }

  parseDate(date) {
    var parts = date.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  containsDate(date) {
    let OneDayMS = 24 * 60 * 60 * 1000;
    let dateRecord = new Date(date).getTime();
    let dateTo =
      new Date(this.parseDate(this.chartConfig.period.to.value)).getTime() +
      OneDayMS;
    let dateFrom = new Date(
      this.parseDate(this.chartConfig.period.from.value)
    ).getTime();

    if (dateFrom <= dateRecord && dateTo >= dateRecord) return true;
    return false;
  }

  /**
   * @desc apply configs and generate chart
   */
  applyChartConfigs() {
    this.labels = [];
    this.weatherDates = [];

    if (this.chartConfig.interval == "daily") {
      this.initDailyChartData();
    } else if (this.chartConfig.interval == "threeHours") {
      this.initThreeHoursChartData();
    }

    if (this.chartConfig.type == "precipitation") {
      this.chart = this.generateChart("bar");
    } else {
      this.chart = this.generateChart("line");
    }
    this.chart.update();
  }

  /**
   * @desc change manually data for specific type
   * @param string type - value of type which is to change
   */
  changeData(type: String) {
    this.changeButtonColorCharts(type);
    // TODO: Use enum types
    this.chartConfig.type = type;
    this.applyChartConfigs();
    this.chart.update();
  }

  /**
   * @desc generate chart with specific type
   * @param string type - type of chart data
   */
  generateChart(type) {
    return new Chart(this.chartRef.nativeElement, {
      type: type,
      data: {
        labels: this.labels, // your labels array
        datasets: [
          {
            data: this.weatherDates, // your data array
            borderColor: "#00AEFF",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Zeit'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Zeit'
              }
            }
          ]
        }
      }
    });
  }

  /**
   * @desc change manually data for specific type
   */
  exportCSV() {
    console.log(this.weatherDates);
    const exportData = [];
    this.labels;
    for (let weatherDate of this.weatherDates) {
      //exportData.push({ date: this.chartConfig.period.dates[weatherDate.x - 1].value, value: weatherDate.y })
      exportData.push({
        date: this.labels[weatherDate.x - 1],
        value: weatherDate.y
      });
    }

    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workBook, workSheet, "data"); // add the worksheet to the book
    XLSX.writeFile(
      workBook,
      "climaviewer_export_" +
        this.chartConfig.type +
        "_" +
        new Date().getTime().toString() +
        ".csv"
    ); // initiate a file download in browser
  }
}
