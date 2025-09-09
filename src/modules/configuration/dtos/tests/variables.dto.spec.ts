import { VariablesDTO } from '../variables.dto';

describe('VariablesDTO', () => {
  it('should be defined', () => {
    const dto = new VariablesDTO();

    expect(dto).toBeInstanceOf(VariablesDTO);
    expect(dto).toBeTruthy();
  });
});
