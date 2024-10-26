/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { SignInDto, SignUpDto } from '../../dto/authDto';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async authenticate(token: string) {
    const profile = await this.getProfile(token);
  
    let user = await this.prismaService.user.findUnique({
      where: { email: profile.data.email },
    });
  
    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email: profile.data.email,
          name: profile.data.name,
          givenName: profile.data.given_name,
          familyName: profile.data.family_name,
          picture: profile.data.picture,
          providerId: profile.data.id,
        },
      });
    }
    return this.generateTokens(user);
  }
  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.is_admin };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_SESSION_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_RT_SESSION_EXPIRATION,
    });
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }
  async getUser(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          picture: true,
          providerId: true,
          givenName: true,
          familyName: true,
          is_admin: true,
          createdAt: true,
          updatedAt: true,
          pushToken: false,
          // completedLessonCount: true,
          // courses: true,
          // lessonStatuses: true,
          // courseStatuses: true,
          // vocabularyStatuses: true,
          // notifications: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (err) {
      console.error('Error fetching user:', err.message);
      throw new UnauthorizedException('Error fetching user details');
    }
  }
  async getAccessTokenUser(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const user = await this.prismaService.user.findFirst({
        where: { refreshToken },
      });
      if (!user) throw new UnauthorizedException('Invalid user');
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.is_admin },
        { expiresIn: process.env.JWT_SESSION_EXPIRATION },
      );
  
      return { access_token: newAccessToken };
    } catch (err) {
      console.error('Token error:', err.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(token: string) {
    try {
      return await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
    } catch (error) {
      console.error('Failed to get profile:', error.message);
      throw new UnauthorizedException('Failed to get profile from Google');
    }
  }

  async revokeToken(token: string) {
    try {
      await axios.get(
        `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke token:', error.message);
      throw new UnauthorizedException('Failed to revoke token');
    }
  }

  //  Sign In
  async signIn(signInDto: SignInDto) {
    const { password, email } = signInDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordMatch = await argon2.verify(user.passwordHash, password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const payload = { sub: user.id, email: user.email, role: user.is_admin }; 
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_RT_SESSION_EXPIRATION,
    });
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        providerId: 'jwt',
      },
    });

    return {
      userId: newUser.id,
      email: newUser.email,
    };
  }
}
