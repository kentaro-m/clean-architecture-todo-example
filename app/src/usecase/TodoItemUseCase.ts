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

  create(title: string): Array<TodoItem> | null {
    const todoItems = this.repository.findAll()

    let id = 0

    if (todoItems && todoItems.length > 0) {
      todoItems.sort((a, b) => {
        return b.id - a.id
      })

      id = todoItems[0].id + 1
    }

    const todoItem = new TodoItem(id, title, false)

    this.repository.create(todoItem)
    return this.repository.findAll()
  }

  update(id: number): Array<TodoItem> | null {
    const todoItem = this.repository.findByID(id)

    if (todoItem) {
      const updatedTodoItem = new TodoItem(todoItem.id, todoItem.title, !todoItem.isCompleted)
      this.repository.update(updatedTodoItem)
    }

    return this.repository.findAll()
  }

  delete(id: number): Array<TodoItem> | null {
    this.repository.delete(id)
    return this.repository.findAll()
  }
}