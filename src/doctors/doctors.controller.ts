import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';


@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorsService.createDoctor(createDoctorDto);
  }
}