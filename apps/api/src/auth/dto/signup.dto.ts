import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  password: string;
}
