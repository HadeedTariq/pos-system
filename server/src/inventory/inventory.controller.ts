import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  CancelOrderDto,
  CreateProductDto,
  DeleiverProductDto,
  DeleteProductDto,
  EditProductDto,
  OrderProductDto,
} from 'src/inventory/dto/inventory.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CustomException } from 'src/custom.exception';
import { InventoryService } from './inventory.service';
import { ProductService } from './services/product/product.service';
import { OrderService } from './services/order/order.service';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('createProduct')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body(ValidationPipe) product: CreateProductDto,
  ) {
    if (!file || !file.path) {
      throw new CustomException('Product main image required', 404);
    }

    const result: any = await this.productService.uploadProductImage(file.path);
    this.productService.deletFileLocally(file.path);

    return this.productService.createProduct(
      {
        ...product,
        image: result.secure_url,
        extraImages: JSON.parse(product.extraImages),
        price: +product.price,
        stock: +product.stock,
      },
      req,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('deleteProduct')
  deleteProduct(
    @Req() req: Request,
    @Query(ValidationPipe) { productId }: DeleteProductDto,
  ) {
    return this.productService.deleteProduct(productId, req);
  }

  // TODO: on frontend we will firstly get all the product details then the user can edit the product
  @UseGuards(AuthGuard)
  @Put('editProduct')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async editProdcut(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) editedProduct: EditProductDto,
    @Req() req: Request,
  ) {
    if (
      String(editedProduct.outOfStock) === 'true' &&
      Number(editedProduct.stock) > 0
    ) {
      throw new CustomException('Please set the value of stock to zero', 404);
    }

    if (!file || !file.path) {
      throw new CustomException('Product main image required', 404);
    }

    return this.productService.editProduct(
      {
        ...editedProduct,
        extraImages: JSON.parse(editedProduct.extraImages),
        price: +editedProduct.price,
        stock: +editedProduct.stock,
      },
      file.path,
      req,
    );
  }

  @UseGuards(AuthGuard)
  @Post('orderProduct')
  orderProduct(
    @Body(ValidationPipe) order: OrderProductDto,
    @Req() req: Request,
  ) {
    return this.orderService.orderProduct(order, req);
  }

  @UseGuards(AuthGuard)
  @Put('seller/deleiverProduct')
  deleiverProduct(
    @Body(ValidationPipe) { orderId }: DeleiverProductDto,
    @Req() req: Request,
  ) {
    return this.orderService.deleiverProduct(req, orderId);
  }

  @UseGuards(AuthGuard)
  @Put('seller/cancelOrder')
  cancelOrder(
    @Body(ValidationPipe) { orderId }: CancelOrderDto,
    @Req() req: Request,
  ) {
    return this.orderService.cancelOrder(req, orderId);
  }
}
