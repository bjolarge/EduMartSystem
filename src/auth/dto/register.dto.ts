import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength, Validate} from 'class-validator';
import { MatchPasswordValidator } from 'src/user/validators/match-password.validator';
export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
   
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/)
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Validate(MatchPasswordValidator, ['password'])
    confirmPassword: string;
    // confirmPassword:string;
}