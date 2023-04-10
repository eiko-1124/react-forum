import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/admin/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get('all')
  getAll() {
    return 'hello'
  }
}
