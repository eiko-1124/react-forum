import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { upload } from '#/entity/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([upload])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
