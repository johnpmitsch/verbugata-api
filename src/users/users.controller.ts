import { Controller, Request, Body, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "./users.service";
import { Prisma, User } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("login")
  async login(@Body() req) {
    console.log(req.user);
    return this.authService.login(req.user, req.password);
  }

  @Post("register")
  async register(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(userData);
  }
}
