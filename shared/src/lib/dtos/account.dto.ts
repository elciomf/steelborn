import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(12)
  @IsNotEmpty()
  password: string;
}

export class UpdateAccountDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(12)
  @IsOptional()
  password?: string;
}
