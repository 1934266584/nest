import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// 在几个模块之间共享 CatsService 实例。 我们需要把 CatsService 放到 exports 数组中
// @Global 装饰器使模块成为全局作用域
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
