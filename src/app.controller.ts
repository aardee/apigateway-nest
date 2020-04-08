import { Controller, Get, Logger } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  hello() {
    console.log("Inside AppController::hello()")
    return this.appService.userServiceHello()
  }

  @Get('health')
  health() {
    return this.appService.health()
  }

  @Get('error')
  error() {
    console.log("WRONG URL")
    //Return appropriate error code
    return "ERROR"
  }

}
