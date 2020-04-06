import * as jwt from 'jsonwebtoken'
import { User } from './../../middleware/user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class TokenService {
    //constructor(private readonly jwtService: JwtService) {}
    constructor(private readonly configService: ConfigService) {}

    /**
     * Generates the JWT token using user details
     * @param user User details
     */
    generateToken(user: User) : {} {
        let payload = `{
            "email":"${user.email}",
            "first_name":"${user.first_name}",
            "last_name":"${user.last_name}",
            "roles":${JSON.stringify(user.roles)}
        }`

        //TODO
        // Get JWT_SECRET from Consule K-V or Vault
        // Get expiresIn from Consul and set it on the token
        const token = jwt.sign(payload, 
                               this.configService.get<string>('JWT_SECRET'))

        return {
            expires_in: this.configService.get<any>('JWT_EXPIRES_IN') ,
            access_token: token,
            status: 200
        }
    }
}
