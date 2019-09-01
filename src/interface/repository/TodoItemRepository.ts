import { TodoItem } from '../../domain/TodoItem'
import { ITodoItemRepository } from './ITodoItemRepository'

export class TodoItemRepository implements ITodoItemRepository {
  private key: string

  constructor(key: string) {
    this.key = key
  }

  findAll() {
    const data = localStorage.getItem(this.key)

    if (!data) {
      return null
    }

    const todos = JSON.parse(data)

    const todoItems = []
    
    for (const todo of todos) {
      const todoItem = new TodoItem(todo.id, todo.title, todo.isCompleted)
      todoItems.push(todoItem)
    }

    return todoItems
  }

  findByID(id: number) {
    const todoItems = this.findAll()
    
    if (!todoItems) {
      return null
    }

    const todo = todoItems.find(todoItem => todoItem.id === id)

    if (!todo) {
      return null
    }

    const todoItem = new TodoItem(todo.id, todo.title, todo.isCompleted)
    return todoItem
  }

  create(todoItem: TodoItem) {
    const todoItems = this.findAll()
    const todos = []

    if (todoItems && todoItems.length > 0) {
      todoItems.push(todoItem)

      for (const todoItem of todoItems) {
        todos.push({
          id: todoItem.id,
          title: todoItem.title,
          isCompleted: todoItem.isCompleted
        })
      }

    } else {
      todos.push({
        id: todoItem.id,
        title: todoItem.title,
        isCompleted: todoItem.isCompleted
      })
    }

    localStorage.setItem(this.key, JSON.stringify(todos))
  }

  update(todoItem: TodoItem) {
    const todoItems = this.findAll()
    const todos = []

    if (todoItems && todoItems.length > 0) {
      const index = todoItems.findIndex(item => item.id === todoItem.id)
      todoItems.splice(index, 1, todoItem)

      for (const todoItem of todoItems) {
        todos.push({
          id: todoItem.id,
          title: todoItem.title,
          isCompleted: todoItem.isCompleted
        })
      }

    }

    localStorage.setItem(this.key, JSON.stringify(todos))
  }

  delete(id: number) {
    const todoItems = this.findAll()

    if (todoItems) {
      const updatedTodoItems = todoItems.filter(todoItem => todoItem.id !== id)

      const todos = []

      for (const todoItem of updatedTodoItems) {
        todos.push({
          id: todoItem.id,
          title: todoItem.title,
          isCompleted: todoItem.isCompleted
        })
      }

      localStorage.setItem(this.key, JSON.stringify(todos))
    }
  }
}