import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength, Validate} from 'class-validator';
import { MatchPasswordValidator } from '../validators/match-password.validator';
export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Validate(MatchPasswordValidator, ['password'])
    confirmPassword: string;

     @IsString()
     @IsNotEmpty()
     address:string;

     @IsString()
     @IsNotEmpty()
     phoneNumber:string;
}