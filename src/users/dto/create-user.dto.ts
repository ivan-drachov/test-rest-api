import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
 
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  reg_token: string;

  
  @IsOptional()
  @IsString()
  photo_avatar: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  appointments: string;
}
