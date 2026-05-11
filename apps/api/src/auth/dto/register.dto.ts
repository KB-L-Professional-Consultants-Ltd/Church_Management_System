import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsIn, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'User password' })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ example: 'VIEWER', description: 'Role for the user' })
  @IsString()
  @IsIn(['ADMIN', 'PASTOR', 'DEPARTMENT_LEADER', 'FINANCE', 'VIEWER'])
  role: string;
}
