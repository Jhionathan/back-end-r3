import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const { body } = context.switchToHttp().getRequest();

    Logger.log('request starting', LoggingInterceptor.name);
    Logger.log({ body }, LoggingInterceptor.name);

    return next
      .handle()
      .pipe(tap((data) => Logger.log({ data }, LoggingInterceptor.name)));
  }
}
