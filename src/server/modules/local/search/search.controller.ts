import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { allRes, simpleSearchRes } from './dto/search.dto';

@Controller('/api/local/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get('simpleSearch')
  simpleSearch(@Query('keyWord') keyWord: string): Promise<simpleSearchRes> {
    return this.searchService.simpleSearch(keyWord)
  }

  @Get('all')
  getAll(@Query('keyWord') keyWord: string, @Query('page') page: number): Promise<allRes> {
    return this.searchService.getAll(keyWord, page)
  }
}
