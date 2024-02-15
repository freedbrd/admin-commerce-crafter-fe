export interface IBusinessProfile {
  id: string;
  name: string;
  type: BusinessProfileType;
  active: boolean;
  currency: string;
  services: IProfileService[];
  serviceResources: IServiceResource[]
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
