import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

const executeMock = jest.fn();

const mockDb = {
  execute: executeMock,
};

jest.mock('bcrypt', () => ({
  hashSync: jest.fn(
    () => '$2b$12$dummyhashdummyhashdummyhashdummyhashdummyhashdummyhashd',
  ),
  hash: jest.fn(() => Promise.resolve('hashed-password')),
  compare: jest.fn(),
}));

jest.mock('crypto', () => {
  const actual = jest.requireActual<typeof import('crypto')>('crypto');
  return {
    ...actual,
    randomBytes: jest.fn(() => Buffer.from('a'.repeat(64), 'hex')),
    createHash: jest.fn(() => ({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn(() => 'hashed-token'),
    })),
    timingSafeEqual: jest.fn(() => true),
  };
});

describe('AuthService', () => {
  const jwtService = {
    signAsync: jest.fn().mockResolvedValue('access-token'),
  } as unknown as JwtService;

  const configService = {
    get: jest.fn((key: string) => {
      const values: Record<string, string> = {
        JWT_REFRESH_EXPIRY: '30d',
        RESEND_API_KEY: 'resend-key',
        APP_URL: 'https://app.example.com',
      };

      return values[key];
    }),
  } as unknown as ConfigService;

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    service = new AuthService(mockDb as any, configService, jwtService);
  });

  it('throws a conflict when registering an existing email', async () => {
    executeMock.mockResolvedValueOnce([{ id: 'existing' }]);

    await expect(
      service.register('user@example.com', 'P@ssw0rd1!', 'VIEWER'),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('throws invalid credentials when login user is missing', async () => {
    executeMock.mockResolvedValueOnce([]);

    await expect(
      service.login('missing@example.com', 'P@ssw0rd1!'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('returns tokens for a valid login', async () => {
    executeMock
      .mockResolvedValueOnce([
        {
          id: 'user-1',
          email: 'user@example.com',
          passwordHash: 'hashed-password',
          role: 'VIEWER',
          isActive: true,
        },
      ])
      .mockResolvedValueOnce([]);

    const compareMock = bcrypt.compare as unknown as jest.MockedFunction<
      (password: string, hash: string) => Promise<boolean>
    >;
    compareMock.mockResolvedValueOnce(true);

    const result = await service.login('user@example.com', 'P@ssw0rd1!');

    expect(result.accessToken).toBe('access-token');
    expect(result.refreshToken).toBeDefined();
    expect(result.user).toEqual({
      id: 'user-1',
      email: 'user@example.com',
      role: 'VIEWER',
    });
  });

  it('rotates refresh tokens on refresh', async () => {
    executeMock
      .mockResolvedValueOnce([
        {
          id: 'refresh-1',
          userId: 'user-1',
          tokenHash: 'hashed-token',
          expiresAt: new Date(Date.now() + 60_000).toISOString(),
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 'user-1',
          email: 'user@example.com',
          role: 'VIEWER',
          isActive: true,
        },
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result = await service.refresh('raw-refresh-token');

    expect(result.accessToken).toBe('access-token');
    expect(result.refreshToken).toBeDefined();
  });

  it('rejects a reset token that is missing', async () => {
    executeMock.mockResolvedValueOnce([]);

    await expect(
      service.resetPassword('token', 'N3wP@ssw0rd!'),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects password changes when the current and new passwords match', async () => {
    await expect(
      service.changePassword('user-1', 'P@ssw0rd1!', 'P@ssw0rd1!'),
    ).rejects.toThrow(BadRequestException);
  });
});
