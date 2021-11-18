import { Module } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { VerbsController } from './verbs.controller';

@Module({
  controllers: [VerbsController],
  providers: [VerbsService]
})
export class VerbsModule {}
