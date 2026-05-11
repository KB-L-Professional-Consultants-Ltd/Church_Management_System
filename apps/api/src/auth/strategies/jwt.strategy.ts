import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DB_CONNECTION } from '../../db/db.module';
import { sql } from 'drizzle-orm';

interface JwtPayload {
  sub: string | number;
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
  constructor(
    @Inject(DB_CONNECTION)
    private db: ReturnType<typeof import('../../db/client').createDb>,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: JwtPayload) {
    // Normalize payload.sub to string for SQL query
    const userId = String(payload.sub);

    const rows = (await this.db.execute(
      sql`select id, email, role, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt" from users where id = ${userId} limit 1`,
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
