import useSWR, { SWRResponse } from 'swr';

import { Status } from '../../../types/Common';
import { callAPI, CallAPIOptions } from '../../../utils/Fetchers';

type DataType<T> = T | null;
type ResType<T> = {
  data: T;
  status: Status;
};

export default function useCommonApi<TReq, TReturn>(
  apiUrl: string,
  apiReq: TReq,
  options?: Partial<CallAPIOptions>
): SWRResponse<DataType<TReturn>, string> {
  const fetcher = (url: string) =>
    callAPI<TReq, ResType<TReturn>>(url, apiReq, options).then(res => {
      if (res.status === 200 && res.data?.status === 'OK' && res.data?.data !== undefined) {
        return res.data.data;
      }
      return null;
    });

  const swrRes = useSWR<DataType<TReturn>, string, string>(apiUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return swrRes;
}
