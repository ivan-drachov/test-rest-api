import { IsString } from 'class-validator';

export class AcceptAppointmentDto {

  @IsString()
  appointment_id: string;
}