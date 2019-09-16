export class TodoItem {
  private _id: number
  private _title: string
  private _isCompleted: boolean

  constructor(id: number, title: string, isCompleted: boolean) {
    this._id = id
    this._title = title
    this._isCompleted = isCompleted
  }

  get id(): number {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get isCompleted(): boolean {
    return this._isCompleted
  }

  static fromJSON(json: any) {
    const { id, title, isCompleted } = json
    return new TodoItem(id, title, isCompleted)
  }
}