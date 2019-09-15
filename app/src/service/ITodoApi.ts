import { TodoItem } from '../domain/TodoItem'

export interface ITodoApi {
  findAll(): Promise<TodoItem[] | null>
  findById(id: number): Promise<TodoItem | null>
  create(title: string): Promise<void>
  update(id: number): Promise<void>
  delete(id: number): Promise<void>
}