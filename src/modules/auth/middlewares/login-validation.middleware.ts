import {
  BadRequestException,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dto/request/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const login = new LoginDto();
    login.email = body.email;
    login.password = body.password;

    const validations = await validate(login);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc: any, curr: any) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, [])
      );
    }

    next();
  }
}
