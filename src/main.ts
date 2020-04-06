import { UserServiceAuthMiddleware } from './middleware/user-service-auth.middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableCors();
  
  //Logging incoming request for info
  app.use((req, _, next) => {
    console.log(`PROCESSING: '${req.method} Method for '${req.originalUrl}'`);
    next();
  })

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
