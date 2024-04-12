import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseService } from 'src/base';
import {
  CreateUserDto,
  LoginUserDto,
  UserService,
  VerifyEmailDto,
} from 'src/user';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Inject(BaseService)
  private readonly baseService: BaseService;
  @Inject(UserService)
  private readonly userService: UserService;

  @Post('/signup')
  public async signup(@Body() data: CreateUserDto) {
    Logger.log('Running AuthController:signup');
    const newUser = await this.userService.create(data);

    return this.baseService.transformResponse(
      'User created successfully',
      newUser,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  public async login(@Body() data: LoginUserDto) {
    Logger.log('Running AuthController:login');
    const user = await this.userService.login(data);
    return this.baseService.transformResponse(
      'User logged in successfully',
      user,
      HttpStatus.OK,
    );
  }

  @Post('/verify-email')
  public async verifyEmail(@Body() data: VerifyEmailDto) {
    Logger.log('Running AuthController:login');
    const user = await this.userService.verifyEmail(data.email, data.otp);
    return this.baseService.transformResponse(
      'User email verification successful',
      user,
      HttpStatus.OK,
    );
  }
}
