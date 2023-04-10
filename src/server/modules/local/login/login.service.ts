import { user } from '#/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hasUserRes, recoverForm, recoverRes, registerForm, registerRes, sendVerifyCodeRes, signInForm, signInRes } from './dto/login.dto';
import { createId, sendEmail } from '#/utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>
  ) { }

  async signIn(signInForm: signInForm): Promise<signInRes> {
    const res: signInRes = {
      res: 1
    }
    try {
      const userRes: user[] = await this.userRepository.find({ select: { uid: true, name: true }, where: { ...signInForm } })
      if (userRes.length === 0) res.res = 2
      else {
        res.name = userRes[0].name
        res.id = userRes[0].uid
      }
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async register(registerForm: registerForm): Promise<[registerRes, string]> {
    const res: registerRes = {
      res: 1
    }
    const uid = createId()
    try {
      const name: number = await this.userRepository.count({ where: { name: registerForm.name } })
      if (name !== 0) {
        res.res = 2
      }
      const email: number = await this.userRepository.count({ where: { email: registerForm.email } })
      if (email !== 0) {
        res.res = 3
      }
      await this.userRepository.insert({ ...registerForm, uid })
      return [res, uid]
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return [res, uid]
  }

  async hasUser(params: { name?: string, email?: string }): Promise<hasUserRes> {
    const res: hasUserRes = {
      res: 1
    }
    try {
      const user: number = await this.userRepository.count({ where: { ...params } })
      if (user === 0) res.res = 2
      return res
    } catch (error) {
      res.res = -1
      return res
    }
  }

  async sendVerifyCode(params: { name?: string, email?: string }): Promise<sendVerifyCodeRes> {
    const res: sendVerifyCodeRes = {
      res: 1,
    }
    try {
      let email: string | undefined = params.email
      if (!email) {
        const query: user[] = await this.userRepository.find({ select: { email: true }, where: { ...params } })
        email = query[0].email
      }
      const code = String(Math.floor(Math.random() * 900000) + 100000)
      const sendRes = await sendEmail('forum验证码', `你的验证码为${code},5分钟内有效`, email)
      if (sendRes) { res.code = code, res.email = email }
      else res.res = 2
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async recover(recoverForm: recoverForm): Promise<recoverRes> {
    const res: recoverRes = {
      res: 1
    }
    try {
      const query: recoverForm = {
        email: recoverForm.email
      }
      if (recoverForm.name) query.name = recoverForm.name
      const updateRes = await this.userRepository.update({ ...query }, { pswd: recoverForm.pswd })
      if (updateRes.affected === 0) res.res = 2
      else {
        const sUser: user[] = await this.userRepository.find({ select: { uid: true, name: true }, where: { email: query.email } })
        if (sUser.length === 0) res.res = 2
        else {
          res.id = sUser[0].uid
          res.name = sUser[0].name
        }
      }
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }
}
