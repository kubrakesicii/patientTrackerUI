import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/auth/models/userInfo.model';
import { AuthService } from 'src/app/auth/services/auth.service';
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
import { UpdateDoctor } from '../models/update-doctor.model';
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
  // filterText: string = "";

  //Lists
  hospitalList: Hospital[];
  countryList: Country[];
  cityList: City[];
  getCityList: GetCity[];
  districtList: District[];
  getDistrictList: GetDistrict[];
  doctorList: Doctor[];
  deptList: Department[];
  diseaseList: Disease[];
  degreeList: Degree[];

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

  updatedCountry: Country = new Country();
  updatedCity: City = new City();
  updatedDistrict: District = new District();
  updatedHospital: Hospital = new Hospital();

  updatedDoctorId: number;
  updatedDoctor: UpdateDoctor = new UpdateDoctor();
  updatedDept: Department = new Department();
  updatedDisease: Disease = new Disease();
  updatedDegree: Degree = new Degree();

  clickType: string = 'country';
  hospitalClickType: string = 'doctor';

  selectedHospitalId: any = 1;
  selectedHospitalName: any = 'Central Hospital';

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
      .getAllCities()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.cityList = x['$values']));

    await this.getService
      .getAllDistricts()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.getDistrictList = x['$values']));

    await this.getService
      .getAllDistricts()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.districtList = x['$values']));

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

    await this.getUserInfo();
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

  async updateCountry(countryId: number) {
    console.log(countryId);
    this.editMode = true;
    await this.getService
      .getCountryById(countryId)
      .then((data) => (this.updatedCountry = JSON.parse(JSON.stringify(data))));
  }
  saveCountry() {
    this.updateService
      .updateCountry(this.updatedCountry.id, this.updatedCountry)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelCountry() {
    this.editMode = false;
    this.updatedCountry = {
      id: 0,
      description: '',
      countryCode: '',
    };
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

  async updateCity(cityId: number) {
    this.editMode = true;
    await this.getService
      .getCityById(cityId)
      .then((data) => (this.updatedCity = JSON.parse(JSON.stringify(data))));
  }

  saveCity() {
    this.updateService
      .updateCity(this.updatedCity.id, this.updatedCity)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelCity() {
    this.editMode = false;
    this.updatedCity = {
      id: 0,
      description: '',
      countryId: 0,
    };
  }

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

  async updateDistrict(districtId: number) {
    this.editMode = true;
    await this.getService
      .getDistrictById(districtId)
      .then(
        (data) => (this.updatedDistrict = JSON.parse(JSON.stringify(data)))
      );
  }

  saveDistrict() {
    this.updateService
      .updateDistrict(this.updatedDistrict.id, this.updatedDistrict)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelDistrict() {
    this.editMode = false;
    this.updatedDistrict = {
      id: 0,
      description: '',
      cityId: 0,
    };
  }

  ////////

  addHospital() {
    this.postService.addHospital(this.hospitalModel).subscribe((data) => {
      this.hospitalModel = {
        id: 0,
        description: '',
        address: '',
        districtName: '',
        cityName: '',
        countryName: '',
        phone: '',
        districtId : 0,
        cityId : 0,
        countryId : 0
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

  async updateHospital(hospitalId: number) {
    this.editMode = true;
    await this.getService
      .getHospitalById(hospitalId)
      .then(
        (data) => (this.updatedHospital = JSON.parse(JSON.stringify(data)))
      );
  }

  saveHospital() {
    this.updateService
      .updateHospital(this.updatedHospital.id, this.updatedHospital)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelHospital() {
    this.editMode = false;
    this.updatedHospital = {
      id: 0,
      description: '',
      address: '',
      districtName: '',
      cityName: '',
      countryName: '',
      phone: '',
      districtId : 0,
      cityId : 0,
      countryId : 0
    }
  }

  ////////

  async getUserInfo() {
    await this.authService.getUserInfo().subscribe((data) => {
      this.userInfo.personType = JSON.parse(JSON.stringify(data)).personType;
      this.userInfo.fullName = JSON.parse(JSON.stringify(data)).fullName;
      this.userInfo.personId = JSON.parse(JSON.stringify(data)).id;
    });
  }

  async setHospital(hospitalId: number, hospitalName: string) {
    this.selectedHospitalId = hospitalId;

    this.selectedHospitalName = hospitalName;

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
    console.log(this.postDoctor);
    this.postService.addDoctor(this.postDoctor).subscribe((data) => {
      this.doctorModel = {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        gsm: '',
        departmentName: '',
        degreeName: '',
        departmentId: 0,
        degreeId: 0,
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

  async updateDoctor(doctorId: number) {
    this.editMode = true;
    await this.getService
      .getDoctorById(doctorId)
      .then(
        (data) =>
          (this.updatedDoctorId = JSON.parse(JSON.stringify(data))['id'])
      );
    await this.getService
      .getDoctorById(doctorId)
      .then((data) => (this.updatedDoctor = JSON.parse(JSON.stringify(data))));
  }

  saveDoctor() {
    console.log(this.updatedDoctor);
    this.updateService
      .updateDoctor(this.updatedDoctorId, this.updatedDoctor)
      .subscribe((data) => {
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelDoctor() {
    this.editMode = false;
    this.updatedDoctor = {
      firstName: '',
      lastName: '',
      email: '',
      gsm: '',
      departmentId: 0,
      degreeId: 0,
    };
  }

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

  async updateDepartment(deptId: number) {
    this.editMode = true;
    await this.getService
      .getDeptById(deptId)
      .then((data) => (this.updatedDept = JSON.parse(JSON.stringify(data))));
  }

  saveDept() {
    this.updateService
      .updateDepartment(this.updatedDept.id, this.updatedDept)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelDept() {
    this.editMode = false;
    this.updatedDept = {
      id: 0,
      description: '',
      hospitalId: 0,
    };
  }

  ////////

  addDisease() {
    this.postService.addDisease(this.diseaseModel).subscribe((data) => {
      this.diseaseModel = {
        id: 0,
        description: '',
        departmentName: '',
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

  async updateDisease(diseaseId: number) {
    this.editMode = true;
    await this.getService
      .getDiseaseById(diseaseId)
      .then((data) => (this.updatedDisease = JSON.parse(JSON.stringify(data))));
  }

  saveDisease() {
    this.updateService
      .updateDisease(this.updatedDisease.id, this.updatedDisease)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelDisease() {
    this.editMode = false;
    this.updatedDisease = {
      id: 0,
      description: '',
      departmentName: '',
      departmentId: 0,
    };
  }

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

  async updateDegree(degreeId: number) {
    this.editMode = true;
    await this.getService
      .getDegreeById(degreeId)
      .then((data) => (this.updatedDegree = JSON.parse(JSON.stringify(data))));
  }

  saveDegree() {
    this.updateService
      .updateDegree(this.updatedDegree.id, this.updatedDegree)
      .subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      });
    this.editMode = false;
  }
  cancelDegree() {
    this.editMode = false;
    this.updatedDegree = {
      id: 0,
      description: '',
    };
  }

  ////////

  async searchHospital(filterText : string){
    if(filterText == ""){
      await this.getService
      .getAllHospitals()
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((x) => (this.hospitalList = x['$values']));
    }
    this.hospitalList = this.hospitalList.filter(hosp => {
       if(hosp.description.toLowerCase().includes(filterText.toLowerCase()))
         return true;
       return false;
    })
  }

  ////////

  logout() {
    this.authService.logout(this.userInfo.personId);
  }
}
