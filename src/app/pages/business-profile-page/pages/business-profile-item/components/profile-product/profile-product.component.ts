import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-product',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    RouterModule
  ],
  templateUrl: './profile-product.component.html',
  styleUrl: './profile-product.component.scss'
})
export class ProfileProductComponent {
  productMock = [
    {
      id: 1,
      title: 'Product 1',
      price: 55,
      category: 'cat 1',
      active: true
    }
  ]
}
