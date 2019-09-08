import { TodoItem } from '../domain/TodoItem'

export interface ITodoItemUseCase {
  findAll(): Array<TodoItem> | null
  findByID(id: number): TodoItem | null
  create(todoItem: TodoItem): void
  update(todoItem: TodoItem): void
  delete(id: number): void
}