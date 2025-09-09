import { StoreEntity } from '@modules/store/entities/store.entity';
import { StoreService } from '@modules/store/services/store.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users-controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserStoreEntity } from '@modules/store/entities/user-store.entity';
import { RoleService } from '@modules/store/services/role.service';
import { RoleEntity } from '@modules/store/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      UserEntity,
      UserStoreEntity,
      RoleEntity
    ])
  ],
  controllers: [UsersController],
  providers: [UserService, StoreService, RoleService],
  exports: [UserService]
})
export class UserModule {}
