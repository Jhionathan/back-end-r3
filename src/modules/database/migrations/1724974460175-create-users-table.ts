import { UserEntity } from '@modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1724974460175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'winthor_user_id',
            type: 'integer',
            default: 1
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'integer',
            default: 1
          },
          {
            name: 'is_admin',
            type: 'integer',
            default: 0
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'update_at',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );

    const user = await queryRunner.manager.create(UserEntity, {
      name: 'Admin',
      email: 'admin@r3suprimentos.com',
      password: 'Admin@123*',
      isAdmin: 1
    });

    await queryRunner.manager.save(UserEntity, user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
