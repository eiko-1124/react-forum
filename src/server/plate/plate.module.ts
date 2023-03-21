import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plate])],
  controllers: [PlateController],
  providers: [PlateService]
})
export class PlateModule { }