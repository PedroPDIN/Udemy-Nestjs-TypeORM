import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1702136234835 } from 'src/migration/1702136234835-CreateCoursesTable';
import { CreateTagsTable1702144300243 } from 'src/migration/1702144300243-CreateTagsTable';
import { CreateCoursesTagsTable1702146081170 } from 'src/migration/1702146081170-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1702147705276 } from 'src/migration/1702147705276-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1702149501517 } from 'src/migration/1702149501517-AddTagsIdToCoursesTagsTable';
import { Tag } from 'src/courses/entities/tags.entity';
import { Course } from 'src/courses/entities/courses.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false, // apenas pode ser usada apenas em processo de desenvolvimento. E jamais em produção.
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1702136234835,
    CreateTagsTable1702144300243,
    CreateCoursesTagsTable1702146081170,
    AddCoursesIdToCoursesTagsTable1702147705276,
    AddTagsIdToCoursesTagsTable1702149501517,
  ],
});
