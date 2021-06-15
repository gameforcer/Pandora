import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { BoxerController } from './boxer/boxer.controller';
import { UserService } from './service/user/user.service';
import { BoxerService } from './service/boxer/boxer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';
import { BoxerEntity } from './entity/boxer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BoxerEntity]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        })],
  controllers: [ControllerController, BoxerController],
  providers: [UserService, JwtStrategy, BoxerService]
})
export class UserModule {}