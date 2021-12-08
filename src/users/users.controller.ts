import { Controller, Request, Body, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma_client";
import { User, Prisma } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(
    @Body() userData: { name: string; email: string }
  ): Promise<Prisma.UserModel> {
    return this.usersService.createUser(userData);
  }
}
