import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'hex_refresh_token',
    description: 'Raw refresh token',
  })
  @IsString()
  refreshToken: string;
}
