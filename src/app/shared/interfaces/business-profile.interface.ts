export interface IBusinessProfile {
  id: string;
  name: string;
  type: string;
  active: boolean;
  services: IProfileService[];
}

export interface IProfileService {
  id: string;
  name: string;
  price: number;
  description: string;
  portfolio: IServicePortfolio[];
  main_image: string;
  active: boolean;
  business_profile_id: string;
  user_id: string;
}

export interface IServicePortfolio {
  id: string;
  url: string;
  description: string;
}