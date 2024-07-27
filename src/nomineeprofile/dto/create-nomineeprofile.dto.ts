import { IsNotEmpty, IsString } from "class-validator";

export class CreateNomineeprofileDto {
    @IsString()
    @IsNotEmpty()
    nominationalCategory:string;

    @IsString()
    @IsNotEmpty()
    aboutYou:string;

    @IsString()
    @IsNotEmpty()
    Achievements:string;
}
