import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './jwt-payload';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository :UserRepository,
        private jwtService:JwtService
    ){
       
    }
    
    async signUp(authDto:AuthDto):Promise<number>{
      return this.userRepository.signUp(authDto);
    }

    async signin(authDto:AuthDto):Promise<{accessToken: string}>{
      const username=await this.userRepository.validateUser(authDto);
      if (!username) {
        throw new UnauthorizedException('Invalid crendetials');
      }

      const payload:JwtPayload={username};
      const accessToken =await this.jwtService.sign(payload);

      return{accessToken};
    }

}
