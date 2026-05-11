import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DB_CONNECTION } from '../db/db.module';
import { sql, type SQL } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

interface UserRow {
  id: number | string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface RegisterRow {
  id: number | string;
  email: string;
  role: string;
  createdAt: string | Date;
}

interface LoginUserRow {
  id: number | string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
}

interface PasswordUserRow {
  id: number | string;
  passwordHash: string;
}

interface RefreshTokenRow {
  id: number | string;
  userId: number | string;
  tokenHash: string;
  expiresAt: string | Date;
}

interface PasswordResetTokenRow {
  id: number | string;
  userId: number | string;
  used?: boolean;
  expiresAt: string | Date;
}

@Injectable()
export class AuthService {
  private readonly DUMMY_BCRYPT_HASH: string;

  constructor(
    @Inject(DB_CONNECTION)
    private db: ReturnType<typeof import('../db/client').createDb>,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {
    // precompute a dummy hash to mitigate timing attacks when user not found
    this.DUMMY_BCRYPT_HASH = bcrypt.hashSync('invalid_password', 12);
  }

  private parseExpiryToMs(exp: string) {
    if (!exp) return 0;
    const l = exp.toLowerCase();
    const num = parseInt(l.slice(0, -1), 10);
    const unit = l.slice(-1);
    if (Number.isNaN(num)) return 0;
    switch (unit) {
      case 'd':
        return num * 24 * 60 * 60 * 1000;
      case 'h':
        return num * 60 * 60 * 1000;
      case 'm':
        return num * 60 * 1000;
      case 's':
        return num * 1000;
      default:
        // if no unit, treat as milliseconds
        return parseInt(l, 10) || 0;
    }
  }

  private sha256Hex(input: string) {
    return crypto.createHash('sha256').update(input).digest('hex');
  }

  private async queryRows<T>(query: SQL): Promise<T[]> {
    return (await this.db.execute(query)) as unknown as T[];
  }

  private getRefreshExpiry() {
    return (
      this.config.get<string>('JWT_REFRESH_EXPIRATION') ||
      this.config.get<string>('JWT_REFRESH_EXPIRY') ||
      '7d'
    );
  }

  private safeEqual(a: string, b: string) {
    try {
      const A = Buffer.from(a);
      const B = Buffer.from(b);
      if (A.length !== B.length) return false;
      return crypto.timingSafeEqual(A, B);
    } catch {
      return false;
    }
  }

  async register(email: string, password: string, role: string) {
    const existing = await this.queryRows<{ id: number | string }>(
      sql`select id from users where lower(email) = lower(${email}) limit 1`,
    );
    if (existing.length > 0) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const inserted = await this.queryRows<RegisterRow>(
      sql`insert into users (email, password_hash, role) values (${email}, ${passwordHash}, ${role}) returning id, email, role, created_at as "createdAt"`,
    );
    const row = inserted[0];
    return {
      id: row.id,
      email: row.email,
      role: row.role,
      createdAt: row.createdAt,
    };
  }

  async login(email: string, password: string) {
    const rows = await this.queryRows<LoginUserRow>(
      sql`select id, email, password_hash as "passwordHash", role, is_active as "isActive" from users where lower(email) = lower(${email}) limit 1`,
    );
    const user = rows[0];
    if (!user) {
      // run bcrypt against dummy hash to mitigate timing attacks
      await bcrypt.compare(password, this.DUMMY_BCRYPT_HASH);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Account is deactivated. Contact your administrator.',
      );
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });

    const rawRefresh = crypto.randomBytes(64).toString('hex');
    const tokenHash = this.sha256Hex(rawRefresh);
    const expiryMs = this.parseExpiryToMs(this.getRefreshExpiry());
    const expiresAt = new Date(Date.now() + expiryMs);

    await this.queryRows<unknown>(
      sql`insert into refresh_tokens (user_id, token_hash, expires_at) values (${user.id}, ${tokenHash}, ${expiresAt.toISOString()})`,
    );

    return {
      accessToken,
      refreshToken: rawRefresh,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async refresh(refreshToken: string) {
    const computedHash = this.sha256Hex(refreshToken);
    const rows = await this.queryRows<RefreshTokenRow>(
      sql`select id, user_id as "userId", token_hash as "tokenHash", expires_at as "expiresAt" from refresh_tokens where token_hash = ${computedHash} limit 1`,
    );
    const tokenRow = rows[0];
    if (!tokenRow)
      throw new UnauthorizedException(
        'Invalid or expired session. Please log in again.',
      );

    // timing-safe compare
    if (!this.safeEqual(tokenRow.tokenHash, computedHash)) {
      throw new UnauthorizedException(
        'Invalid or expired session. Please log in again.',
      );
    }

    if (new Date(tokenRow.expiresAt) < new Date()) {
      await this.queryRows<unknown>(
        sql`delete from refresh_tokens where id = ${tokenRow.id}`,
      );
      throw new UnauthorizedException(
        'Invalid or expired session. Please log in again.',
      );
    }

    const userRows = await this.queryRows<UserRow>(
      sql`select id, email, role, is_active as "isActive" from users where id = ${tokenRow.userId} limit 1`,
    );
    const user = userRows[0];
    if (!user) {
      await this.queryRows<unknown>(
        sql`delete from refresh_tokens where id = ${tokenRow.id}`,
      );
      throw new UnauthorizedException(
        'Invalid or expired session. Please log in again.',
      );
    }
    if (!user.isActive) {
      await this.queryRows<unknown>(
        sql`delete from refresh_tokens where id = ${tokenRow.id}`,
      );
      throw new UnauthorizedException(
        'Invalid or expired session. Please log in again.',
      );
    }

    // rotation: delete existing
    await this.queryRows<unknown>(
      sql`delete from refresh_tokens where id = ${tokenRow.id}`,
    );

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });
    const rawRefresh = crypto.randomBytes(64).toString('hex');
    const newHash = this.sha256Hex(rawRefresh);
    const expiryMs = this.parseExpiryToMs(this.getRefreshExpiry());
    const expiresAt = new Date(Date.now() + expiryMs);
    await this.queryRows<unknown>(
      sql`insert into refresh_tokens (user_id, token_hash, expires_at) values (${user.id}, ${newHash}, ${expiresAt.toISOString()})`,
    );

