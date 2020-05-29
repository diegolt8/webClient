import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/service/client.service';
import { CityService } from 'src/app/service/city.service';
import { StorageService } from 'src/app/service/storage.service';
import { LoginService } from 'src/app/service/login.service';

declare let $: any;

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  @ViewChild('modalEdit') modalEdit: ElementRef;

  constructor(private router: Router, private clientService: ClientService,
    private cityService: CityService, private storageService: StorageService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCities();
    this.getClient();
    this.getEmployee();
  }

  FilterPipeUser: any = '';

  actualPage = 1;

  user: any = {
    name: '',
    lastname: '',
    documenttype: '',
    documentnumber: '',
    gender: '',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 3,
    city_id: 0,
    admissiondate: '',
    id: 0
  };

  userEdit: any = {
    name: '',
    lastname: '',
    documenttype: '',
    documentnumber: '',
    gender: '',
    age: 0,
    birthdate: '',
    points: 0,
    password: '',
    rol_id: 0,
    city_id: 0,
    admissiondate: '',
    id: 0
  };

  loginUser: any = {
    documentnumber: '',
    password: ''
  };

  failLogin = false;

  sales: any = [];

  clients: any = [];

  newPassword: any = '';

  employees: any = [];

  cities: any = [];

  getEmployee() {
    this.clientService.getUser().subscribe(data => {
      this.employees = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  getClient() {
    this.clientService.getClient().subscribe(data => {
      this.clients = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.clients.forEach(client => {
        this.cities.forEach(city => {
          if (client.city_id === city.id) {
            client.city_id = city.name;
          }
        });
        this.employees.forEach(employee => {
          if (client.employee_id === employee.id) {
            client.employee_id = employee.name;
          }
        });
      });
      console.log(this.clients);
      console.log(this.cities);
    });
  }

  getSales(id: any) {
    this.clientService.getHistory(id).subscribe(data => {
      console.log(this.employees);
      this.sales = JSON.parse(JSON.parse(JSON.stringify(data)).data);
      this.sales.forEach(sale => {
        this.clients.forEach(client => {
          if (sale.client_id === client.id) {
            sale.client_id = client.name;
          }
        });
        this.employees.forEach(employee => {
          if (sale.employee_id === employee.id) {
            sale.employee_id = employee.name;
          }
        });
      });
    });
  }

  signUp() {
    this.clients.forEach(async element => {
      if (element.documentnumber === this.loginUser.documentnumber) {
        Object.assign(element, { passwordLogin: this.loginUser.password, ...element });
        const pass = await this.clientService.login(element);
        if (pass) {
          this.failLogin = true;
          this.storageService.login = true;
          this.loginService.user = element;
          this.storageService.setCurrentSession(element);
          $(this.modalEdit.nativeElement).modal('show');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Revisa de nuevo tus credenciales!',
          });
        }
      }
    });
  }


  getCities() {
    this.cityService.getCity().subscribe(data => {
      this.cities = JSON.parse(JSON.parse(JSON.stringify(data)).data);
    });
  }

  findClient(id: string) {
    for (const c of this.clients) {
      if (c.id === id) {
        this.userEdit = c;
      }
    }
  }
  saveClient() {
    this.cities.forEach(element => {
      if (element.name === this.user.city_id) {
        this.user.city_id = element.id;
      }
    });

    const dateNow = new Date();
    const dd = String(dateNow.getDate()).padStart(2, '0');
    const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
    const yyyy = dateNow.getFullYear();

    const today = yyyy + '-' + mm + '-' + dd;

    const postObject = new FormData();

    postObject.append('action', 'save');
    postObject.append('name', this.user.name);
    postObject.append('lastname', this.user.lastname);
    postObject.append('documenttype', this.user.documenttype);
    postObject.append('documentnumber', this.user.documentnumber);
    postObject.append('gender', this.user.gender);
    postObject.append('age', this.user.age);
    postObject.append('birthdate', this.user.birthdate);
    postObject.append('points', this.user.points);
    postObject.append('password', this.user.password);
    postObject.append('rol_id', this.user.rol_id);
    postObject.append('city_id', this.user.city_id);
    postObject.append('admissiondate', today);
    postObject.append('id', this.user.id);
    this.clientService.saveClient(postObject).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se registró satisfactoriamente'
        })
        this.getClient();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo registrar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  editClient() {
    const postObject = new FormData();

    this.cities.forEach(element => {
      if (element.name === this.userEdit.city_id) {
        this.userEdit.city_id = element.id;
      }
    });

    let modifica = false;

    if (this.newPassword !== '') {
      modifica = true;
      this.userEdit.password = this.newPassword;
    }

    postObject.append('action', 'update');
    postObject.append('name', this.userEdit.name);
    postObject.append('lastname', this.userEdit.lastname);
    postObject.append('documenttype', this.userEdit.documenttype);
    postObject.append('documentnumber', this.userEdit.documentnumber);
    postObject.append('gender', this.userEdit.gender);
    postObject.append('age', this.userEdit.age);
    postObject.append('birthdate', this.userEdit.birthdate);
    postObject.append('points', this.userEdit.points);
    postObject.append('password', this.userEdit.password);
    postObject.append('rol_id', this.userEdit.rol_id);
    postObject.append('city_id', this.userEdit.city_id);
    postObject.append('admissiondate', this.userEdit.admissiondate);
    postObject.append('id', this.userEdit.id);
    postObject.append('modifica', modifica.toString());

    this.clientService.editClient(postObject).subscribe(data => {
      let res: any;
      res = data;
      console.log(this.user);
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se editó satisfactoriamente'
        })
        this.getClient();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo editar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  deleteClient() {
    this.clientService.deleteClient(this.userEdit.id).subscribe(data => {
      let res: any;
      res = data;
      if (res.code === '1') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Se eliminó satisfactoriamente'
        })
        this.getClient();
      } else if (res.code === '2') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo eliminar'
        })
      } else if (res.code === '3') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Oops! resulto un problema'
        })
      }
    });
  }

  clear() {
    this.user = {
      name: '',
      lastname: '',
      documenttype: 1,
      documentnumber: '',
      gender: 1,
      age: 0,
      birthdate: '',
      points: 0,
      password: '',
      rol_id: 3,
      city_id: 1,
      admissiondate: '',
    }
  }

  clearSales() {
    this.sales = [];
  }

}


