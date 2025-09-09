import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ConfigurationModule } from '@modules/configuration/configuration.module';
import { DatabaseModule } from '@modules/database/database.module';
import { HealthModule } from '@modules/health/health.module';
import { MeModule } from '@modules/me/me.module';
import { OrderModule } from '@modules/order/order.module';
import { SettingsModule } from '@modules/settings/settings.module';
import { StoreModule } from '@modules/store/store.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    MeModule,
    ConfigurationModule,
    HealthModule,
    DatabaseModule,
    UserModule,
    StoreModule,
    OrderModule,
    SettingsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
