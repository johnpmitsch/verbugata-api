import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VerbsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const verb = await this.prisma.verb.findUnique({ where: { id } });
    return verb;
  }
}
