import { dataSourceOptions } from './database.module';
import { DataSource } from 'typeorm';
import { CreateCoursesTable1702136234835 } from 'src/migration/1702136234835-CreateCoursesTable';
import { CreateTagsTable1702144300243 } from 'src/migration/1702144300243-CreateTagsTable';
import { CreateCoursesTagsTable1702146081170 } from 'src/migration/1702146081170-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1702147705276 } from 'src/migration/1702147705276-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1702149501517 } from 'src/migration/1702149501517-AddTagsIdToCoursesTagsTable';

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
