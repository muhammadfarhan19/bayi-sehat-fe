import axios from 'axios'
import useSWR from 'swr'

export const useAPI = <RequestData, ResponseData>(
  apiUrl: string,
  method: string,
  requestData?: RequestData,
  axiosConfig?: any
) => {
  const fetcher = async (url: string, requestData?: RequestData) => {
    try {
      const response = await axios({ url, method, ...axiosConfig, data: requestData })
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response?.data || error.message)
    }
  }

  const { data, error, isValidating, mutate } = useSWR<ResponseData>(apiUrl, fetcher, axiosConfig)

  return { data, error, isValidating, mutate }
}
