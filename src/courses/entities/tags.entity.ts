import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Course } from './courses.entity';
import { randomUUID } from 'crypto';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  couses: Course[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() // Será executado sempre antes de um registro ser executado no banco de dados.
  generatedId() {
    if (this.id) return;
    this.id = randomUUID();
  }
}
