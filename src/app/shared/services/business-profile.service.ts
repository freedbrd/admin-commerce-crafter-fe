import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IBusinessProfile } from '../interfaces/business-profile.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {
  private readonly tableName = 'business_profiles'

  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  createBusinessProfile(data: IBusinessProfile) {
    return this.supabaseService.insertAndSelect<IBusinessProfile[]>(this.tableName, data, '*')
  }

  getBusinessProfiles() {
    return this.supabaseService.select<IBusinessProfile[]>(this.tableName)
  }

  getBusinessProfileById(id: string) {
    return this.supabaseService.selectById<IBusinessProfile>(this.tableName, id, 'id', 'services(*), resources(*)')
  }

  updateBusinessProfile(data: IBusinessProfile) {
    return this.supabaseService.update(this.tableName, data, data?.id)
  }

  deleteBusinessProfile(data: IBusinessProfile): Observable<null> {
    return this.supabaseService.delete(this.tableName, data?.id)
  }
}
