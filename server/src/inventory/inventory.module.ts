import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthModule } from 'src/auth/auth.module';
import { InventoryController } from './inventory.controller';
import { ProductService } from './services/product/product.service';
import { OrderService } from './services/order/order.service';
import { SellerService } from './services/seller/seller.service';

@Module({
  imports: [AuthModule],
  controllers: [InventoryController],
  providers: [InventoryService, ProductService, OrderService,SellerService],
})
export class InventoryModule {}
