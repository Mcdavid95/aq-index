import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { EnvironmentService } from '../configs';
import { IUser } from '../database';
import { UserService } from '../user';
import { EnvironmentService } from '@aq-index/environment-service';

const { jwt_secret } = EnvironmentService.getAll();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // @Inject(UserService)
  // private readonly userService: UserService;
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }

  async getUserPayload(payload: any): Promise<IUser> {
    const user: IUser | null = await this.userService.findById(payload.aud);

    if (!user) {
      throw new Error('UserModel not found.');
    }

    return user;
  }
}
