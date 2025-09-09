import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { R3Base } from '@common/entities/base.entity';
import { StoreEntity } from '@modules/store/entities/store.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { OrderStatusEntity } from './order-status.entity';
import { OrderProductEntity } from './order-products.entity';
import { ListOfOrderItemWinthorDto } from '../services/winthor/dto/response/list-of-order-item-winthor.dto';

@Entity('orders')
export class OrderEntity extends R3Base {
  @Column({ name: 'winthor_order_id' })
  winthorOrderId: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @Column({ unique: true, name: 'order_status_id' })
  statusId: number;

  @ManyToOne(() => StoreEntity, (store) => store.orders)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => OrderStatusEntity, (status) => status.orders)
  @JoinColumn({ name: 'order_status_id' })
  status: OrderStatusEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  products: OrderProductEntity[];

  getTotalPriceProducts(): number {
    return this.products.reduce(function (
      accumulator,
      product: OrderProductEntity
    ) {
      return accumulator + product.unitValue * product.quantity;
    }, 0);
  }

  getProductsToCreateOrderWinthor(): Partial<ListOfOrderItemWinthorDto[]> {
    return this.products.map(function (product: OrderProductEntity) {
      return {
        productSKUERPReferenceKey: String(product.winthorProductId),
        sellPrice: product.unitValue,
        quantity: product.quantity,
        warehouseBranchId: '1'
      } as unknown as ListOfOrderItemWinthorDto;
    });
  }
}
