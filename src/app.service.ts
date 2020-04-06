import { map } from 'rxjs/operators'
import { Injectable, Inject, HttpService, Dependencies, Logger } from '@nestjs/common'
import * as httpProxy from 'express-http-proxy'

const logger = new Logger()
const userServiceProxy = httpProxy('http://localhost:3001')

@Injectable()
@Dependencies(HttpService)
export class AppService {
  constructor(private http: HttpService) {}

  userServiceHello() {
    logger.log("inside userServiceHello")
    return "API Gateway"
  }
}
