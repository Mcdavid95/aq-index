import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { GptService } from './gpt.service';
import { BaseService } from 'src/base';

@Controller('gpts')
export class GptController {
  @Inject(GptService)
  private readonly gptService: GptService;

  @Inject(BaseService)
  private readonly _baseService: BaseService;

  @Post('')
  public async getOverview(@Req() req: any, @Body() query_data: any) {
    console.log('====================================');
    console.log(query_data);
    console.log('====================================');
    const gpt = await this.gptService.getGPTResponse(query_data.text);
    return gpt;
  }
}
