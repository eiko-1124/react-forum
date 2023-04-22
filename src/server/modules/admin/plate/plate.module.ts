import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { upload } from '#/entity/upload.entity';
import { invitation } from '#/entity/invitation.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plateSubscribe, plate, upload, invitationHistory])],
  controllers: [PlateController],
  providers: [PlateService]
})
export class PlateModule { }
