import { Module } from "@nestjs/common";
import { VerbsService } from "./verbs.service";
import { VerbsController } from "./verbs.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [VerbsController],
  providers: [VerbsService],
})
export class VerbsModule {}
