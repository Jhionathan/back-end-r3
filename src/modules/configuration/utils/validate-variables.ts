import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { VariablesDTO } from '../dtos/variables.dto';

export const validateVariables = (config: Record<string, unknown>) => {
  const variables = plainToInstance(VariablesDTO, config, {
    enableImplicitConversion: true
  });

  const errors = validateSync(variables, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return variables;
};
