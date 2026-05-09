import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'raw_reset_token',
    description: 'Raw reset token from email link',
  })
  @IsString()
  token: string;

  @ApiProperty({ example: 'N3wP@ssw0rd!', description: 'New password' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;
}
