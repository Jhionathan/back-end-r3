import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store.entity';
import { StoreService } from './services/store.service';
import { RoleService } from './services/role.service';
import { RoleEntity } from './entities/role.entity';
import { StoresController } from './controllers/stores-controller';
import { UserEntity } from '@modules/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, RoleEntity, UserEntity])],
  controllers: [StoresController],
  providers: [StoreService, RoleService],
  exports: [StoreService, RoleService]
})
export class StoreModule {}
