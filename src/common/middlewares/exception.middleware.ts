import { generateErrorResponse } from '@common/utils/generate-error-response';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { captureException } from '@sentry/node';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    Logger.error(exception, HttpExceptionFilter.name);

    const isKnowException = exception instanceof HttpException;

    const statusCode = isKnowException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = isKnowException
      ? exception.getResponse()
      : generateErrorResponse();

    captureException(exception, {
      level: isKnowException ? 'info' : 'error',
      tags: {
        url: request.url,
        method: request.method
      },
      extra: {
        request: {
          headers: request.headers,
          body: request.body
        },
        response: error
      }
    });

    return response.status(statusCode).json(error);
  }
}
