import { UserEntity } from '@modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreatedUserDto } from './created-user.dto';

export class UserDto extends CreatedUserDto {
  @ApiProperty({
    description: 'Data de criação',
    example: '2024-09-10T22:36:15.542Z'
  })
  createdAt: Date;

  constructor(entity: UserEntity) {
    super();
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.winthorUserId = entity.winthorUserId;
    this.createdAt = entity.createdAt;
  }
}
