import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
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
  spec: string;

  @IsOptional()
  @IsBoolean()
  free: boolean;

  @IsOptional()
  @IsString()
  appointments_accepted: string;
}
