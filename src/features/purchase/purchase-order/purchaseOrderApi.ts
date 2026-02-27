import api from "../../../lib/axios";

const BASE_URL = "/features/purchase-order";

export const getPurchaseOrders = async () => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createPurchaseOrder = async (data: any) => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};