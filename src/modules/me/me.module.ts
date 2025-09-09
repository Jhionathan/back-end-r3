import { StoreService } from '@modules/store/services/store.service';
import { Module } from '@nestjs/common';
import { MeController } from './controllers/me-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from '@modules/store/entities/store.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, UserEntity])],
  controllers: [MeController],
  providers: [StoreService],
  exports: []
})
export class MeModule {}
