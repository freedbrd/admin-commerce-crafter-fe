import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../../shared/ngrx/auth/auth.actions';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import { Observable } from 'rxjs';
import { selectProfileName } from '../../../../shared/ngrx/auth/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  profileName$: Observable<string>;

  constructor(
    private store: Store
  ) {
    this.profileName$ = this.store.select(selectProfileName);
  }

  logout() {
    this.store.dispatch(logout())
  }
}
