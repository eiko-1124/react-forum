import { Module } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { AlgorithmController } from './algorithm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plate])],
  controllers: [AlgorithmController],
  providers: [AlgorithmService]
})
export class AlgorithmModule { }
