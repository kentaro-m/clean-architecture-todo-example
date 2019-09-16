import { TodoItem } from '../domain/TodoItem'
import { ITodoApi } from '../service/ITodoApi'
import { ITodoItemUseCase } from './ITodoItemUseCase'

export class TodoItemUseCase implements ITodoItemUseCase {
  service: ITodoApi

  constructor(service: ITodoApi) {
    this.service = service
  }

  async findAll(): Promise<TodoItem[] | null> {
    return this.service.findAll()
  }

  async findByID(id: number): Promise<TodoItem | null> {
    return this.service.findById(id)
  }

  async create(title: string): Promise<TodoItem[] | null> {
    await this.service.create(title)
    return this.service.findAll()
  }

  async update(id: number): Promise<TodoItem[] | null> {
    await this.service.update(id)
    return this.service.findAll()
  }

  async delete(id: number): Promise<TodoItem[] | null> {
    await this.service.delete(id)
    return this.service.findAll()
  }
}
