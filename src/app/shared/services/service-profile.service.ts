import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IProfileService } from '../interfaces/business-profile.interface';
import { of, switchMap } from 'rxjs';
import {
  extractSupabaseFolders
} from '../helpers/is-supabase-image-url.helper';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfileService {
  constructor(
    private supabaseService: SupabaseService,
    private http: HttpClient
  ) {
  }

  deleteService(profileService: IProfileService) {
    return this.http.delete(`${environment.backendAPI}/api/service/${profileService?.id}`, {
      body: profileService
    })
  }

  createService(profileService: IProfileService) {
    return this.http.post(`${environment.backendAPI}/api/service`, profileService)
  }

  editService(profileService: IProfileService, mainImage: Blob, showCaseImages: Blob[], userId: string) {
    let folderPath = `${userId}/${profileService?.business_profile_id}/${profileService?.id}`;
    let mainImagePath = '';

    return (mainImage ? this.uploadMainImage(folderPath, mainImage) : of(null)).pipe(
      switchMap((mainImageList) => {
        const [mainImageResult] = mainImageList || [];
        mainImagePath = mainImageResult?.fileUrl
        return showCaseImages?.length ? this.uploadMultipleImages(folderPath, showCaseImages) : of(null)
      }),
      switchMap((images) => {
        const imagesUrl = images?.map(item => item?.fileUrl) || [];
        const showcaseImageSupabaseUrls = profileService?.showcase_images?.filter(item => !!extractSupabaseFolders(item))
        const showcaseImages = showcaseImageSupabaseUrls?.length
          ? [...showcaseImageSupabaseUrls, ...imagesUrl]
          : imagesUrl

        const updatedProfileService: IProfileService = {
          ...profileService,
          main_image: mainImagePath || profileService?.main_image,
          showcase_images: showcaseImages,
          id: profileService?.id
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
