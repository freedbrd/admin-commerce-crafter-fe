import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import { ImageFilePickerComponent } from '../../../../shared/value-accessors/image-file-picker/image-file-picker.component';
import { MultiImageFilePickerComponent } from '../../../../shared/value-accessors/multi-image-file-picker/multi-image-file-picker.component';
import { TransferItemComponent } from '../../../../shared/value-accessors/transfer-item/transfer-item.component';

@Component({
  selector: 'app-profile-service-page',
  standalone: true,
  imports: [CommonModule, ZorroModule, ImageFilePickerComponent, MultiImageFilePickerComponent, TransferItemComponent],
  templateUrl: './profile-service-page.component.html',
  styleUrl: './profile-service-page.component.scss'
})
export class ProfileServicePageComponent implements OnInit {
  isLoading = false;

  mockArray = [
    {label: 'Test1', value: '123'},
    {label: 'Test2', value: '1233'},
  ]

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrectService();
  }

  private getCurrectService() {
    const {id} = this.activatedRoute.snapshot.params;
    

    if(id === 'new' || !id) {
      console.log('new');

      return;
    }

    console.log('get service')
  }

}
