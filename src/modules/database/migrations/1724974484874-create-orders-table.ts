import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateOrdersTable1724974484874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'winthor_order_id',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'store_id',
            type: 'integer'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'order_status_id',
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
            name: 'fk_order_status',
            columnNames: ['order_status_id'],
            referencedTableName: 'order_status',
            referencedColumnNames: ['id']
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
