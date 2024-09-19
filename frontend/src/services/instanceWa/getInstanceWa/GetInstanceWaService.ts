import { IHttpClientProvider } from '@/providers/HttpClientProvider/IHttpClientProvider'

export async function getInstanceWaService(http: IHttpClientProvider) {
  return http.get('/instance')
}
