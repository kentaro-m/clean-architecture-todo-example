import { TodoItem } from '../../domain/TodoItem';

export interface ITodoItemRepository {
  findAll(): Array<TodoItem> | null
  findByID(id: number): TodoItem | null
  create(todoItem: TodoItem): void
  delete(id: number): void
  update(todoItem: TodoItem): void
}