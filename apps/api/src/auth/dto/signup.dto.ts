import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class signupDto {
  @ApiProperty({
    example: 'test@email.com',
    description: '사용자의 이메일 주소',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'test',
    description: '비밀번호',
  })
  @IsString()
  @MinLength(4)
  password: string;
}
