export interface PurchaseOrderItemDto {
  materialId: number;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CreatePurchaseOrderDto {
  siteId: number;
  vendorId: number;
  purchaseRequestId?: number;
  poNumber: string;
  items: PurchaseOrderItemDto[];
}