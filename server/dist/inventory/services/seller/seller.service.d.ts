import { Request } from 'express';
export declare class SellerService {
    getSellerSales(req: Request): Promise<any[]>;
    getSellerProducts(req: Request): Promise<any[]>;
    getSellerPendingOrders(req: Request): Promise<any[]>;
    getSellerNotification(req: Request): Promise<any[]>;
}
