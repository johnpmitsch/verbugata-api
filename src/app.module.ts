import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VerbsModule } from './verbs/verbs.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [VerbsModule],
})
export class AppModule {}
