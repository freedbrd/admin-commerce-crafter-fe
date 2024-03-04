import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IProfileResource } from '../interfaces/business-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileResourceService {
  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  createProfileResource(resource: IProfileResource) {
    return this.supabaseService.insertAndSelect('resources', resource, '*')
  }

  getProfileResourceById(id: string) {
    return this.supabaseService.selectById<IProfileResource>('resources', id)
  }

  editProfileResource(profileResource: IProfileResource) {
    return this.supabaseService.update('resources', profileResource, profileResource?.id)
  }

  removeProfileResource(id: string) {
    return this.supabaseService.delete('resources', id)
  }
}
