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
import { InventoryService } from './inventory.service';
import {
  CreateProductDto,
  DeleteProductDto,
  EditProductDto,
} from './dto/inventory.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CustomException } from 'src/custom.exception';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
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

    const result: any = await this.inventoryService.uploadProductImage(
      file.path,
    );
    this.inventoryService.deletFileLocally(file.path);

    return this.inventoryService.createProduct(
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
    return this.inventoryService.deleteProduct(productId);
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

    return this.inventoryService.editProduct(
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
}
