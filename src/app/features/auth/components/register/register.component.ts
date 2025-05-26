import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);

  registerationForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor() {}

  onSubmit() {
    const { email, password } = this.registerationForm.value;
    this.authService.register(String(email), String(password)).subscribe({});
  }
}
