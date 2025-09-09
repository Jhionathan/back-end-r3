import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { resolve } from 'node:path';

@Injectable()
export class DefaultConnection implements TypeOrmOptionsFactory {
  constructor(private readonly cfg: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const path = resolve(__dirname, '..', '..');

    return {
      name: 'default',
      type: 'postgres',
      host: this.cfg.get<string>('database.default.host'),
      port: this.cfg.get<number>('database.default.port'),
      database: this.cfg.get<string>('database.default.database'),
      username: this.cfg.get<string>('database.default.username'),
      password: this.cfg.get<string>('database.default.password'),
      connectTimeoutMS: this.cfg.get<number>('database.default.timeout'),
      entities: [`${path}/**/*.entity{.ts,.js}`],
      migrations: ['dist/src/modules/**/migrations/*.js'],
      migrationsRun: true,
      synchronize: false
    };
  }
}
