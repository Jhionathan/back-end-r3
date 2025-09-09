import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettingsTable1724974536339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'key',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'value',
            type: 'varchar'
          }
        ]
      })
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('settings', ['key', 'value'])
      .values([
        { key: 'PENDING', value: '1' },
        { key: 'APPROVED', value: '2' },
        { key: 'CANCELED', value: '3' },
        { key: 'SENT', value: '4' },
        { key: 'STATUS_ALLOWED_SEND', value: '[1,2]' },
        { key: 'STATUS_ALLOWED_CANCELLATION', value: '[4]' },
        { key: 'SALE_TYPE_DEFAULT', value: '1' }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settings');
  }
}
