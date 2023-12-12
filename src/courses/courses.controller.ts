import { CoursesService } from '../database/courses.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesService.create(createCourseDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
    @Res() response,
  ) {
    this.coursesService.update(id, updateCourseDTO);
    return response.status(200).json(updateCourseDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
