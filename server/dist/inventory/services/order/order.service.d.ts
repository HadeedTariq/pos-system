import { Request } from 'express';
import { OrderProductDto } from 'src/inventory/dto/inventory.dto';
import Stripe from 'stripe';
export declare class OrderService {
    orderProduct(order: OrderProductDto, req: Request): Promise<{
        message: string;
    }>;
    deleiverProduct(req: Request, orderId: string): Promise<{
        message: string;
    }>;
    cancelOrderBySeller(req: Request, orderId: string): Promise<{
        message: string;
    }>;
    cancelOrderByUser(req: Request, orderId: string): Promise<{
        message: string;
    }>;
    getMyOrders(req: Request): Promise<any[]>;
    handleEvent(event: Stripe.Event): Promise<{
        message: string;
    }>;
}
