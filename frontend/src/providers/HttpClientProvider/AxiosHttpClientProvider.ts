import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { IHttpClientProvider } from './IHttpClientProvider'
import { getLocalToken } from '@/utils/functions/storage/getLocalToken'

export class AxiosHttpClientProvider implements IHttpClientProvider {
  private httpIntance: Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
  })

  private static _instance = new AxiosHttpClientProvider()

  constructor() {
    if (AxiosHttpClientProvider._instance) {
      throw new Error(
        'Erro ao criar instância do AxiosHttpClientProvider. Execute getInstance() para criar uma nova',
      )
    }
    AxiosHttpClientProvider._instance = this

    this.httpIntance.interceptors.request.use(
      async (config: any) => {
        const token = await getLocalToken()

        return {
          ...config,
          headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosHttpClientProvider {
    return AxiosHttpClientProvider._instance
  }

  async post(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.post(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async put(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.put(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async get(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.get(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async patch(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.patch(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async delete(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.delete(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }
}
