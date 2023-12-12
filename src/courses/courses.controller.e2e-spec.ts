import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CoursesModule } from './courses.module';
import request from 'supertest';

describe('CoursesController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true, // para facilitar os testes e também pois não utilizaremos para os testes as migrations.
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'Node.js',
      description: 'Node.js',
      tags: ['nodejs', 'nestjs'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /cousers', () => {
    it('should create a course', async () => {
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201); // status code

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.name);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.tags).toHaveLength(2);
      expect(res.body.tags[0].name).toEqual(data.tags[0]);
      expect(res.body.tags[1].name).toEqual(data.tags[1]);
    });
  });

  describe('GET /cousers', () => {
    it('should list all course', async () => {
      const res = await request(app.getHttpServer())
        .get('/courses')
        .expect(200); // status code

      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.name);
      expect(res.body[0].created_at).toBeDefined();

      res.body.map((course) => {
        expect(course.tags).toHaveLength(2);
        expect(course.tags[0].name).toEqual(data.tags[0]);
        expect(course.tags[1].name).toEqual(data.tags[1]);
      });
    });
  });

  describe('GET /cousers/:id', () => {
    it('should gets a course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200); // status code

      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.tags).toHaveLength(2);
      expect(res.body.tags[0].name).toEqual(data.tags[0]);
      expect(res.body.tags[1].name).toEqual(data.tags[1]);
    });
  });

  describe.skip('PUT /cousers/:id', () => {
    it('should update a course', async () => {
      const updateData = {
        name: 'new course',
        description: 'new course',
        tags: ['nestjs', 'javascript', 'nodejs'],
      };

      const res = await request(app.getHttpServer())
        .put(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200); // status code

      console.log(res.body.tags[0]);

      expect(res.body.name).toEqual(updateData.name);
      expect(res.body.description).toEqual(updateData.description);
      expect(res.body.tags).toHaveLength(3);
      expect(res.body.tags[0]).toEqual(updateData.tags[0]);
      expect(res.body.tags[1]).toEqual(updateData.tags[1]);
      expect(res.body.tags[2]).toEqual(updateData.tags[2]);
    });
  });

  describe('DELETE /cousers/:id', () => {
    it('should delete a course by id', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204) // status code
        .expect({});
    });
  });
});
