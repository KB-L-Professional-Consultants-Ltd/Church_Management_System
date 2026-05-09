import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'CurrentP@ss1', description: 'Current password' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  currentPassword: string;

  @ApiProperty({ example: 'N3wP@ssw0rd!', description: 'New password' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;

  @ApiProperty({
    example: 'hex_refresh_token',
    description: 'Optional current refresh token to preserve during rotation',
  })
  @IsOptional()
  @IsString()
  currentRefreshToken?: string;
}
