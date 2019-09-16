import { IRestClient } from '../adapter/IRestClient'
import { ITodoApi } from '../service/ITodoApi'
import { TodoItem } from '../domain/TodoItem'

export class TodoApi implements ITodoApi {
  restClient: IRestClient

  constructor(restClient: IRestClient) {
    this.restClient = restClient
  }

  public async findAll(): Promise<TodoItem[] | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todos: any = await this.restClient.get('/todos')
    const items = []

    for (const todo of todos) {
      items.push(TodoItem.fromJSON(todo))
    }

    return items
  }

  public async findById(id: number): Promise<TodoItem | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todo: any = await this.restClient.get(`/todos/${id}`)
    return TodoItem.fromJSON(todo)
  }

  public async create(title: string): Promise<void> {
    await this.restClient.create('/todos', { title, isCompleted: false })
  }

  public async update(id: number): Promise<void> {
    const item = await this.findById(id)

    if (item) {
      await this.restClient.update(`/todos/${id}`, {
        title: item.title,
        isCompleted: !item.isCompleted
      })
    }
  }

  public async delete(id: number): Promise<void> {
    await this.restClient.delete(`/todos/${id}`)
  }
}
