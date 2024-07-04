import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './InventoryController';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
