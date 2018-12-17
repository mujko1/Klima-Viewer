import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private locationService: LocationService) { }


  addLocation(){
    console.log("I try to save");
    this.locationService.addLocation("New York", 3456, "asdas")
  }

  ngOnInit() {
  }

}
