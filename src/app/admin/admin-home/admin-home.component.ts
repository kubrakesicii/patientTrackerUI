import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { District } from '../models/district.model';
import { Hospital } from '../models/hospital.model';
import { AdminCountService } from '../services/admin-count.service';
import { AdminGetService } from '../services/admin-get.service';
import { AdminPostService } from '../services/admin-post.service';

let $: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private getService: AdminGetService,
    private countService: AdminCountService,
    private postService: AdminPostService
  ) {}

  countryCount: any;
  cityCount: any;
  countryid: any;

  districtCount: any;
  hospitalCount: any;
  doctorCount: any;
  deptCount: any;
  diseaseCount: any;

  hospitalList: any;
  countryList: any;
  cityList: City[];
  districtList: any;

  clickType: string = 'country';

  // Models
  countryModel: Country = new Country();
  cityModel: City = new City();
  districtModel: District = new District();
  hospitalModel: Hospital = new Hospital();

  ngOnInit(): void {
    this.loadCounters();
    // this.loadHospitalCounters();
    console.log(this.cityList);
  }

  selectCountry(event: Event) {}
  titleChange(event: Event) {
    let el = (event.target as Element).id;
    switch (el) {
      case 'country':
        this.clickType = 'country';
        break;
      case 'hospital':
        this.clickType = 'hospital';
        break;
      case 'district':
        this.clickType = 'district';
        break;
      case 'city':
        this.clickType = 'city';
        break;
    }
    console.log(this.clickType);
  }

  async loadCounters() {
    await this.countService
      .countCountries()
      .then((data) => (this.countryCount = data));
    await this.countService
      .countCities()
      .then((data) => (this.cityCount = data));
    await this.countService
      .countDistricts()
      .then((data) => (this.districtCount = data));
    await this.countService
      .countHospitals()
      .then((data) => (this.hospitalCount = data));
    await this.countService
      .countDoctors()
      .then((data) => (this.doctorCount = data));
    await this.countService.countDept().then((data) => (this.deptCount = data));
    //await this.adminHomeService.countDiseases().then(data => this.diseaseCount = data);

    await this.getService
      .getAllHospitals()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.hospitalList = x['$values']));

    await this.getService
      .getAllCountries()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.countryList = x['$values']));

    await this.getService
      .getAllCities()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.cityList = x['$values']));

    await this.getService
      .getAllDistricts()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.districtList = x['$values']));
  }

  async loadHospitalCounters() {
    await this.countService
      .countDoctors()
      .then((data) => (this.doctorCount = data));
    await this.countService.countDept().then((data) => (this.deptCount = data));
    //await this.adminHomeService.countDiseases().then(data => this.diseaseCount = data);
  }
}
