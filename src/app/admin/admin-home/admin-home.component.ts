import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { District } from '../models/district.model';
import { Hospital } from '../models/hospital.model';
import { AdminHomeService } from './admin-home.service';
let $: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private adminHomeService: AdminHomeService) {}

  countryCount: any;
  cityCount: any;
  districtCount: any;
  hospitalCount: any;
  doctorCount: any;
  deptCount: any;
  diseaseCount: any;

  hospitalList: any;
  countryList: any;
  cityList: any;
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
  }

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
    await this.adminHomeService
      .countCountries()
      .then((data) => (this.countryCount = data));
    await this.adminHomeService
      .countCities()
      .then((data) => (this.cityCount = data));
    await this.adminHomeService
      .countDistricts()
      .then((data) => (this.districtCount = data));
    await this.adminHomeService
      .countHospitals()
      .then((data) => (this.hospitalCount = data));
    await this.adminHomeService
      .countDoctors()
      .then((data) => (this.doctorCount = data));
    await this.adminHomeService
      .countDept()
      .then((data) => (this.deptCount = data));
    //await this.adminHomeService.countDiseases().then(data => this.diseaseCount = data);

    await this.adminHomeService
      .getAllHospitals()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.hospitalList = x['$values']));

    await this.adminHomeService
      .getAllCountries()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.countryList = x['$values']));

    await this.adminHomeService
      .getAllCities()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.cityList = x['$values']));

    await this.adminHomeService
      .getAllDistricts()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.districtList = x['$values']));
  }

  async loadHospitalCounters() {
    await this.adminHomeService
      .countDoctors()
      .then((data) => (this.doctorCount = data));
    await this.adminHomeService
      .countDept()
      .then((data) => (this.deptCount = data));
    //await this.adminHomeService.countDiseases().then(data => this.diseaseCount = data);
  }
}
