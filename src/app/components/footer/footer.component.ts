import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CityService } from 'src/app/service/city.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private cityService: CityService,
    private userService: ClientService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getCities();
    this.getUsers();
  }

  loginUser: any = {
    documentnumber: '',
    password: ''
  };

  users: any = [];

  roles: any = [];

  getUsers() {
    this.userService.getClient().subscribe(data => {
      this.users = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.users.forEach(user => {
        this.cities.forEach(ciudad => {
          if (user.city_id === ciudad.id) {
            user.city_id = ciudad.name;
          }
        });
        this.roles.forEach(rol => {
          if (user.rol_id === rol.id) {
            user.rol_id = rol.name;
          }
        });
      });
    });
  }

  userRegister: any = {
    name: '',
    lastname: '',
    documenttype: '1',
    documentnumber: '',
    gender: '1',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 3,
    city_id: 1,
    admissiondate: '',
    id: 0
  };

  cities: any = [];

  getCities() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  saveUser() {

    this.cities.forEach(element => {
      if (element.name === this.userRegister.city_id) {
        this.userRegister.city_id = element.id;
      }
    });

    this.roles.forEach(element => {
      if (element.name === this.userRegister.rol_id) {
        this.userRegister.rol_id = element.id;
      }
    });

    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.userRegister.name);
    postObject.append('lastname', this.userRegister.lastname);
    postObject.append('documenttype', this.userRegister.documenttype);
    postObject.append('documentnumber', this.userRegister.documentnumber);
    postObject.append('gender', this.userRegister.gender);
    postObject.append('age', this.userRegister.age);
    postObject.append('birthdate', this.userRegister.birthdate);
    postObject.append('points', '0');
    postObject.append('password', this.userRegister.password);
    postObject.append('rol_id', this.userRegister.rol_id);
    postObject.append('city_id', this.userRegister.city_id);
    postObject.append('admissiondate', today);
    postObject.append('id', this.userRegister.id);
    this.userService.saveClient(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.userRegister);
      if (res.code === '1') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se registro satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '2') {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops! no se pudo registrar',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (res.code === '3') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Oops! resulto un problema',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  clear() {
    this.userRegister = {
      name: '',
      lastname: '',
      documenttype: 1,
      documentnumber: '',
      gender: 1,
      age: 0,
      birthdate: '',
      points: 0,
      password: '',
      rol_id: 1,
      city_id: 1,
      admissiondate: '',
    }
  }

}

