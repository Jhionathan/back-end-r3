import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoreTable1724974302708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stores',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'winthor_cod_cli',
            type: 'integer'
          },
          {
            name: 'winthor_cod_usur',
            type: 'integer'
          },
          {
            name: 'winthor_payment_plan_Id',
            type: 'integer'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'cnpj',
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'integer',
            default: 1
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stores');
  }
}
