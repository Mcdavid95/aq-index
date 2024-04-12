import axios from 'axios';

export class APIService {
  public async calls(url: string, api_key?: string, api_secret?: string) {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (api_key && api_secret) {
      headers.Authorization = `token ${api_key}:${api_secret}`;
    }
    return axios.create({
      baseURL: url,
      headers: headers,
    });
  }
}
