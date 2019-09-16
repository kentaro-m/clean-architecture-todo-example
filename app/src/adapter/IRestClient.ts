export interface IRestClient {
  get(resource: string): Promise<Response>
  create(resource: string, resources: any): Promise<Response>
  update(resource: string, resources: any): Promise<Response>
  delete(resource: string): Promise<Response>
}
