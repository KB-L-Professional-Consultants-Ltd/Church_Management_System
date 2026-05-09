import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { createDb } from '../../db/client';
import { sql } from 'drizzle-orm';

interface JwtPayload {
  sub: string;
  role: string;
}

interface JwtUserRow {
  id: string | number;
  email: string;
  role: string;
  isActive: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: JwtPayload) {
    const db = createDb();
    const rows = (await db.execute(
      sql`select id, email, role, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt" from users where id = ${payload.sub} limit 1`,
    )) as unknown as JwtUserRow[];
    const user = rows[0];
    if (!user) throw new UnauthorizedException();
    if (!user.isActive)
      throw new UnauthorizedException(
        'Account is deactivated. Contact your administrator.',
      );

    // attach minimal payload to request.user
    return { id: user.id, role: user.role };
  }
}
