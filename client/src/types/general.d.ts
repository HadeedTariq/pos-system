export type ErrorResponse = {
  status: number;
  data: {
    message: string;
  };
};

export interface SellerNotificationsType {
  _id: string;
  sender: User;
  receiver: string;
  message: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  order: {
    status: "pending" | "reached" | "delivered" | "cancel";
  };
}

interface User {
  _id: string;
  name: string;
  role: string;
}

interface OrderProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface OrderItem {
  _id: string;
  productId: string;
  requester_id: string;
  status: string;
  productQuantity: number;
  totalPrice: number;
  __v: number;
  product: OrderProduct;
}
