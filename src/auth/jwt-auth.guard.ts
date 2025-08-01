import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = decoded; // Attach user data
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}