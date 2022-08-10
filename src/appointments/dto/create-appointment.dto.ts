import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateAppointmentDto {
  
  @IsDate()
  date: Date;

  @IsString()
  user: string;

  @IsString()
  doctor: string;

  @IsBoolean()
  active: boolean;
}
