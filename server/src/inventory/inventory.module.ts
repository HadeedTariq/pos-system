import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthModule } from 'src/auth/auth.module';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [AuthModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
