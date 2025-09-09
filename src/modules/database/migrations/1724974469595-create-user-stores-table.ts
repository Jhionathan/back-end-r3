import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateUserStoreTable1724974469595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_stores',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'store_id',
            type: 'integer'
          },
          {
            name: 'role_id',
            type: 'integer'
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
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'fk_users',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id']
          }),
          new TableForeignKey({
            name: 'fk_stores',
            columnNames: ['store_id'],
            referencedTableName: 'stores',
            referencedColumnNames: ['id']
          }),
          new TableForeignKey({
            name: 'fk_roles',
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id']
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_stores');
  }
}
