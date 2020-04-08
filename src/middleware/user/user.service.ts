import { User } from './user.entity';
import { Injectable, Logger, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

const logger = new Logger()

@Injectable()
export class UserService {
    constructor(private httpService: HttpService) {}
    
    private readonly userServiceUrl = process.env.USER_SERVICE_URL + '/auth';

    authenticate(request) {
        logger.log("In UserService::authenticate")
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
