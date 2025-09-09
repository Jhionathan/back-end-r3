import { R3Base } from '@common/entities/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { UserStoreEntity } from './user-store.entity';
import { OrderEntity } from '@modules/order/entities/order.entity';

@Entity('stores')
export class StoreEntity extends R3Base {
  @Column({ unique: true, name: 'winthor_cod_cli' })
  winthorCodCli: number;

  @Column({ name: 'winthor_cod_usur' })
  winthorCodUsur: number;

  @Column({ name: 'winthor_payment_plan_Id' })
  winthorPaymentPlanId: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  status: number;

  @OneToMany(() => UserStoreEntity, (userStore) => userStore.store)
  userStores: UserStoreEntity[];

  @ManyToMany(() => UserEntity, (user) => user.stores)
  users: UserEntity[];

  @OneToMany(() => OrderEntity, (order) => order.store)
  orders: OrderEntity[];
}
