import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsObject,
  IsNumber,
  IsEnum,
} from 'class-validator';

export enum Theme {
  'dark' = 'dark',
  'light' = 'light',
  'moonlight' = 'moonlight',
}

export enum Role {
  'customer' = 'customer',
  'admin' = 'admin',
  'organization:admin' = 'organization:admin',
  'organization:maintainer' = 'organization:maintainer',
  'organization:billing' = 'organization:billing',
  'developer' = 'developer',
}

class DeviceDTO {
  @IsString()
  token: string;
}
export class LoginUserDto {
  /**
   * User's email
   */
  @IsString()
  @ApiProperty()
  email: string;

  /**
   * User's password
   */
  @IsString()
  @ApiProperty()
  password: string;

  /**
   * Firebase's password
   */
  @IsString()
  @IsOptional()
  device_token?: string;
}
export class CreateUserDto {
  /**
   * User's device token
   */
  @IsString()
  @IsOptional()
  device_token?: string;
  /**
   * User's first name
   */
  @IsString()
  @IsOptional()
  @ApiProperty()
  first_name?: string;
  /**
   * User's first name
   */
  @IsString()
  @IsOptional()
  @ApiProperty()
  last_name?: string;

  /**
   * User's username
   */
  @IsString()
  @IsOptional()
  logo?: string;

  /**
   * User owned devices
   */
  @IsObject()
  @IsOptional()
  devices?: DeviceDTO;

  /**
   * User's address
   */
  @IsString()
  @IsOptional()
  preferred_theme?: Theme;

  /**
   * User's clubname country
   */
  @IsNumber()
  @IsOptional()
  login_count?: number;

  /**
   * User's password
   */
  @IsString()
  @ApiProperty()
  password: string;

  /**
   * User's OTP
   */
  @IsString()
  @IsOptional()
  otp: string;

  /**
   * User's phone number
   */
  @IsPhoneNumber('NG', { message: 'Phone number is not valid' })
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  phone_verified?: boolean;

  /**
   * User's email address
   */
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiProperty()
  email: string;

  @IsBoolean()
  @IsOptional()
  email_verified?: boolean;

  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  @IsString()
  @IsOptional()
  reset_code?: string;

  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
export class VerifyEmailDto {
  /**
   * User's email
   */
  @IsString()
  @ApiProperty()
  email: string;

  /**
   * User's OTP
   */
  @IsString()
  @ApiProperty()
  otp: string;
}
