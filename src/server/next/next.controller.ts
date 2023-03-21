import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextService } from './next.service';
import nextServer from '../next.app';

const handle = nextServer.getRequestHandler()

@Controller()
export class NextController {
  constructor(private readonly nextService: NextService) { }
  @Get('*')
  handle(@Req() req: Request, @Res() res: Response) {
    return handle(req, res)
  }
}
