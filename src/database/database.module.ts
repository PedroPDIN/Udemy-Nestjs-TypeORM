import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get<string>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [Course, Tag],
          synchronize: false, // apenas pode ser usada apenas em processo de desenvolvimento. E jamais em produção.
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
