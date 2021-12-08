import { Controller, Request, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(@Request() req) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Get("ping")
  ping() {
    return "ping";
  }
}
