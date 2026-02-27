import api from "../../../lib/axios";
import type { CreatePurchaseRequestDto, PurchaseRequest } from "../../../types/purchaseRequest";

const BASE_URL = "/features/purchase-request";

export const getPurchaseRequests = async (): Promise<PurchaseRequest[]> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createPurchaseRequest = async (
  data: CreatePurchaseRequestDto
): Promise<PurchaseRequest> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};