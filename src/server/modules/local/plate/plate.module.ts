import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';
import { user } from '#/entity/user.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plate, user, plateSubscribe])],
  controllers: [PlateController],
  providers: [PlateService]
})
export class PlateModule { }
