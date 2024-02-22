import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IProfileService } from '../interfaces/business-profile.interface';
import { of, switchMap } from 'rxjs';

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

        return mainImage ? this.uploadMainImage(
          folderPath,
          mainImage
        ) : of(null)
      }),
      switchMap((mainImageList) => {
        const [mainImageResult] = mainImageList || [];
        mainImagePath = mainImageResult?.fileUrl
        return showCaseImages?.length ? this.uploadMultipleImages(folderPath, showCaseImages) : of(null)
      }),
      switchMap(images => {
        const imagesUrl = images?.map(item => item?.fileUrl)

        if(!mainImagePath && !imagesUrl) {
          return of(null)
        }


        const updatedProfileService: IProfileService = {
          main_image: mainImagePath || '',
          showcase_images: imagesUrl || [],
          id: savedProfileService.id
        } as IProfileService;

        return this.updateService(updatedProfileService)
      })
    )
  }

  editService(profileService: IProfileService, mainImage: Blob, showCaseImages: Blob[], userId: string) {
    let folderPath = `${userId}/${profileService.business_profile_id}/${profileService.id}`;
    let mainImagePath = '';

    return (mainImage ? this.uploadMainImage(folderPath, mainImage) : of(null)).pipe(
      switchMap((mainImageList) => {
        const [mainImageResult] = mainImageList || [];
        mainImagePath = mainImageResult?.fileUrl
        return showCaseImages?.length ? this.uploadMultipleImages(folderPath, showCaseImages) : of(null)
      }),
      switchMap((images) => {
        const imagesUrl = images?.map(item => item?.fileUrl)

        const updatedProfileService: IProfileService = {
          ...profileService,
          main_image: mainImagePath || profileService?.main_image,
          showcase_images: imagesUrl || profileService?.showcase_images || [],
          id: profileService.id
        } as IProfileService;

        return this.updateService(updatedProfileService)
      })
    )
  }

  getProfileServiceById(serviceId: string) {
    return this.supabaseService.selectById<IProfileService>('services', serviceId)
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

  removeImages(imageUrls: string[]) {
    return this.supabaseService.removeImages(`assets`, imageUrls)
  }
}
