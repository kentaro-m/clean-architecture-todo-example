import { TodoItem } from '../domain/TodoItem'

export interface ITodoItemUseCase {
  findAll(): Array<TodoItem> | null
  findByID(id: number): TodoItem | null
  create(title: string): Array<TodoItem> | null
  update(id: number): Array<TodoItem> | null
  delete(id: number): Array<TodoItem> | null
}