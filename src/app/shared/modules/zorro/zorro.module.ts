import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzCardModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzCardModule,
  ]
})
export class ZorroModule { }
