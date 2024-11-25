import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Le nom d’utilisateur unique',
    example: 'testuser',
  })
  username: string;

  @ApiProperty({
    description: 'Le mot de passe de l’utilisateur',
    example: 'testpassword',
  })
  password: string;
}
