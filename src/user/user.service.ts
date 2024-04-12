import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as _ from 'lodash';
import { PasswordResetService } from '../password_reset';
import { EmailService, UtilService } from '../utils';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { IUser } from 'src/database';
import { verifyAccount } from 'src/utils/email.template';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
    @Inject(UtilService)
    private readonly utilService: UtilService,
    @Inject(PasswordResetService)
    private readonly passwordResetService: PasswordResetService,
    @Inject(EmailService)
    private readonly emailService: EmailService,

    @Inject('CALL_SERVICE') private readonly emailQueue: ClientProxy,
  ) {}

  public async create(data: CreateUserDto) {
    Logger.log('Running UserService:create');
    // try {
    await this.throwIfUserExists(data);

    // await this.keyCloakadmin.createUser({
    //   email: data.email,
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   password: data.password,
    //   role: data.role,
    // });

    // Hash password
    data.password = await this.utilService.hashPassword(data.password);

    if (data.device_token) {
      data.devices = {
        token: data.device_token,
      };
      delete data.device_token;
    }

    data.login_count = 1;

    const verifyOTP = this.utilService.generateOTP();
    data.otp = verifyOTP;

    // Create user
    const user = await this.userRepo.createWithGraph({
      ...data,
      email: data.email.toLowerCase(),
    });
    // const user = await this.userRepo.create({ ...data, do_token: doTokens });

    // Delete password from the user's data graph
    delete user.password;

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, email: user.email, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
    } catch (e: any) {
      // Delete user and address if token generation fails
      await this.rollbackUserAccount(user);

      // Throw error
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }

    /*
     * Todo: call the wallet service to create a wallet for the user
     *  if the wallet creation fails, delete the user and address
     *  just like when the token generation fails
     **/

    /*
     * Todo: send welcome email to user's email address. This should be done after the wallet creation
     *  because the wallet creation is an async operation.
     *  The email should be sent via the notification service.
     **/

    await this.emailQueue.emit('email', {
      to: user.email,
      subject: 'Welcome to PlutoAI',
      html: verifyAccount(data.first_name, verifyOTP),
      text: `Your OTP is: ${verifyOTP}`,
    });

    return { user, auth_token: token };
  }

  private async throwIfUserExists(data: CreateUserDto): Promise<void> {
    let existingUser;

    // check if user exists using email
    if (data.email) {
      existingUser = await this.userRepo.findOne({ email: data.email });
    }

    if (existingUser) {
      throw new ConflictException('User with the email address already exists');
    }

    // check if user exists using phone number
    if (!existingUser && data.phone) {
      existingUser = await this.userRepo.findOne({ phone: data.phone });
    }

    if (existingUser) {
      throw new ConflictException('User with the phone number already exists');
    }
  }

  private static extractUserAddress(data: CreateUserDto) {
    const address = _.pick(data, [
      'address',
      'line',
      'zip_code',
      'city',
      'state',
      'country',
    ]);

    return [address];
  }

  private static cleanUpUserData(data: CreateUserDto): void {
    // delete data.club_name;
    return;
  }

  private async rollbackUserAccount(user: any): Promise<void> {
    await this.userRepo.delete(user.id);
  }

  public async login(loginData: LoginUserDto): Promise<any> {
    Logger.log('UserService.Login');

    Logger.log("login debug: I'm starting from here");
    const user = await this.userRepo.findOne({ email: loginData.email });

    Logger.log('Pretty sure this is the same command');
    // try {
    //   const keyCloakAuth = await this.keyCloak.login(
    //     loginData.email,
    //     loginData.password,
    //   );

    //   console.log('====================================');
    //   console.log({ keyCloakAuth });
    //   console.log('====================================');
    // } catch (error) {
    //   throw new ConflictException('Login Error Please check your credentials');
    // }

    if (!user) {
      throw new ConflictException('User with the email address does not exist');
    }

    // Check if password matches
    const isPasswordMatched = await this.utilService.comparePassword(
      loginData.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new ConflictException('Password does not match');
    }

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, email: user.email, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
      // Update login count
      await this.userRepo.update(user.id, {
        login_count: user.login_count + 1,
      });
    } catch (e: any) {
      throw new InternalServerErrorException(
        `Error generating JWT token:. ${e.message}`,
      );
    }
    delete user.password;

    return { user, auth_token: token };
  }

  public async findById(id: string): Promise<IUser> {
    const user = await this.userRepo.findOneWithTwoGraphs(
      { id },
      'organizations',
      'organizationRoles',
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(id: string, data: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (data.password) {
      data.password = await this.utilService.hashPassword(data.password);
    }
    return this.userRepo.update(id, data);
  }

  public async findAll() {
    return this.userRepo.findAll();
  }

  // public async inviteUser(data: CreateUserDto) {
  //   const generatedPassword = await this.utilService.generatePassword();
  //   const user = await this.create({ password: generatedPassword, ...data });
  //   if (!user) {
  //     throw new InternalServerErrorException('Error creating user');
  //   }
  //   await this.emailService.sendEmail({
  //     to: data.email,
  //     subject: 'Invitation to join the club - cloak',
  //     html: `<p>Hi ${data.organization_name}</p>
  //     <br>
  //     <p>You've been invited to join cloak as a coaching staff.</p>
  //     <p>Please find below your Login credentials</p>
  //     <br>
  //     <p><strong>Email:</strong> ${data.email}</p>
  //     <p><strong>Password:</strong> ${generatedPassword}</p>
  //     <br>
  //     <p>Please change your password after you login</p>
  //     <br>
  //     <br>
  //     <p>Thanks,</p>
  //     <p>cloak Team</p>
  //     `,
  //     text: `Your invitation to join the club has been sent to ${data.email}`,
  //   });
  //   return user;
  // }

  public async sendPasswordResetEmail(email: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const generatedCode = nanoid(6);
    const generatePasswordResetToken = await this.passwordResetService.create({
      user_id: user.id,
      token: generatedCode,
    });
    await this.emailService.sendEmail({
      to: email,
      subject: 'Reset password',
      html: `<p>kindly find your reset password code: ${generatedCode}</p>`,
      text: `code: ${generatedCode}`,
    });
    return generatePasswordResetToken;
  }

  public async resetPassword(email: string, password: string, code: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordResetToken = await this.passwordResetService.findOne({
      user_id: user.id,
      token: code,
    });
    if (!passwordResetToken) {
      throw new NotFoundException('Invalid code');
    }
    const hashedPassword = await this.utilService.hashPassword(password);
    await this.userRepo.update(user.id, { password: hashedPassword });
    await this.passwordResetService.delete(passwordResetToken.id);
    return user;
  }

  public async delete(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.delete(id);
  }

  public async verifyEmail(email: string, otp) {
    const user = await this.userRepo.findOne({ email });
    if (user && user.otp === otp) {
      await this.userRepo.update(user.id, {
        email_verified: true,
        otp: null,
      });
      return 'Verification successful';
    }
    throw new UnauthorizedException('Verification failed');
  }
}
