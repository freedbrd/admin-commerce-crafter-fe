import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../../shared/ngrx/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private store: Store
  ) {
  }

  logout() {
    this.store.dispatch(logout())
  }
}
