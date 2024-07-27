import { PartialType } from '@nestjs/swagger';
import { CreateNomineeprofileDto } from './create-nomineeprofile.dto';

export class UpdateNomineeprofileDto extends PartialType(CreateNomineeprofileDto) {}
