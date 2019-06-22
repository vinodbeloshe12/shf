import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../services/presence.service';
import { ProfileService } from '../services/profile.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.less']
})
export class LocationComponent implements OnInit {
  locationData: any;
  showForm: boolean = false;
  isEdit: boolean = false;
  countries: any;
  states: any;
  cities: any;
  formData: any = {};
  constructor(private presenceService: PresenceService, private profileService: ProfileService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllLocations();
    this.getCountries();
  }

  getAllLocations() {
    this.presenceService.getAllLocations().subscribe((res: any) => {
      this.locationData = res.india_location.concat(res.out_of_india_location);
      console.log("this.locationData ", this.locationData);
    }, err => console.log(err));
  }

  submitLocation(data) {
    console.log("data", data);
    this.presenceService.createLocation(data).subscribe((res: any) => {
      this.getAllLocations();
      this.toasterService.show("Location added successfully", "success");
      this.formData = {};
      this.showForm = false;
    }, err => console.log(err))
  }

  onEditSelect(data) {
    this.isEdit = true;
    this.formData = data;
    this.formData.id = data.id;
    this.showForm = true;
  }

  onButtonclick() {
    this.showForm = !this.showForm;
    this.formData = {};
    this.isEdit = false;
  }

  deleteLocation(data) {
    console.log("in delete", data);
    this.presenceService.deleteLocation(data.id).subscribe((res: any) => {
      this.getAllLocations();
      this.toasterService.show("Record deleted successfully", "success");
    },
      err => console.log(err))
  }

  getCountries() {
    this.profileService.getCountries().subscribe((res: any) => {
      if (res.value) {
        this.countries = res.data
      }
    }, err => console.log(err));
  }
  getStateByCountry(data) {
    this.profileService.getStateByCountry(data).subscribe((res: any) => {
      if (res.value) {

        this.states = res.data

      }
    }, err => console.log(err));
  }
  getCityByState(data) {
    console.log("state", data);
    this.profileService.getCityByState(data).subscribe((res: any) => {
      if (res.value) {

        this.cities = res.data

      }
    }, err => console.log(err));
  }

}
