import { JwtService } from '@nestjs/jwt';
import { createParamDecorator } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http2';

import { env } from '../environments/environments';

const jwtService = new JwtService({ secret: env.jwtSecret, signOptions: { expiresIn: '1d' } });

export const BodyWithUserId = createParamDecorator((_, req) => {
  const httpBody: Body = req.args[0].body;
  const httpHeaders: IncomingHttpHeaders = req.args[0].headers;

  const currentUserId = getUserId(httpHeaders.authorization);

  return { ...httpBody, currentUserId };
});

export const ParamsWithUserId = createParamDecorator((_, req) => {
  const httpParams: Body = req.args[0].params;

  const httpHeaders: IncomingHttpHeaders = req.args[0].headers;

  const currentUserId = getUserId(httpHeaders.authorization);

  return { ...httpParams, currentUserId };
});

function getUserId(authorization: string): number {
  const token: string = authorization?.substr(7);
  let userId: number = null;

  if (token) {
    userId = jwtService.verify(token, { secret: env.jwtSecret }).id;
  }

  return userId;
}
