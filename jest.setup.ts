import { Logger } from '@nestjs/common';

jest.spyOn(Logger, 'error').mockImplementation();
jest.spyOn(Logger, 'warn').mockImplementation();
jest.spyOn(Logger, 'log').mockImplementation();
