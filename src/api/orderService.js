import api from "./axiosConfig";

export const placeOrder = async (order) => {
  const response = await api.post("/order/placeorder",order);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders/myorders");
  return response.data;
};