    return { accessToken, refreshToken: rawRefresh };
  }

  async logout(userId: string, refreshToken: string) {
    const computedHash = this.sha256Hex(refreshToken);
    await this.queryRows<unknown>(
      sql`delete from refresh_tokens where token_hash = ${computedHash} and user_id = ${userId}`,
    );
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(email: string) {
    const rows = await this.queryRows<UserRow>(
      sql`select id, email, is_active as "isActive" from users where lower(email) = lower(${email}) limit 1`,
    );
    const user = rows[0];

    // Always return same response to prevent enumeration
    const response = {
      message: 'If that email is registered, a reset link has been sent.',
    };

    if (!user || !user.isActive) return response;

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.sha256Hex(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.queryRows<unknown>(
      sql`insert into password_reset_tokens (user_id, token_hash, expires_at) values (${user.id}, ${tokenHash}, ${expiresAt.toISOString()})`,
    );

    // send email via Resend API
    const resendKey = this.config.get<string>('RESEND_API_KEY');
    const appUrl = this.config.get<string>('APP_URL');

    // Only attempt to send email if required config is present
    if (resendKey && appUrl) {
      try {
        const resetUrl = `${appUrl.replace(/\/$/, '')}/reset-password?token=${rawToken}`;

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'no-reply@church.example',
            to: user.email,
            subject: 'Password reset',
            html: `<p>Use the link below to reset your password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
          }),
        });

        if (!response.ok) {
          // Log the error for monitoring/debugging but don't expose to client
          console.error(
            `Failed to send password reset email: ${response.status} ${response.statusText}`,
          );
        }
      } catch (error) {
        // Log the error for monitoring/debugging but don't expose to client
        console.error('Error sending password reset email:', error);
      }
    } else {
      // Log missing configuration for debugging
      console.warn(
        'Password reset email not sent: RESEND_API_KEY or APP_URL not configured',
      );
    }

    return response;
  }

  async resetPassword(token: string, newPassword: string) {
    const computedHash = this.sha256Hex(token);
    const rows = await this.queryRows<PasswordResetTokenRow>(
      sql`select id, user_id as "userId", used, expires_at as "expiresAt" from password_reset_tokens where token_hash = ${computedHash} and used = false limit 1`,
    );
    const pr = rows[0];
    if (!pr)
      throw new BadRequestException(
        'This reset link is invalid or has expired.',
      );
    if (new Date(pr.expiresAt) < new Date())
      throw new BadRequestException(
        'This reset link is invalid or has expired.',
      );

    const userRows = await this.queryRows<{ id: number | string }>(
      sql`select id from users where id = ${pr.userId} limit 1`,
    );
    const user = userRows[0];
    if (!user)
      throw new BadRequestException(
        'This reset link is invalid or has expired.',
      );

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.queryRows<unknown>(
      sql`update users set password_hash = ${passwordHash}, updated_at = now() where id = ${user.id}`,
    );
    await this.queryRows<unknown>(
      sql`update password_reset_tokens set used = true where id = ${pr.id}`,
    );
    await this.queryRows<unknown>(
      sql`delete from refresh_tokens where user_id = ${user.id}`,
    );

    return { message: 'Password updated successfully. Please log in.' };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    currentRefreshToken?: string,
  ) {
    if (currentPassword === newPassword) {
      throw new BadRequestException(
        'New password must differ from your current password.',
      );
    }
    const rows = await this.queryRows<PasswordUserRow>(
      sql`select id, password_hash as "passwordHash" from users where id = ${userId} limit 1`,
    );
    const user = rows[0];
    if (!user)
      throw new UnauthorizedException('Current password is incorrect.');

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Current password is incorrect.');

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.queryRows<unknown>(
      sql`update users set password_hash = ${passwordHash}, updated_at = now() where id = ${userId}`,
    );

    if (currentRefreshToken) {
      const preservedHash = this.sha256Hex(currentRefreshToken);
      await this.queryRows<unknown>(
        sql`delete from refresh_tokens where user_id = ${userId} and token_hash != ${preservedHash}`,
      );
    } else {
      await this.queryRows<unknown>(
        sql`delete from refresh_tokens where user_id = ${userId}`,
      );
    }

    return { message: 'Password changed successfully.' };
  }

  async me(userId: string) {
    const rows = await this.queryRows<UserRow>(
      sql`select id, email, role, created_at as "createdAt" from users where id = ${userId} limit 1`,
    );
    const user = rows[0];
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
