import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile, UseInterceptors } from '@nestjs/common';
import { NomineeprofileService } from './nomineeprofile.service';
import { CreateNomineeprofileDto } from './dto/create-nomineeprofile.dto';
import { UpdateNomineeprofileDto } from './dto/update-nomineeprofile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('nomineeprofile')
export class NomineeprofileController {
  constructor(private readonly nomineeprofileService: NomineeprofileService) {}

  @Post()
  create(@Body() createNomineeprofileDto: CreateNomineeprofileDto) {
    return this.nomineeprofileService.create(createNomineeprofileDto);
  }

  @Get()
  findAll() {
    return this.nomineeprofileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomineeprofileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomineeprofileDto: UpdateNomineeprofileDto) {
    return this.nomineeprofileService.update(id, updateNomineeprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomineeprofileService.remove(id);
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // I stored my files in the uploads folder
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFileDto) {
    console.log(file);
    console.log(body);
    return { message: 'File uploaded successfully', file };
  }
}
