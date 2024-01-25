import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzCardModule,
    NzIconModule,
    NzDropDownModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzCardModule,
    NzIconModule,
    NzDropDownModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
  ]
})
export class ZorroModule { }
