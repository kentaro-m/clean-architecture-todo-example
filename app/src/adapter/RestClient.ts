import { IRestClient } from './IRestClient'
import fetch from 'unfetch'

export class RestClient implements IRestClient {
  endpoint: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.client = fetch
  }

  public async get(resource: string): Promise<Response> {
    const res = await this.client(this._createUrl(resource))
    return this._createResponse(res)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async create(resource: string, resources: any): Promise<Response> {
    const res = await this.client(this._createUrl(resource), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resources)
    })
    return this._createResponse(res)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update(resource: string, resources: any): Promise<Response> {
    const res = await this.client(this._createUrl(resource), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resources)
    })
    return this._createResponse(res)
  }

  public async delete(resource: string): Promise<Response> {
    const res = await this.client(this._createUrl(resource), {
      method: 'DELETE'
    })
    return this._createResponse(res)
  }

  private _createUrl(resource: string): string {
    return this.endpoint + resource
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async _createResponse(res: Response): Promise<any> {
    return new Promise((resolve, reject): void => {
      try {
        if (res.ok) {
          try {
            const json = res.json()
            resolve(json)
          } catch (error) {
            reject(error)
          }
        } else {
          reject(res)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
