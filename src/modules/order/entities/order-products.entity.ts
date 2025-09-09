import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { R3Base } from '@common/entities/base.entity';
import { OrderEntity } from './order.entity';

@Entity('order_products')
export class OrderProductEntity extends R3Base {
  @Column({ name: 'winthor_product_id' })
  winthorProductId: string;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column()
  quantity: number;

  @Column({ name: 'unit_value' })
  unitValue: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
