import { User } from './user.entity';
import { Injectable, Logger, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

const logger = new Logger()

@Injectable()
export class UserService {
    constructor(private httpService: HttpService) {}
    
    private readonly userServiceUrl = 'http://localhost:3001/auth';

    authenticate(request) {
        logger.log("In UserService::authenticate")
        logger.log(request.headers['authorization'])

        return this.authRequest(request).toPromise()
    }

    private authRequest(request: any) {
        let config = { 
            headers: { 
                'Authorization': request.headers['authorization'] 
            } 
        } 
        return this.httpService.post(this.userServiceUrl, {}, config).
            pipe(
                map((response) => {
                    return response.data;
                })
            );
    }
}
