import { Test, TestingModule } from '@nestjs/testing';
import { NomineeprofileService } from './nomineeprofile.service';

describe('NomineeprofileService', () => {
  let service: NomineeprofileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomineeprofileService],
    }).compile();

    service = module.get<NomineeprofileService>(NomineeprofileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
