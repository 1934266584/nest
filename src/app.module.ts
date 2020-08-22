import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { DogsController } from './dogs/dogs.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

// 默认情况下，模块是单例
@Module({
  imports: [CatsModule],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
