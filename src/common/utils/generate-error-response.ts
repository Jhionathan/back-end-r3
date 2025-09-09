import { ErrorResponse } from '@common/contracts/error-response.contract';
import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export const generateErrorResponse = (
  error?: AxiosError,
  defaultMessage?: string
): ErrorResponse => {
  if (!error && !defaultMessage) {
    return {
      message: 'Erro interno no servidor',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    };
  }

  return {
    message: error.response.data ? error.response.data : defaultMessage,
    error: error.response.statusText,
    statusCode: error.response.status
  };
};
