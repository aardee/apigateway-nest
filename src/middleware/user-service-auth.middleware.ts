import { TokenService } from './../service/token/token.service';
import { UserService } from './user/user.service';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { map } from 'rxjs/operators'

const logger = new Logger()

@Injectable()
export class UserServiceAuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService,
              private tokenService: TokenService) {}

  async use(req: any, res: any, next: () => void) {
    logger.log("User Service Auth Moddleware called...")
    await this.userService.authenticate(req).then((data) => {
      logger.log(req.headers)
      logger.log(data)

      let jwt = this.tokenService.generateToken(data)

      //Modify request header with the internal JWT Token that include USER details
      req.headers['authorization'] = `token ${jwt['access_token']}`
    }).catch((error) => {
      logger.log(error)
    })
    next()
  }
}