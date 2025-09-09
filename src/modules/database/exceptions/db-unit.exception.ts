/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class DBUnitException extends HttpException {
  constructor(error: any, stackOrContext: string) {
    const response = {
      ...error,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    };
    //const log = generateErrorLog(response);

    Logger.error('log', stackOrContext);

    super(response, response.statusCode);
  }
}

export class DBUnitAdjustBalanceException extends DBUnitException {
  constructor(error: any) {
    super(error, DBUnitAdjustBalanceException.name);
  }
}

export class DBUnitFindBalanceException extends DBUnitException {
  constructor(error: any) {
    super(error, DBUnitFindBalanceException.name);
  }
}

export class DBUnitConnectionException extends DBUnitException {
  constructor(error: any) {
    super(error, DBUnitConnectionException.name);
  }
}

export class DBUnitEndConnectionException extends DBUnitException {
  constructor(error: any) {
    super(error, DBUnitEndConnectionException.name);
  }
}
