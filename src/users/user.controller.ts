import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@ApiTags('users')
@ApiBearerAuth() // Ajoute un bouton pour inclure le token dans Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  //   @UseGuards(JwtAuthGuard) // Sécuriser la création d'utilisateur avec JWT
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
