import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';
import { upload } from '#/entity/upload.entity';
import { plateUser } from '#/entity/plateUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plate, upload, plateUser])],
  controllers: [PlateController],
  providers: [PlateService]
})
export class PlateModule { }