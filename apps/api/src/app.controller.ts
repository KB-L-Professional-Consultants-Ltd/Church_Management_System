import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { AppService } from './app.service';

@Public()
@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-health')
  async getDbHealth(): Promise<{
    status: string;
    databaseTime: string | null;
  }> {
    return this.appService.getDbHealth();
  }
}
