import { TodoItem } from '../domain/TodoItem'
import { ITodoItemRepository } from '../interface/repository/ITodoItemRepository'
import { ITodoItemUseCase } from './ITodoItemUseCase'

export class TodoItemUseCase implements ITodoItemUseCase {
  private repository: ITodoItemRepository

  constructor(repository: ITodoItemRepository) {
    this.repository = repository
  }

  findAll(): Array<TodoItem> | null {
    return this.repository.findAll()
  }

  findByID(id: number): TodoItem | null {
    return this.repository.findByID(id)
  }

  create(todoItem: TodoItem) {
    this.repository.create(todoItem)
  }

  update(todoItem: TodoItem) {
    this.repository.update(todoItem)
  }

  delete(id: number) {
    this.repository.delete(id)
  }
}