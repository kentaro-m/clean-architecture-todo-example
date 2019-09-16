export interface IRestClient {
  get(resource: string): Promise<Response>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(resource: string, resources: any): Promise<Response>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(resource: string, resources: any): Promise<Response>
  delete(resource: string): Promise<Response>
}
