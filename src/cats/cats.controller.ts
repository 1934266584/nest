// Nest以相同的方式提供其余的端点装饰器- @Get(),@Post(), @Put() 、 @Delete()、 @Patch()、 @Options()、 @Head()和 @All()。这些表示各自的HTTP请求方法
import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('404')
  async throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('401')
  async throwError1() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'this is a custom message',
    }, 403);
  }

  // 默认情况下，响应的状态码总是200，除了 POST 请求外，此时它是201，我们可以通过在处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。
  @Post()
  @HttpCode(200)
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    console.log(createCatDto);
    this.catsService.created(createCatDto);
    return 'This action adds a new cat';
  }

  // 路由通配符
  @Get('ab*cd')
  findAllType(): string {
    return 'This route uses a wildcard';
  }

  @Get('type/:id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action return a #${params.id} cat`;
  }

  // async/await 支持
  @Get('eeee')
  async findEeee(): Promise<any[]> {
    return [];
  }

  // Rxjs 中 observable流
  @Get('dd')
  findDd(): Observable<any[]> {
    console.log('dd');
    return of([]);
  }
}
