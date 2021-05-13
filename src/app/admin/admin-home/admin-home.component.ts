import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { GetCity } from '../models/get-city.model';
import { GetDistrict } from '../models/get-district.model';
import { Hospital } from '../models/hospital.model';
import { PostDoctor } from '../models/post-doctor.model';
import { AdminCountService } from '../services/admin-count.service';
import { AdminDeleteService } from '../services/admin-delete.service';
import { AdminGetService } from '../services/admin-get.service';
import { AdminPostService } from '../services/admin-post.service';
import { AdminUpdateService } from '../services/admin-update.service';

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
    private deleteService: AdminDeleteService,
    private authService: AuthService,
    private updateService: AdminUpdateService
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
  degreesCount: any;
  filterText: '';

  //Lists
  hospitalList: any;
  countryList: any;
  cityList: City[];
  getCityList: GetCity[];
  districtList: any;
  getDistrictList: GetDistrict[];
  doctorList: Doctor[];
  deptList: any;
  diseaseList: any;
  degreeList: any;

  //Models
  countryModel: Country = new Country();
  cityModel: City = new City();
  districtModel: District = new District();
  hospitalModel: Hospital = new Hospital();

  doctorModel: Doctor = new Doctor();
  postDoctor: PostDoctor = new PostDoctor();
  deptModel: Department = new Department();
  diseaseModel: Disease = new Disease();
  degreeModel: Degree = new Degree();

  clickType: string = 'country';
  hospitalClickType: string = 'doctor';

  selectedHospitalId: any = 1;
  selectedHospitalName: any = '';
  countryid: any;

  public editMode = false;

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
      case 'degree':
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
      .then((x) => (this.getCityList = x['$values']));

    await this.getService
      .getAllDistricts()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.getDistrictList = x['$values']));

    await this.getService
      .getAllDoctorsByHospital(this.selectedHospitalId)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.doctorList = x['$values']));

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

  ////////

  addCountry() {
    this.postService.addCountry(this.countryModel).subscribe((data) => {
      this.countryModel = {
        id: 0,
        description: '',
        countryCode: '',
      };
      this.ngOnInit();
    });
  }

  deleteCountry(countryId: number) {
    this.deleteService.deleteCountry(countryId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateCountry(countryId: number) {
    console.log(countryId);
    this.editMode = true;
    this.countryModel.id = countryId;
  }
  save() {
    this.updateService
      .updateCountry(this.countryModel.id, this.countryModel)
      .subscribe((data) => {
        console.log(data);
      });
  }
  cancel() {
    this.editMode = false;
  }
  saveHospital() {
    this.updateService
      .updateHospital(this.hospitalModel.id, this.hospitalModel)
      .subscribe((data) => {
        console.log(data);
      });
  }

  ////////

  addCity() {
    this.postService.addCity(this.cityModel).subscribe((data) => {
      this.cityModel = {
        id: 0,
        description: '',
        countryId: 0,
      };
      this.ngOnInit();
    });
  }

  deleteCity(cityId: number) {
    this.deleteService.deleteCity(cityId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateCity(cityId: number) {}

  ////////

  addDistrict() {
    this.postService.addDistrict(this.districtModel).subscribe((data) => {
      this.districtModel = {
        id: 0,
        cityId: 0,
        description: '',
      };
      this.ngOnInit();
    });
  }

  deleteDistrict(districtId: number) {
    this.deleteService.deleteDistrict(districtId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateDistrict(districtId: number) {}

  ////////

  addHospital() {
    this.postService.addHospital(this.hospitalModel).subscribe((data) => {
      this.hospitalModel = {
        id: 0,
        description: '',
        address: '',
        districtId: 0,
        phone: '',
      };
      this.ngOnInit();
    });
  }

  deleteHospital(hospitalId: number) {
    this.deleteService.deleteHospital(hospitalId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateHospital(hospitalId: number) {}

  ////////

  async getUserInfo() {
    await this.authService.getUserInfo().subscribe((data) => {
      this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
      this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    });
  }

  async setHospitalId(event: Event) {
    this.selectedHospitalId = (
      event.target as Element
    ).parentElement?.previousSibling?.previousSibling?.previousSibling?.textContent;

    this.selectedHospitalName = (
      event.target as Element
    ).parentElement?.previousSibling?.previousSibling?.textContent;

    await this.loadHospitalData(this.selectedHospitalId);
    this.ngOnInit();
  }

  async loadHospitalData(hospitalId: any) {
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
      .then((data) => (this.degreesCount = data));
  }

  async loadPageData() {
    await this.loadGeneralData();
    await this.loadHospitalData(this.selectedHospitalId);
  }

  ////////

  addDoctor() {
    this.postService.addDoctor(this.postDoctor).subscribe((data) => {
      this.doctorModel = {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        gsm: '',
        departmentName: '',
        degreeName: '',
      };
      this.ngOnInit();
    });
  }

  deleteDoctor(doctorId: number) {
    this.deleteService.deleteDoctor(doctorId).subscribe(() => {
      this.ngOnInit();
      //alertify
    });
  }

  updateDoctor(doctorId: number) {}

  ////////

  addDepartment() {
    this.deptModel.hospitalId = this.selectedHospitalId;
    this.postService.addDepartment(this.deptModel).subscribe((data) => {
      this.deptModel = {
        id: 0,
        description: '',
        hospitalId: 0,
      };
      this.ngOnInit();
    });
  }

  deleteDepartment(deptId: number) {
    this.deleteService.deleteDepartment(deptId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateDepartment(deptId: number) {}

  ////////

  addDisease() {
    this.postService.addDisease(this.diseaseModel).subscribe((data) => {
      this.diseaseModel = {
        id: 0,
        description: '',
        departmentId: 0,
      };
      this.ngOnInit();
    });
  }

  deleteDisease(diseaseId: number) {
    this.deleteService.deleteDisease(diseaseId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateDisease(diseaseId: number) {}

  /////////

  addDegree() {
    this.postService.addDegree(this.degreeModel).subscribe((data) => {
      this.degreeModel = {
        id: 0,
        description: '',
      };
      this.ngOnInit();
    });
  }

  deleteDegree(degreeId: number) {
    this.deleteService.deleteDegree(degreeId).subscribe(() => {
      this.ngOnInit();
      //alert
    });
  }

  updateDegree(degreeId: number) {}

  ////////

  logout() {
    this.authService.logout(this.userInfo.personId);
  }
}
