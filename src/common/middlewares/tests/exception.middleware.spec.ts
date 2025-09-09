import { createMock } from '@golevelup/ts-jest';
import {
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpExceptionFilter } from '../exception.middleware';

describe('HttpExceptionFilter', () => {
  const mockStatus = jest.fn().mockReturnThis();
  const mockJson = jest.fn().mockReturnThis();
  const mockHost = createMock<ArgumentsHost>({
    switchToHttp: () =>
      createMock<HttpArgumentsHost>({
        getResponse: () => ({
          status: mockStatus,
          json: mockJson
        })
      })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be return an internal server error when exception is unknown', () => {
    const mockException = new Error('Internal server error');

    new HttpExceptionFilter().catch(mockException, mockHost);

    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Erro interno no servidor',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    });
  });

  it('should be return an error when exception is known', () => {
    const mockException = new BadRequestException('Bad Request');

    new HttpExceptionFilter().catch(mockException, mockHost);

    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Bad Request',
      message: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST
    });
  });
});
