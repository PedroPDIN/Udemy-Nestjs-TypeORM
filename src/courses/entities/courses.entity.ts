import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import { Tag } from './tags.entity';
import { randomUUID } from 'crypto';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.couses, {
    cascade: true,
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() // Será executado sempre antes de um registro ser executado no banco de dados.
  generatedId() {
    if (this.id) return;
    this.id = randomUUID();
  }
}
