import { Module } from '@nestjs/common';
import { CampaignModel } from './campaign.service';

@Module({
  providers: [CampaignModel],
  exports: [CampaignModel],
})
export class DbCampaignModule {}
