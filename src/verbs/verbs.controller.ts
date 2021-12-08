import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { VerbsService } from "./verbs.service";

@Controller("verbs")
export class VerbsController {
  constructor(private readonly verbsService: VerbsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.verbsService.findOne(+id);
  }
}
