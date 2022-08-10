import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  
  @IsOptional()
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

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  appointments: string;
}
