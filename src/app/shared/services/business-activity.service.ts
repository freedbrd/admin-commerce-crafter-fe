import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { IProfileService } from "../interfaces/business-profile.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BusinessActivityService {
    private readonly tableName = 'services';

    constructor(
        private supabaseService: SupabaseService,
    ) {
    }

    createBusinessActivity(data: IProfileService) {
        return this.supabaseService.insertAndSelect<IProfileService[]>(this.tableName, data, '*')
    }

    getBusinessActivities() {
        return this.supabaseService.select<IProfileService[]>(this.tableName)
    }

    getBusinessActivityById(id: string) {
        return this.supabaseService.selectById<IProfileService>(this.tableName, id, 'id')
    }

    updateBusinessActivity(data: IProfileService) {
        return this.supabaseService.update(this.tableName, data, data?.id)
    }

    deleteBusinessActivity(id: string): Observable<null> {
        return this.supabaseService.delete(this.tableName, id)
    }
}
