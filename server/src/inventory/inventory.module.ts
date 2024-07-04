import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthModule } from 'src/auth/auth.module';
import { InventoryController } from './inventory.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [AuthModule],
  controllers: [InventoryController],
  providers: [InventoryService, ProductService],
})
export class InventoryModule {}
