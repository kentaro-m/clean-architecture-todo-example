import { IRestClient } from '../adapter/IRestClient'
import { ITodoApi } from '../service/ITodoApi'
import { TodoItem } from '../domain/TodoItem'

export class TodoApi implements ITodoApi {
  restClient: IRestClient

  constructor(restClient: IRestClient) {
    this.restClient = restClient
  }

  public async findAll(): Promise<TodoItem[] | null> {
    try {
      const todos: any = await this.restClient.get('/todos')
      const items = []

      for (const todo of todos) {
        items.push(TodoItem.fromJSON(todo))
      }

      return items
    } catch (error) {
      return null
    }
  }

  public async findById(id: number): Promise<TodoItem | null> {
    try {
      const todo: any = await this.restClient.get(`/todos/${id}`)
      return TodoItem.fromJSON(todo)
    } catch (error) {
      return null
    }
  }

  public async create(title: string): Promise<void> {
    try {
      await this.restClient.create('/todos', { title, isCompleted: false })
    } catch (error) {
      return
    }
  }

  public async update(id: number): Promise<void> {
    try {
      const item = await this.findById(id)

      if (item) {
        await this.restClient.update(`/todos/${id}`, { title: item.title, isCompleted: !item.isCompleted })
      }
    } catch (error) {
      return
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.restClient.delete(`/todos/${id}`)
    } catch (error) {
      return
    }
  }
}