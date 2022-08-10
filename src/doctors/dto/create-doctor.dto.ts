import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  
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

  @IsString()
  spec: string;

  @IsBoolean()
  free: boolean;

  @IsOptional()
  @IsString()
  appointments_accepted: string;
}