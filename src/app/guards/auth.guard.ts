import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): boolean {
		const token = localStorage.getItem('authToken');
		const expiry = localStorage.getItem('tokenExpiry');
		if (token && expiry && new Date(expiry) > new Date()) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}
}