import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNomineeprofileDto } from './dto/create-nomineeprofile.dto';
import { UpdateNomineeprofileDto } from './dto/update-nomineeprofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nomineeprofile } from './entities/nomineeprofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NomineeprofileService {
  constructor( @InjectRepository(Nomineeprofile)
  private readonly NomineeRepository:Repository<Nomineeprofile>
  ){}

   async create(createNomineeDto:CreateNomineeprofileDto) { 
   const Nominee = await this.NomineeRepository.create(createNomineeDto)
    return this.NomineeRepository.save(Nominee);
  }

  findAll() {
    return this.NomineeRepository.find();
  }

  findOne(id) {
    const Nominee =  this.NomineeRepository.findOne({where: {id}});
    if(!Nominee){
      throw new NotFoundException(`Nominee with the given #${id} not found`);
    }
    return Nominee;
  }

  async update(id: string, updateNomineeDto: UpdateNomineeprofileDto) {
    const existingNominee= await this.NomineeRepository.preload({
      id:+id,
      ...updateNomineeDto,
      //flavors,
    });
    if(!existingNominee){
      throw new NotFoundException(`The Nominee with the given ${id} not found`);
    }
    return this.NomineeRepository.save(existingNominee);
  }

  async remove(id:string) {
   // const Nominee = await this.findOne(id);
   const Nominee  = await this.NomineeRepository.delete(id);

    if (Nominee.affected === 0) {
      throw new NotFoundException(`Nominee with ID "${id}" not found`);
    }
   // return this.NomineeRepository.remove(Nominee);
  }
}
