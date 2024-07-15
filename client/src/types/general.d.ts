export type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
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
