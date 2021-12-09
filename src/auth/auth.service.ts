import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: "john@john.com",
      },
    });
    console.log(pass);
    if (user && user.password === pass) {
      const payload = { username: user.email, sub: user.id };
      console.log(this.jwtService.sign(payload));
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
