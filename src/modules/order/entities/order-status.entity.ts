import { Column, Entity, OneToMany } from 'typeorm';

import { R3Base } from '@common/entities/base.entity';
import { OrderEntity } from './order.entity';

@Entity('order_status')
export class OrderStatusEntity extends R3Base {
  @Column()
  name: string;

  @OneToMany(() => OrderEntity, (order) => order.status)
  orders: OrderEntity[];
}
