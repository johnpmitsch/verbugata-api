import { Injectable } from "@nestjs/common";
import prisma from "../prisma_client";

@Injectable()
export class VerbsService {
  findOne(id: number) {
    return prisma.verb.findUnique({ where: { id } });
  }
}
