import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VerbsModule } from "./verbs/verbs.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [VerbsModule, ConfigModule.forRoot(), AuthModule, UsersModule],
})
export class AppModule {}
