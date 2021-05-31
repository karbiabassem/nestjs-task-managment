import { Req } from '@nestjs/common';
import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
    @Post('/signup')
    signUp( @Body(ValidationPipe) authDto:AuthDto ): Promise<number>{
       
       return this.authService.signUp(authDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authDto:AuthDto ):Promise<{accessToken: string}>{
        return this.authService.signin(authDto);
    }


    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User):Promise<void>{
        console.log(user);
        return;
    }
}
