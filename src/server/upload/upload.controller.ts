import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { uploadImageRes, uploadVideoRes } from './dto/upload.dto';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File): Promise<uploadImageRes> {
    return this.uploadService.uploadImage(file)
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(@UploadedFile() file: Express.Multer.File): Promise<uploadVideoRes> {
    return this.uploadService.uploadVideo(file)
  }
}
