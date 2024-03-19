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

  editService(profileService: IProfileService, imagesToDelete: string[] = []) {
    return this.http.put(`${environment.backendAPI}/api/service`, {
      profileService,
      imagesToDelete
    })
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
