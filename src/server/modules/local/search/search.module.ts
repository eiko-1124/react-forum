import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plate } from '#/entity/plate.entity';
import { user } from '#/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plate, user])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule { }
