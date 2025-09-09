import { StoreEntity } from '@modules/store/entities/store.entity';
import { StoreService } from '@modules/store/services/store.service';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders-controller';
import { OrderService } from './services/order.service';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/order-products.entity';
import { ProductWinthorService } from './services/winthor/product-winthor.service';
import { AuthWinthorService } from './services/winthor/auth-winthor.service';
import { OrderWinthorService } from './services/winthor/order-winthor.service';
import { OrderStatusService } from './services/order-status.service';
import { OrderStatusEntity } from './entities/order-status.entity';
import { OrderProductService } from './services/order-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      UserEntity,
      OrderEntity,
      OrderProductEntity,
      OrderStatusEntity
    ])
  ],
  controllers: [OrdersController],
  providers: [
    StoreService,
    OrderService,
    ProductWinthorService,
    OrderWinthorService,
    AuthWinthorService,
    OrderStatusService,
    OrderProductService
  ],
  exports: []
})
export class OrderModule {}
