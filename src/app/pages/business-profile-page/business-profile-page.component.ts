import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-business-profile-page',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './business-profile-page.component.html',
  styleUrl: './business-profile-page.component.scss'
})
export class BusinessProfilePageComponent {

}
