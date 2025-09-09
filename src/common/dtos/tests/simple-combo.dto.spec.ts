import 'reflect-metadata'; // Necessário para decoradores
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SimpleComboDTO } from '../SimpleCombo.dto';

describe('simpleComboParams', () => {
  it('should correctly transform and validate id and description', async () => {
    const plain = {
      id: 1,
      description: 'teste'
    };

    const simpleComboParams = plainToClass(SimpleComboDTO, plain);
    const errors = await validate(simpleComboParams);

    expect(errors.length).toBe(0);
    expect(simpleComboParams.id).toBe(1);
    expect(simpleComboParams.description).toBe('teste');
  });

  it('should fail validation if id or description are invalid', async () => {
    const plain = {
      id: '1',
      description: ''
    };

    const simpleComboParams = plainToClass(SimpleComboDTO, plain);
    const errors = await validate(simpleComboParams);

    expect(errors.length).toBeGreaterThan(0);
  });
});
