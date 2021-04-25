import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertifyService } from 'src/app/shared-components/services/alertify.service';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { Degree } from '../models/degree.model';
import { Department } from '../models/department.model';
import { Disease } from '../models/disease.model';
import { District } from '../models/district.model';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { PostDoctor } from '../models/post-doctor.model';
import { AdminCountService } from '../services/admin-count.service';
import { AdminGetService } from '../services/admin-get.service';
import { AdminPostService } from '../services/admin-post.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private getService: AdminGetService,
    private countService: AdminCountService,
    private postService: AdminPostService,
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) {}

  userInfo: UserInfo = new UserInfo();

  //Counts
  countryCount: any;
  cityCount: any;
  districtCount: any;
  hospitalCount: any;
  doctorCount: any;
  deptCount: any;
  diseaseCount: any;
  degreesCount : any;

  //Lists
  hospitalList: any;
  countryList: any;
  cityList: City[];
  districtList: any;
  doctorList : Doctor[];
  deptList : any;
  diseaseList : any;
  degreeList : any;


//Models
  countryModel: Country = new Country();
  cityModel: City = new City();
  districtModel: District = new District();
  hospitalModel: Hospital = new Hospital();

  doctorModel : Doctor = new Doctor();
  postDoctor : PostDoctor = new PostDoctor();
  deptModel : Department = new Department();
  diseaseModel : Disease = new Disease();
  degreeModel : Degree = new Degree();

  
  clickType: string = 'country';
  hospitalClickType: string = 'doctor';

  selectedHospitalId: any = 1;
  selectedHospitalName : any ="";
  countryid: any;


  ngOnInit(): void {
    this.loadPageData();

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

  hospTitleChange(event: Event) {
    let el = (event.target as Element).id;
    switch (el) {
      case 'doctor':
        this.hospitalClickType = 'doctor';
        break;
      case 'department':
        this.hospitalClickType = 'department';
        break;
      case 'disease':
        this.hospitalClickType = 'disease';
        break;
      case 'degree' :
        this.hospitalClickType = 'degree';
        break;
    }
    console.log(this.hospitalClickType);
  }

  async loadGeneralData() {
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

      await this.getService
      .getAllDoctorsByHospital(this.selectedHospitalId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => this.doctorList = x['$values']);

      await this.getService
      .getAllDeptsByHospital(this.selectedHospitalId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.deptList = x['$values']));

      await this.getService
      .getAllDiseasesByHospital(this.selectedHospitalId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.diseaseList = x['$values']));

      await this.getService
      .getAllDegrees()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.degreeList = x['$values']));

  }

  addCountry(event: Event) {
    this.postService.addCountry(this.countryModel).subscribe((data) => {
      this.ngOnInit();
      this.alertifyService.success('Country is Added!');
    });
  }

  addCity() {
    this.postService.addCity(this.cityModel).subscribe((data) => {
      this.ngOnInit();
      this.alertifyService.success('City is Added!');
    });
  }

  addDistrict() {
    this.postService.addDistrict(this.districtModel).subscribe((data) => {
      this.ngOnInit();
      this.alertifyService.success('District is Added!');
    });
  }

  async getUserInfo() {
    await this.authService.getUserInfo().subscribe((data) => {
      this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
      this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    });
  }

  async setHospitalId(event: Event) {
    this.selectedHospitalId = (event.target as Element).parentElement?.previousSibling?.previousSibling?.previousSibling?.textContent;

    this.selectedHospitalName = (event.target as Element).parentElement?.previousSibling?.previousSibling?.textContent;

    await this.loadHospitalData(this.selectedHospitalId);
    this.ngOnInit();
  }

  async loadHospitalData(hospitalId : any) {
    await this.countService
      .countDoctors(hospitalId)
      .then((data) => (this.doctorCount = data));
    await this.countService
      .countDept(hospitalId)
      .then((data) => (this.deptCount = data));
    await this.countService
      .countDiseases(hospitalId)
      .then((data) => (this.diseaseCount = data));
    await this.countService
      .countDegrees()
      .then(data => this.degreesCount = data);
  }

  async loadPageData(){
    await this.loadGeneralData();
    await this.loadHospitalData(this.selectedHospitalId);
  }

  addDoctor(){
    this.postService.addDoctor(this.postDoctor).subscribe((data) => {
      this.ngOnInit();
      this.alertifyService.success('Doctor is Added!');
    });
  }

  addDepartment(){
    this.deptModel.hospitalId = this.selectedHospitalId;
    this.postService.addDepartment(this.deptModel).subscribe(data => {
      this.ngOnInit();
      this.alertifyService.success('Department is Added!');
    });
  }

  addDisease(){
    this.postService.addDisease(this.diseaseModel).subscribe(data => {
      this.ngOnInit();
      this.alertifyService.success('Disease is Added!');
    });
  }

  addDegree(){
    console.log("Degree added");
    this.postService.addDegree(this.degreeModel).subscribe(data => {
      this.ngOnInit();
      this.alertifyService.success('Degree is Added!');
    });
  }

}
