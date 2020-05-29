import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    hiddenNavbar = true;
    login = false;
    user = {};
    constructor() { }
}