import { Controller, Get } from '@nestjs/common';

@Controller('topic')
export class TopicController {
  @Get()
  get() {
    return 'hello';
  }
}
