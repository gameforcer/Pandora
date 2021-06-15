import { Controller, Get, Post, Body , Request, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user/user.service';
import { UserDto } from '../dto/user.dto'
import { JwtAuthGuard } from '../guard/jwt-login.guard';


@Controller('user')
export class ControllerController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() user: UserDto): Promise<string>{
        return this.userService.create(user);
    }

    @Post('login')
    login(@Body() user: UserDto): Promise<any>{
        return this.userService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return {id: req.user.id, email: req.user.email};
  }

  @Post('/all')
  load(@Body() userID: number): Promise<any>{
      return this.userService.load(userID);
  }
}