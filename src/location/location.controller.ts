import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { LocationService } from './location.service';
import { BaseService } from 'src/base';

@Controller('locations')
export class LocationController {
  @Inject(LocationService)
  private readonly locationService: LocationService;

  @Inject(BaseService)
  private readonly _baseService: BaseService;

  @Get('/coord')
  public async getLocationByIp(@Req() req: any, @Query() query_data: any) {
    const location = await this.locationService.getLocationByIPAdresss(
      query_data.ipAddress,
    );
    return location;
  }

  @Get('/aqi')
  public async getAQI(@Query() data: any): Promise<any> {
    const aqiData = await this.locationService.getAirQualityIndex(
      data.lon,
      data.lat,
    );
    return aqiData;
  }
}
