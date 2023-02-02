import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/add')
  add(@Body() numbers: { first: number; second: number }) {
    const result: number = this.appService.add(numbers.first, numbers.second);
    return { result };
  }

  @Post('/sub')
  sub(@Body() numbers: { first: number; second: number }) {
    const result: number = this.appService.sub(numbers.first, numbers.second);
    return { result };
  }

  @Post('/div')
  div(@Body() numbers: { first: number; second: number }) {
    const result: number = this.appService.div(numbers.first, numbers.second);
    return { result };
  }
  @Post('/mult')
  mult(@Body() numbers: { first: number; second: number }) {
    const result: number = this.appService.mult(numbers.first, numbers.second);
    return { result };
  }
}
