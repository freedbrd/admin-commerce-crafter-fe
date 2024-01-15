import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
  ]
})
export class ZorroModule { }
