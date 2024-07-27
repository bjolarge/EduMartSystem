import { Module } from '@nestjs/common';
import { NomineeprofileService } from './nomineeprofile.service';
import { NomineeprofileController } from './nomineeprofile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomineeprofile } from './entities/nomineeprofile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Nomineeprofile])],
  controllers: [NomineeprofileController],
  providers: [NomineeprofileService],
})
export class NomineeprofileModule {}
