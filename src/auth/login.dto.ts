import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty() // Utilisé par Swagger pour afficher le champ dans la documentation
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
