import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  
  @IsDate()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  doctor: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
