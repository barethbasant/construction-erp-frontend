export interface Site {
  id: number;
  code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSiteDto {
  code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isActive: boolean;
}