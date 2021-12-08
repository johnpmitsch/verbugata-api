import { Injectable } from "@nestjs/common";
import prisma from "../prisma_client";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }
}
