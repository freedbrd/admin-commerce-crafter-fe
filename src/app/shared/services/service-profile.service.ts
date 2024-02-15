import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IProfileService } from '../interfaces/business-profile.interface';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfileService {
  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  createService(profileService: IProfileService, mainImage: Blob, showCaseImages: Blob[], userId: string) {
    let folderPath = '';
    let mainImagePath = '';
    let savedProfileService: IProfileService;

    return this.supabaseService.insertAndSelect<IProfileService[]>('services', profileService, '*').pipe(
      switchMap((profileService) => {
        [savedProfileService] = profileService || [];
        folderPath = `${userId}/${savedProfileService.business_profile_id}/${savedProfileService.id}`;

        return this.uploadMainImage(
          folderPath,
          mainImage
        )
      }),
      switchMap((mainImageList) => {
        const [mainImageResult] = mainImageList || [];
        mainImagePath = mainImageResult.fileUrl
        return this.uploadMultipleImages(folderPath, showCaseImages)
      }),
      switchMap(images => {
        const imagesUrl = images.map(item => item?.fileUrl)

        const updatedProfileService: IProfileService = {
          main_image: mainImagePath,
          showcase_images: imagesUrl,
          id: savedProfileService.id
        } as IProfileService;

        return this.updateService(updatedProfileService)
      })
    )
  }

  updateService(profileService: IProfileService) {
    return this.supabaseService.update('services', profileService, profileService?.id)
  }

  uploadMainImage(filePath: string, blobFile: Blob) {
    return this.supabaseService.uploadImages(filePath, 'main',[blobFile], 'assets/')
  }

  uploadMultipleImages(filePath: string, blobFiles: Blob[]) {
    return this.supabaseService.uploadImages(filePath, '', blobFiles, 'assets/')
  }
}
