import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Get,
  Param,
  Put,
  Request,
  Logger,
} from '@nestjs/common';
import { BaseService } from '../base';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Get('')
  public async findAll() {
    const users = await this.userService.findAll();
    return this.baseService.transformResponse(
      'Users fetched successfully',
      users,
      HttpStatus.OK,
    );
  }

  @Post('/signup')
  public async create(@Body() data: CreateUserDto) {
    const newUser = await this.userService.create(data);

    return this.baseService.transformResponse(
      'User created successfully',
      newUser,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  public async login(@Body() LoginUserDto: LoginUserDto) {
    Logger.log('Running UserService:login', LoginUserDto);
    const user = await this.userService.login(LoginUserDto);
    return this.baseService.transformResponse(
      'User logged in successfully',
      user,
      HttpStatus.OK,
    );
  }

  // @Post('/invite')
  // public async inviteUser(data: CreateUserDto) {
  //   const user = await this.userService.inviteUser(data);
  //   return this.baseService.transformResponse(
  //     'User created successfully and invite sent to email',
  //     user.user,
  //     HttpStatus.CREATED,
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('me')
  public async getLoggedInUser(@Request() req) {
    // const user = await this.userService.findById(id);
    // delete user.password;

    return this.baseService.transformResponse(
      'User retrieved successfully',
      undefined,
      HttpStatus.OK,
    );
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);

    delete user.password;

    return this.baseService.transformResponse(
      'User retrieved successfully',
      { user },
      HttpStatus.OK,
    );
  }

  @Post('/password-reset-request')
  public async passwordResetRequest(@Body() data: UpdateUserDto) {
    await this.userService.sendPasswordResetEmail(data.email);

    return this.baseService.transformResponse(
      `Password reset code has  has been sent to Email: ${data.email}`,
      {},
      HttpStatus.OK,
    );
  }

  @Post('/reset-password')
  public async resetPassword(@Body() data: UpdateUserDto) {
    await this.userService.resetPassword(
      data.email,
      data.password,
      data.reset_code,
    );

    return this.baseService.transformResponse(
      `Password reset code has  has been sent to Email: ${data.email}`,
      {},
      HttpStatus.OK,
    );
  }

  @Put(':id')
  public async updateUserInfo(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, data);

    delete updatedUser.password;
    return this.baseService.transformResponse(
      'User updated successfully',
      { user: updatedUser },
      HttpStatus.OK,
    );
  }
}
