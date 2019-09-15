import { TodoItem } from '../domain/TodoItem'

export interface ITodoItemUseCase {
  findAll(): Promise<TodoItem[] | null>
  findByID(id: number): Promise<TodoItem | null>
  create(title: string): Promise<TodoItem[] | null>
  update(id: number): Promise<TodoItem[] | null>
  delete(id: number): Promise<TodoItem[] | null>
}