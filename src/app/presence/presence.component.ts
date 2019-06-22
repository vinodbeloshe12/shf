import { Component, OnInit } from '@angular/core';
import { PresenceService } from 'src/app/services/presence.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.less']
})
export class PresenceComponent implements OnInit {
  location_india: any;
  location_outside_india: any;
  selectedCity = [];
  rowIndex: any;
  selectedIndex: any;
  selectedCityOutside = [];
  rowIndexOutside: any;
  selectedIndexOutside: any;

  constructor(private presenceService: PresenceService) { }

  ngOnInit() {
    this.getAllLocations();
  }

  getSelectedCityData(parentindex, index) {
    this.rowIndex = parentindex;
    this.selectedIndex = index;
    this.selectedCity = this.location_india[parentindex][index].locations;
    console.log("rooow", this.rowIndex, this.selectedCity);
  }
  getSelectedCityDataOutside(parentindex, index) {
    this.rowIndexOutside = parentindex;
    this.selectedIndexOutside = index;
    this.selectedCityOutside = this.location_outside_india[parentindex][index].locations;
    console.log("rooow", this.rowIndex, this.selectedCity);
  }

  getAllLocations() {
    this.presenceService.getAllLocations().subscribe((res: any) => {
      if (res.value) {
        this.location_india = _.chunk(_(res.india_location).groupBy('city').map(function (items, city) {
          return {
            city: city,
            locations: _.map(items)
          };
        }).value(), 4);
        this.location_outside_india = _.chunk(_(res.out_of_india_location).groupBy('city').map(function (items, city) {
          return {
            city: city,
            locations: _.map(items)
          };
        }).value(), 4);;
        // this.location_outside_india = res.out_of_india_location;
        console.log("this.location_india", this.location_india);
      }
    }, err => console.log(err));
  }
  closeMobileModel() {
    this.selectedCity = [];
    this.rowIndex = -1;
  }
}
