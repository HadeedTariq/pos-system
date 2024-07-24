import { Request } from 'express';
import { CreateProductDto, EditProductDto } from 'src/inventory/dto/inventory.dto';
import { JwtService } from '@nestjs/jwt';
export declare class ProductService {
    private jwtService;
    constructor(jwtService: JwtService);
    uploadProductImage(file: any): Promise<unknown>;
    deletFileFromCloudinary(image: string): Promise<void>;
    createProduct(product: CreateProductDto & {
        image: string;
    }, req: Request): Promise<{
        message: string;
    }>;
    deleteProduct(id: string, req: Request): Promise<{
        message: string;
    }>;
    editProduct(editedProduct: EditProductDto, req: Request): Promise<{
        message: string;
    }>;
    getProducts(req: Request): Promise<any[]>;
}
