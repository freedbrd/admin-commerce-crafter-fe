import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IProfileService } from "../../interfaces/business-profile.interface";

export interface BusinessProfileServiceState extends EntityState<IProfileService> {
    currentBusinessProfileService: IProfileService | null
}

export const profileServiceAdapter: EntityAdapter<IProfileService> = createEntityAdapter<IProfileService>({
    selectId: (data: IProfileService) => data.id,
    sortComparer: (a: IProfileService, b: IProfileService) => a.name.localeCompare(b.name),
});

export const initialProfileServiceState: BusinessProfileServiceState = profileServiceAdapter.getInitialState({
    currentBusinessProfileService: null
})