import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule],
})
export class AppModule {}
