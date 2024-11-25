// Fichier: task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Créer une tâche
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // Trouver toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Trouver une tâche par son ID (modification ici)
  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id }, // Utiliser "where" avec l'ID
    });
  }

  // Mettre à jour une tâche
  async update(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new Error('Task non trouver');
    }
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  // Supprimer une tâche
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    if (!task) {
      throw new Error('Task non trouver ');
    }
    await this.taskRepository.remove(task);
  }

  // Trouver des tâches en fonction de leur statut (terminée ou en cours)
  async findByStatus(completed: boolean): Promise<Task[]> {
    return this.taskRepository.find({ where: { completed } });
  }
}
