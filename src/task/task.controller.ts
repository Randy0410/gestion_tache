import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';

@ApiTags('tasks') // Tag de Swagger pour les tâches
@ApiBearerAuth() // Ajoute l'authentification via JWT pour Swagger
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiBody({ type: CreateTaskDto })
  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Obtenir toutes les tâches' })
  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @ApiOperation({ summary: 'Obtenir une tâche par ID' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @ApiBody({ type: CreateTaskDto })
  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiParam({ name: 'id', description: 'ID de la tâche' })
  @UseGuards(JwtAuthGuard) // Applique le garde JWT
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }

  @Get('status')
  @ApiOperation({
    summary: 'Rechercher des tâches par statut (complétées ou en cours)',
  })
  @ApiQuery({
    name: 'completed',
    description:
      'Filtrer les tâches par statut (true=complétée, false=en cours)',
    required: true,
  })
  @UseGuards(JwtAuthGuard) // Appliquer le garde JWT pour sécuriser la route
  async findByStatus(@Query('completed') completed: string): Promise<Task[]> {
    const completedBoolean = completed === 'true'; // Convertit 'true'/'false' en boolean
    return this.taskService.findByStatus(completedBoolean); // Appelle le service pour récupérer les tâches filtrées
  }
}
