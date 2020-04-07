import { Controller, Get, Logger } from '@nestjs/common'
import { AppService } from './app.service'

const logger = new Logger()

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  hello() {
    logger.log("Inside AppController::hello()")
    return this.appService.userServiceHello()
  }

  @Get()
  health() {
    logger.log("Inside AppController::hello()")
    return this.appService.health()
  }

  @Get('error')
  error() {
    logger.log("WRONG URL")
    //Return appropriate error code
    return "ERROR"
  }

}
