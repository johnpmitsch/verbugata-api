import { Injectable } from "@nestjs/common";
import prisma from "../prisma_client";

@Injectable()
export class VerbsService {
  async findOne(id: number) {
    const verb = await prisma.verb.findUnique({ where: { id } });
    return verb;
  }
}
