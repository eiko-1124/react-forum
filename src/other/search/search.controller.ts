import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { allRes } from './dto/search.dto';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get('all')
  getAll(@Query('keyWord') keyWord: string): Promise<allRes> {
    return this.searchService.getAll(keyWord)
  }
}
