import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { R3Base } from '@common/entities/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { StoreEntity } from './store.entity';
import { RoleEntity } from './role.entity';

@Entity('user_stores')
export class UserStoreEntity extends R3Base {
  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @Column({ unique: true, name: 'store_id' })
  storeId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.userStores)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.userStores)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
