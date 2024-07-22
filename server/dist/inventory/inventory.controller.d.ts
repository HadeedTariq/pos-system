import { RawBodyRequest } from '@nestjs/common';
import { CancelOrderDto, CreateProductDto, DeleiverProductDto, DeleteProductDto, EditProductDto, OrderProductDto } from 'src/inventory/dto/inventory.dto';
import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { ProductService } from './services/product/product.service';
import { OrderService } from './services/order/order.service';
import { SellerService } from './services/seller/seller.service';
export declare class InventoryController {
    private readonly inventoryService;
    private readonly productService;
    private readonly orderService;
    private readonly sellerService;
    constructor(inventoryService: InventoryService, productService: ProductService, orderService: OrderService, sellerService: SellerService);
    createProduct(file: Express.Multer.File, req: Request, product: CreateProductDto): Promise<{
        message: string;
    }>;
    deleteProduct(req: Request, { productId }: DeleteProductDto): Promise<{
        message: string;
    }>;
    editProduct(editedProduct: EditProductDto, req: Request): Promise<{
        message: string;
    }>;
    getProducts(req: Request): Promise<any[]>;
    orderProduct(order: OrderProductDto, req: Request): Promise<{
        message: string;
    }>;
    deleiverProduct({ orderId }: DeleiverProductDto, req: Request): Promise<{
        message: string;
    }>;
    cancelOrderBySeller({ orderId }: CancelOrderDto, req: Request): Promise<{
        message: string;
    }>;
    cancelOrderByUser({ orderId }: CancelOrderDto, req: Request): Promise<{
        message: string;
    }>;
    getSellerSales(req: Request): Promise<any[]>;
    getSellerProducts(req: Request): Promise<any[]>;
    getSellerPendingOrders(req: Request): Promise<any[]>;
    getSellerNotification(req: Request): Promise<any[]>;
    getMyOrders(req: Request): Promise<any[]>;
    stripeWebHook(req: RawBodyRequest<Request>): Promise<void>;
}
