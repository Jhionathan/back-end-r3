import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultConnection } from './connections/default.connectiont';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DefaultConnection,
      name: 'default'
    })
  ],
  providers: [],
  exports: []
})
export class DatabaseModule {}
