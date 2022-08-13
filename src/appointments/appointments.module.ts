import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AppointmentSchema,
  Appointment,
} from '../schemas/appointment.schema';
import { AppointmentsRepository } from './appointments.repository';
import { UsersModule } from '../users/users.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    UsersModule,
    DoctorsModule,
    NotificationsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
