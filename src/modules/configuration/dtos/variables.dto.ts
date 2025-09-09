import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EnvironmentsEnum } from '../contracts/environments.contract';

export class VariablesDTO {
  @IsEnum(EnvironmentsEnum)
  MODE: EnvironmentsEnum;
  @IsNumber()
  PORT: number;
  @IsString()
  START_COMMAND: string;

  @IsString()
  SENTRY_DSN: string;

  @IsString()
  POSTGRES_HOST: string;
  @IsNumber()
  POSTGRES_PORT: number;
  @IsString()
  POSTGRES_DATABASE: string;
  @IsString()
  POSTGRES_USERNAME: string;
  @IsString()
  POSTGRES_PASSWORD: string;
  @IsNumber()
  POSTGRES_TIMEOUT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  WINTHOR_URL: string;
  @IsString()
  WINTHOR_USERNAME: string;
  @IsString()
  WINTHOR_PASSWORD: string;
  @IsNumber()
  WINTHOR_TIMEOUT: number;
}
