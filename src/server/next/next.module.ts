import { Module } from '@nestjs/common';
import { NextService } from './next.service';
import { NextController } from './next.controller';

@Module({
  controllers: [NextController],
  providers: [NextService]
})
export class NextModule {}
