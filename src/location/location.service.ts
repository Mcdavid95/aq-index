import { APIService } from '@aq-index/api-service';
import { EnvironmentService } from '@aq-index/environment-service';
import { Inject, Injectable } from '@nestjs/common';

const env = EnvironmentService.getAll();

@Injectable()
export class LocationService {
  @Inject(APIService)
  private readonly apiService: APIService;

  public async getLocationByIPAdresss(ipAddress: string): Promise<any> {
    const apiKey = env.accu_api_key;
    if (!apiKey) throw new Error('Accu Weather API Key not found');

    const apiUrl = 'https://dataservice.accuweather.com';
    const apiRequest = await this.apiService.calls(apiUrl);
    console.log('====================================');
    console.log(apiRequest);
    console.log('====================================');
    const newReq = await apiRequest.get('/locations/v1/cities/ipaddress', {
      params: { ipAddress, apikey: apiKey, language: 'en-us' },
    });
    return { ...newReq.data.GeoPosition, ...newReq.data.AdministrativeArea };
  }

  public async getAirQualityIndex(lon: string, lat: string) {
    const apiKey = env.open_weather_api_key;
    if (!apiKey) throw new Error('Open Air Index API Key is missing!');
    const apiUrl = 'https://api.openweathermap.org';
    const apiVersion = '2.5';
    const apiRequest = await this.apiService.calls(apiUrl);
    const newReq = await apiRequest.get(`/data/${apiVersion}/air_pollution`, {
      params: {
        lon,
        lat,
        appid: apiKey,
      },
    });
    return newReq.data;
  }

  public async getGPTOutline(lon: string, lat: string) {
    const apiKey = env.open_weather_api_key;
    if (!apiKey) throw new Error('Open Air Index API Key is missing!');
    const apiUrl = 'https://api.openweathermap.org';
    const apiVersion = '2.5';
    const apiRequest = await this.apiService.calls(apiUrl);
    const newReq = await apiRequest.get(`/data/${apiVersion}/air_pollution`, {
      params: {
        lon,
        lat,
        appid: apiKey,
      },
    });
    return newReq.data;
  }
}
