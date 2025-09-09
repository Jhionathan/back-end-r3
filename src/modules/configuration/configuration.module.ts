import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfigFactory } from './factories/pino-logger-config.factory';
import configuration from './utils/configuration';
import { validateVariables } from './utils/validate-variables';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateVariables
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: pinoLoggerConfigFactory
    })
  ]
})
export class ConfigurationModule {}
