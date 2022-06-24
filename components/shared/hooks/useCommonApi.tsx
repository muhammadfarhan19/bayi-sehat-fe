import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

import { Status } from '../../../types/Common';
import { callAPI, CallAPIOptions } from '../../../utils/Fetchers';

type DataType<T> = T | null;
type ResType<T> = {
  data: T;
  status: Status;
};

/**
 * Use skipCall to prevent avoid API call
 * Use revalidateOnMount to ensure API called every time the component re-mount, SWR use URL as cache-key
 *
 * @param apiUrl
 * @param apiReq
 * @param options
 * @param swrOptions
 * @returns
 */
export default function useCommonApi<TReq, TReturn>(
  apiUrl: string,
  apiReq: TReq,
  options?: Partial<CallAPIOptions>,
  swrOptions?: Partial<{
    skipCall: boolean;
    revalidateOnMount: boolean;
  }>
): SWRResponse<DataType<TReturn>, string> {
  const fetcher = (url: string) =>
    callAPI<TReq, ResType<TReturn>>(url, apiReq, options).then(res => {
      if (res.status === 200 && res.data?.status === 'OK' && res.data?.data !== undefined) {
        return res.data.data;
      }
      return null;
    });

  // COMPOSE SWR Options
  const useSwrOptions: SWRConfiguration = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  if (swrOptions?.revalidateOnMount) {
    useSwrOptions.revalidateOnMount = swrOptions?.revalidateOnMount;
    useSwrOptions.dedupingInterval = 0;
  }

  return useSWR<DataType<TReturn>, string, [string, typeof apiReq] | null>(
    swrOptions?.skipCall ? null : [apiUrl, apiReq],
    fetcher,
    useSwrOptions
  );
}
