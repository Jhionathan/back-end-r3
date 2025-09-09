import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateOrderProductsTable1724974491578
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'winthor_product_id',
            type: 'varchar'
          },
          {
            name: 'order_id',
            type: 'integer'
          },
          {
            name: 'quantity',
            type: 'integer'
          },
          {
            name: 'unit_value',
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
            name: 'fk_orders',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id']
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_products');
  }
}
