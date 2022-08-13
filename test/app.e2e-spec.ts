import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe)
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST) --> user creating', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name: 'Natali', type: 'user', email: 'nat@ukr.net' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response)=>{
        expect(response.body).toEqual({
          _id: expect.any(String),
          name: 'Natali',
          type: 'user',
          email: 'nat@ukr.net',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      })
  });

  it('/doctors (POST) --> doctor creating', () => {
    return request(app.getHttpServer())
      .post('/doctors')
      .send({name: 'Peter Pen', type: 'doctor', spec: 'therapist', email: 'peterpen@ukr.net', free: true })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response)=>{
        expect(response.body).toEqual({
          _id: expect.any(String),
          name: 'Peter Pen',
          type: 'doctor',
          spec: 'therapist',
          email: 'peterpen@ukr.net',
          free: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      })
  });

  it('/users (POST) --> should return 400 on name or E-mail validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name: 333, type: 'user', email: 'invalid_email!ukr.net' })
      .expect('Content-Type', /json/)
      .expect(400)
      
  });

  it('/appointments (POST) --> appointment creating', () => {
    return request(app.getHttpServer())
      .post('/appointments')
      .send({user: '62f6248f5c0deecf8882e2cf', doctor: '62f624905c0deecf8882e2d3', date: '2022-10-10T04:55:15.997Z', active: true })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response)=>{
        expect(response.body).toEqual({
          _id: expect.any(String),
          user: '62f6248f5c0deecf8882e2cf',
          doctor: '62f624905c0deecf8882e2d3',
          active: true,
          date: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      })
  });

  it('/appointments (POST) --> should return 403 by appointment creating when doctor is busy', () => {
    return request(app.getHttpServer())
      .post('/appointments')
      .send({user: '62f35a48d135b3eecf4774c8', doctor: '62f369e8119d6082dfdda424', date: '2022-10-11T08:55:15.997+00:00', active: true })
      .expect('Content-Type', /json/)
      .expect(403)
      
  });

  it('/appointments (POST) --> appointment accepting', () => {
    return request(app.getHttpServer())
      .post('/appointments/accept/62f33ca1dfd80136a2914106')
      .send({user: '62f6248f5c0deecf8882e2cf', doctor: '62f624905c0deecf8882e2d3', date: '2022-10-10T04:55:15.997Z', active: true })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response)=>{
        expect(response.body).toEqual({
          acknowledged: true,
          modifiedCount: 1,
          upsertedId: null,
          upsertedCount: 0,
          matchedCount: 1
        })
      })
  });

});
