import { Controller, Get, Post, Body, Response, Query } from '@nestjs/common';
import jwt from 'jsonwebtoken'
import { LoginService } from './login.service';
import { hasUserRes, registerForm, sendVerifyCodeRes, signInForm, signInRes, recoverForm, recoverRes, registerRes } from './dto/login.dto';

@Controller('api/local/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('signIn')
  async signIn(@Response() response, @Body() signInForm: signInForm): Promise<void> {
    const res: signInRes = await this.loginService.signIn(signInForm);
    if (res.res == 1) {
      response.cookie('token', jwt.sign({
        name: res.name,
        id: res.id
      }, 'lysmane'), { maxAge: 86400000 })
    }
    response.send(res)
  }

  @Post('register')
  async register(@Response() response, @Body() registerForm: registerForm): Promise<void> {
    const [res, id]: [registerRes, string] = await this.loginService.register(registerForm);
    if (res.res == 1) {
      response.cookie('token', jwt.sign({
        name: registerForm.name,
        id: id
      }, 'lysmane'), { maxAge: 86400000 })
    }
    response.send(res)
  }

  @Get('hasUser')
  hasUser(@Query() params: { name?: string, email?: string }): Promise<hasUserRes> {
    return this.loginService.hasUser(params)
  }

  @Get('sendVerifyCode')
  sendVerifyCode(@Query() params: { name?: string, email?: string }): Promise<sendVerifyCodeRes> {
    return this.loginService.sendVerifyCode(params)
  }

  @Post('recover')
  async recover(@Response() response, @Body() recoverForm: recoverForm): Promise<void> {
    const res: recoverRes = await this.loginService.recover(recoverForm)
    if (res.res == 1) {
      response.cookie('token', jwt.sign({
        name: res.name,
        id: res.id
      }, 'lysmane'), { maxAge: 86400000 })
    }
    response.send(res)
  }
}
