export interface PurchaseRequestItem {
  materialId: number;
  quantity: number;
  remarks?: string;
}

export interface PurchaseRequest {
  id: number;
  site: {
    id: number;
    name: string;
  };
  status: string;
  createdAt: string;
  items: {
    id: number;
    material: {
      id: number;
      name: string;
    };
    quantity: number;
    remarks?: string;
  }[];
}

export interface CreatePurchaseRequestDto {
  siteId: number;
  items: PurchaseRequestItem[];
}