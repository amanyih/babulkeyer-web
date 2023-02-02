import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  add(a: number, b: number): number {
    return a + b;
  }
  sub(a: number, b: number): number {
    return a - b;
  }
  mult(a: number, b: number): number {
    return a * b;
  }
  div(a: number, b: number): number {
    return a / b;
  }
}
