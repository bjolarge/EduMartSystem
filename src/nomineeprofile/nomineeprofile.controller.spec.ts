import { Test, TestingModule } from '@nestjs/testing';
import { NomineeprofileController } from './nomineeprofile.controller';
import { NomineeprofileService } from './nomineeprofile.service';

describe('NomineeprofileController', () => {
  let controller: NomineeprofileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomineeprofileController],
      providers: [NomineeprofileService],
    }).compile();

    controller = module.get<NomineeprofileController>(NomineeprofileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
