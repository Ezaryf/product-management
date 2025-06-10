import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
    form: ReturnType<FormBuilder['group']>;
    error = '';

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        const { username, password } = this.form.value;
        this.auth.login(username!, password!).subscribe({
            next: () => this.router.navigate(['/home']),
            error: err => this.error = err.error?.message || 'Login failed'
        });
    }
}