import { Component, OnInit } from '@angular/core';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isMatch } from '../../../../shared/validators/is-match.validator';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { signup } from '../../../../shared/ngrx/auth/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ZorroModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {

    this.store.dispatch(signup({
      user: this.form.getRawValue()
    }))
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
    }, {validators: isMatch('password', 'checkPassword')})
  }
}
