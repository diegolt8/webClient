import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class StorageService {
    localStorageService;
    currentSession: any = null;
    login = false;

    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: any): void {
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
    }

    loadSessionData(): any {
        const sessionStr = this.localStorageService.getItem('currentUser');
        return (sessionStr) ? JSON.parse(sessionStr) as any : null;
    }

    getCurrentSession() {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
    }

    getCurrentUser(): any {
        const session: any = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }

    isAuthenticated(): boolean {
        return (this.getCurrentSession() != null) ? true : false;
    }

    getCurrentToken(): string {
        const session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }

    logout(): void {
        if (this.isAuthenticated()) {
            this.removeCurrentSession();
            this.router.navigate(['login']);
        } else {
            this.router.navigate(['home']);
        }
    }
}