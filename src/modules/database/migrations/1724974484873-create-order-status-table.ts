import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderStatusTable1724974484873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_status',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar'
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status', ['name'])
      .values([
        { name: 'Pendente' },
        { name: 'Aprovado' },
        { name: 'Reprovado' },
        { name: 'Cancelado' },
        { name: 'Enviado' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_status');
  }
}
