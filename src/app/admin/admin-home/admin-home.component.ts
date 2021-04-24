import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { District } from '../models/district.model';
import { Hospital } from '../models/hospital.model';
import { AdminCountService } from '../services/admin-count.service';
import { AdminGetService } from '../services/admin-get.service';
import { AdminPostService } from '../services/admin-post.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private getService: AdminGetService,
              private countService : AdminCountService,
              private postService : AdminPostService,
              private alertifyService : AlertifyService,
              private authService : AuthService) {}

  userInfo : UserInfo = new UserInfo();
  
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

  hospitalId : any = 1;
  hospitalClickType : string = 'doctor';

  // Models
  countryModel: Country = new Country();
  cityModel: City = new City();
  districtModel: District = new District();
  hospitalModel: Hospital = new Hospital();

  ngOnInit(): void {
    this.getUserInfo();
    this.loadCounters();
    console.log(this.cityList);
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

  addCountry(event : Event){
    this.postService.addCountry(this.countryModel).subscribe(data => {
        this.ngOnInit();
        this.alertifyService.success("Country is Added!")
    });
  }

  addCity(){
    this.postService.addCity(this.cityModel).subscribe(data => {
      this.ngOnInit();
      this.alertifyService.success("City is Added!")
    })
  }

  addDistrict(){
    this.postService.addDistrict(this.districtModel).subscribe(data => {
      this.ngOnInit();
      this.alertifyService.success("District is Added!")
    })
  }

  async getUserInfo() {
    await this.authService.getUserInfo().subscribe(data => {
        this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
        this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
        this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    })
  }

  async setHospitalId(event : Event){
    this.hospitalId = (event.target as Element).parentElement?.previousSibling?.previousSibling?.previousSibling?.textContent;

    await this.loadHospitalCounters();

  }

  async loadHospitalCounters() {
    await this.countService
      .countDoctors(this.hospitalId)
      .then((data) => (this.doctorCount = data));
    await this.countService
      .countDept(this.hospitalId)
      .then((data) => (this.deptCount = data));
    await this.countService
      .countDiseases(this.hospitalId)
      .then(data => this.diseaseCount = data);
  }

  hospTitleChange(event: Event) {
    let el = (event.target as Element).id;
    switch (el) {
      case 'doctor':
        this.clickType = 'doctor';
        break;
      case 'department':
        this.clickType = 'department';
        break;
      case 'disease':
        this.clickType = 'disease';
        break;
    }
    console.log(this.hospitalClickType);
  }





}
