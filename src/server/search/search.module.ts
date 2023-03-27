import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plateUser } from '#/entity/plateUser.entity';
import { plate } from '#/entity/plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plateUser, plate])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule { }
