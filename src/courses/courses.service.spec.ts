import { randomUUID } from 'crypto';
import { CoursesService } from '../database/courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCoursesRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at,
      },
    ];
    expectOutputCourses = {
      id,
      name: 'test',
      description: 'test description',
      created_at,
      tags: expectOutputTags,
    };
    mockCoursesRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };
    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCoursesRepository.save).toHaveBeenCalled(); // espera que a método save tenha sido chamado.
    expect(expectOutputCourses).toStrictEqual(newCourse); // testa se os objetos têm a mesma estrutura e tipos.
  });

  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;

    const courses = await service.findAll();
    expect(mockCoursesRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should gets a courses by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;

    const course = await service.findOne(id);
    expect(mockCoursesRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockCoursesRepository.preload).toHaveBeenCalled(); // espera que a método save tenha sido chamado.
    expect(mockCoursesRepository.save).toHaveBeenCalled(); // espera que a método save tenha sido chamado.
    expect(expectOutputCourses).toStrictEqual(course); // testa se os objetos têm a mesma estrutura e tipos.
  });

  it('should delete a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;

    const courseRemove = await service.remove(id);

    expect(mockCoursesRepository.findOne).toHaveBeenCalled(); // espera que a método save tenha sido chamado.
    expect(mockCoursesRepository.remove).toHaveBeenCalled(); // espera que a método save tenha sido chamado.
    expect(expectOutputCourses).toStrictEqual(courseRemove); // testa se os objetos têm a mesma estrutura e tipos.
  });
});
