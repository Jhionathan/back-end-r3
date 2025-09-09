import { UserEntity } from '@modules/user/entities/user.entity';
import { Request } from 'express';

export interface UserToken {
  access_token: string;
}

export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  winthorUserId?: number;
  isAdmin: number;
}

export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
  winthorUserId?: number;
  isAdmin: number;
}

export interface AuthRequest extends Request {
  user: UserEntity;
}
