import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.tokenValue) {
      this.router.navigate(['/events']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): any { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    const user: User = this.registerForm.value;

    this.authService.register(user).pipe(first()).subscribe( savedUser => {
      this.router.navigate(['/events']);
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }
}
