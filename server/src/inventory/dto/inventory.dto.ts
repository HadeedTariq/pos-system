import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsString()
  extraImages: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  used: boolean;
}

export class DeleteProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  productId: string;
}

export class EditProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  productId: string;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  outOfStock: boolean;
}

export class OrderProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  productQuantity: number;
}

export class DeleiverProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  orderId: string;
}

export class CancelOrderDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  orderId: string;
}
