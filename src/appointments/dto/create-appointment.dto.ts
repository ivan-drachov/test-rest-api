import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  
  @IsDateString()
  date: Date;

  @IsString()
  user: string;

  @IsString()
  doctor: string;

  @IsBoolean()
  active: boolean;
}
