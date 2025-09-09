import { R3Base } from '@common/entities/base.entity';
import { OrderEntity } from '@modules/order/entities/order.entity';
import { StoreEntity } from '@modules/store/entities/store.entity';
import { UserStoreEntity } from '@modules/store/entities/user-store.entity';
import { hashSync } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany
} from 'typeorm';

@Entity('users')
export class UserEntity extends R3Base {
  @Column({ unique: true, name: 'winthor_user_id' })
  winthorUserId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column({ name: 'is_admin' })
  isAdmin: number;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => UserStoreEntity, (userStore) => userStore.user)
  userStores: UserStoreEntity[];

  @ManyToMany(() => StoreEntity, (store) => store.users)
  @JoinTable({
    name: 'user_stores',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'store_id',
      referencedColumnName: 'id'
    }
  })
  stores: StoreEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
