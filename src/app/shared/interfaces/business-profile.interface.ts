export interface IBusinessProfile {
  id: string;
  name: string;
  type: BusinessProfileType;
  active: boolean;
  currency: string;
  services: IProfileService[];
  serviceResources: IServiceResource[],
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

export interface IServiceShowcaseImage {
  id: string;
  url: string;
  description: string;
}

export interface IServiceResource {
  id: string;
  name: string;
  type: string;
  availability: IResourceAvailability[];
  description: string;
  image_url: string;
  role: string;
}

export interface IResourceAvailability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
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
  date: string; // Or Date type, depending on how you want to handle dates
  startTime: string; // Could also be a Date type or a string in 'HH:mm:ss' format
  endTime: string; // Same as startTime
}
