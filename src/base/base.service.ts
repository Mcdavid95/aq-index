import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransformResponse } from './base.interface';

export class Exception extends HttpException {
  constructor(public responseObject: TransformResponse) {
    super(responseObject, HttpStatus[responseObject.status]);
  }

  // private status: number

  conflict(): Promise<HttpException> {
    return Promise.reject({
      error: 'err',
      message: 'Conflict',
    });
  }
}
@Injectable()
export class BaseService {
  public transformResponse(
    message: string,
    data: any = {},
    statusCode: number = HttpStatus.OK,
  ): TransformResponse {
    return {
      status: HttpStatus[statusCode],
      message,
      data,
    };
  }
  public handleException(status: string, message: string): Promise<unknown> {
    return Promise.reject(
      new Exception({
        status,
        message,
      }),
    );
  }
}
