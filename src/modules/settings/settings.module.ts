import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingService } from './services/setting.service';
import { SettingEntity } from './entities/setting.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity])],
  providers: [SettingService],
  exports: [SettingService]
})
export class SettingsModule {}
