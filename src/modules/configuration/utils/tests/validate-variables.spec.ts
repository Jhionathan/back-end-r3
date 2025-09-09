import { createMock } from '@golevelup/ts-jest';
import { VariablesDTO } from '@modules/configuration/dtos/variables.dto';
import { ValidationError } from '@nestjs/common';
import * as classTransformer from 'class-transformer';
import * as classValidator from 'class-validator';
import { validateVariables } from '../validate-variables';

describe('validateVariables', () => {
  const mockVariables = createMock<VariablesDTO>();
  const mockConfig = createMock<Record<string, unknown>>();

  beforeEach(() => {
    jest
      .spyOn(classTransformer, 'plainToInstance')
      .mockReturnValueOnce(mockVariables);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be return variables without errors', () => {
    jest.spyOn(classValidator, 'validateSync').mockReturnValueOnce([]);

    const resp = validateVariables(mockConfig);

    expect(resp).toBeTruthy();
    expect(resp).toEqual(mockVariables);
    expect(classTransformer.plainToInstance).toHaveBeenCalledTimes(1);
    expect(classValidator.validateSync).toHaveBeenCalledTimes(1);
  });

  it('should be throw error when variables is invalid', () => {
    jest
      .spyOn(classValidator, 'validateSync')
      .mockReturnValueOnce([createMock<ValidationError>()]);

    expect(() => validateVariables(mockConfig)).toThrow();
    expect(classTransformer.plainToInstance).toHaveBeenCalledTimes(1);
    expect(classValidator.validateSync).toHaveBeenCalledTimes(1);
  });
});
