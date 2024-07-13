import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { Request } from 'express';
import { CustomException } from 'src/custom.exception';
import * as fs from 'fs';
import { promisify } from 'util';
import { extractPublicId } from 'cloudinary-build-url';
import {
  CreateProductDto,
  EditProductDto,
} from 'src/inventory/dto/inventory.dto';
import { Product } from 'src/inventory/schemas/products.model';

@Injectable()
export class ProductService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadProductImage(file: string) {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(file, {}, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  async deletFileLocally(filePath: string) {
    try {
      const unlinkAsync = promisify(fs.unlink);
      await unlinkAsync(filePath);
    } catch (err) {
      console.log(err);
      throw new CustomException(
        'Something went wrong while deleting file locally',
        404,
      );
    }
  }
  async deletFileFromCloudinary(image: string) {
    try {
      const publicId = extractPublicId(image);
      await v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Error deleting image:', error);
          throw new CustomException('Error deleting image', 404);
        }
        console.log('Image deleted:', result);
      });
    } catch (err) {
      console.log(err);
      throw new CustomException(
        'Something went wrong while deleting file from cloud',
        404,
      );
    }
  }

  async createProduct(
    product: CreateProductDto & {
      image: string;
    },
    req: Request,
  ) {
    const user: any = req.user;

    const createdProduct = await Product.create({
      ...product,
      used: String(product.used) === 'true' ? true : false,
      creator: user.id,
    });

    return { message: 'Product created successfully' };
  }

  async deleteProduct(id: string, req: Request) {
    const user: any = req.user;
    const product = await Product.findOneAndDelete({
      _id: id,
      creator: user.id,
    });

    if (!product) {
      throw new CustomException('Product not found', 404);
    }

    await this.deletFileFromCloudinary(product.image);

    return { message: 'Product Deleted successfully' };
  }

  async editProduct(editedProduct: EditProductDto, req: Request) {
    const user: any = req.user;
    const product = await Product.findOne({
      _id: editedProduct.productId,
      creator: user.id,
    });

    if (!product) {
      throw new CustomException('Product not found', 404);
    }

    await Product.findByIdAndUpdate(product._id, {
      ...editedProduct,
      used: String(product.used) === 'true' ? true : false,
      extraImages: JSON.stringify(product.extraImages),
    });

    return { message: 'Product Updated successfully' };
  }
}
