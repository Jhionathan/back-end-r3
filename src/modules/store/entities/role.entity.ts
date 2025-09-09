import { Column, Entity } from 'typeorm';

import { R3Base } from '@common/entities/base.entity';

@Entity('roles')
export class RoleEntity extends R3Base {
  @Column()
  name: string;

  @Column()
  description: string;
}
