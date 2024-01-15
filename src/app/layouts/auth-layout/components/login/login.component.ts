import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../../shared/ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ZorroModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    const {email, password} = this.form.getRawValue();

    this.store.dispatch(login({
      email,
      password
    }))
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    })
  }
}
