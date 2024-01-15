import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../shared/modules/zorro/zorro.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ZorroModule,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
