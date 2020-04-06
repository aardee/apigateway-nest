import { ProxyServiceMiddleware } from './middleware/proxy-service.middleware';
import { Module, HttpModule, NestModule, MiddlewareConsumer} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserService } from './middleware/user/user.service'
import { UserServiceAuthMiddleware } from './middleware/user-service-auth.middleware'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { TokenService } from './service/token/token.service'

@Module({
  imports: [
    HttpModule, 
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, TokenService],
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserServiceAuthMiddleware, ProxyServiceMiddleware)
            .forRoutes("/")
  }
}
