export interface IBusinessProfile {
  id: string;
  name: string;
  type: BusinessProfileType;
  active: boolean;
  currency: string;
  services: IProfileService[];
  resources: IProfileResource[]
  user_id: string;
}

export interface IProfileService {
  id: string;
  name: string;
  price: number;
  description: string;
  showcase_images: string[];
  main_image: string;
  active: boolean;
  business_profile_id: string;
  user_id: string;
  service_resource_ids: string[]
}

export enum BusinessProfileType {
  SERVICE = 'service',
  PRODUCT = 'product'
}


export interface IProfileResource {
  id: string; // Assuming 'id' is a number in your database
  created_at: Date; // Or string if you prefer to handle the conversion manually
  user_id: string; // UUID of the user who manages the resource
  business_profile_id: number; // The ID of the linked business profile
  name: string; // The name of the resource
  description: string; // A detailed description of the resource
  resource_type: string; // The type/category of the resource
  schedule: IResourceSchedule[]; // Array of schedules (assuming it's an array of objects)
  resource_images: string[]; // Array of image URLs
  active: boolean; // Indicates if the resource is currently active
}

export interface IResourceSchedule {
  dayOfWeek: number; // Or Date type, depending on how you want to handle dates
  timeslots: IResourceScheduleTimeslot[];
  label: string;
}

export interface IResourceScheduleTimeslot {
  startTime: string;
  endTime: string;
  id: string;
}
