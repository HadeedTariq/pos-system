export declare class CreateProductDto {
    name: string;
    price: number;
    details: string;
    extraImages: string;
    stock: number;
    category: string;
    used: boolean;
}
export declare class DeleteProductDto {
    productId: string;
}
export declare class EditProductDto {
    name: string;
    price: number;
    details: string;
    stock: number;
    category: string;
    used: boolean;
    productId: string;
    outOfStock: boolean;
    extraImages: string[];
}
export declare class OrderProductDto {
    productId: string;
    productQuantity: number;
}
export declare class DeleiverProductDto {
    orderId: string;
}
export declare class CancelOrderDto {
    orderId: string;
}
