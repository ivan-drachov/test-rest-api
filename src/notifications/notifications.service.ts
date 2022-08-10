import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NotificationsService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async createCronNotification(appointment_id, user, doctor, date) {

    const typeTime = {
      time2h: '2h',
      time24h: '24h',
    };

    const date24h = new Date(date);
    date24h.setDate(date24h.getDate() - 1);

    const date2h = new Date(date);
    date2h.setTime(date2h.getTime() - 2 * 3600 * 1000);

    const job2h = new CronJob(date2h, () => {
      this.writeMessageToLog(
        appointment_id,
        user,
        doctor,
        date,
        typeTime.time2h,
      );
    });
    const job24h = new CronJob(date24h, () => {
      this.writeMessageToLog(
        appointment_id,
        user,
        doctor,
        date,
        typeTime.time24h,
      );
    });

    await this.schedulerRegistry.addCronJob(`${Date.now()} - 2h - ${user} - ${appointment_id}`, job2h );
    job2h.start();
    console.log('Задание стартует ' + date2h);
    await this.schedulerRegistry.addCronJob(`${Date.now()} - 24h - ${user} - ${appointment_id}`,job24h );
    job24h.start();
    console.log('Задание стартует ' + date24h);

    return 'Уведомление создано';
  }

  async writeMessageToLog(appointment_id, user, doctor, date, type) {
    const allert2h =
      Date.now() +
      ' Привет, ' + user.name +'! Вам через 2 часа к ' + doctor.spec +' в ' + date +'\n';
    const allert1d =
      Date.now() +
      ' Привет, ' + user.name +'! Напоминаем что Вы записаны к ' + doctor.spec +' завтра в ' + date +'\n';

    if (type === '2h') {
      const writeStream = fs.createWriteStream('notifications.log');
      writeStream.write(allert2h, 'utf-8');
      writeStream.on('finish', () => {
        console.log('Данные добавлены в лог');
      });
      writeStream.end();
    }
    if (type === '24h') {
      const writeStream = fs.createWriteStream('notifications.log');
      writeStream.write(allert1d, 'utf-8');
      writeStream.on('finish', () => {
        console.log('Данные добавлены в лог');
      });
      writeStream.end();
    }
  }
}
