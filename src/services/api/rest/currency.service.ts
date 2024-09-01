import type { AxiosResponse } from 'axios'
import { httpClient } from '../httpClient'

export const currencyService = {
  getCurrency<T>(): Promise<AxiosResponse<T>> {
    return httpClient.get('/currency')
  }
}
