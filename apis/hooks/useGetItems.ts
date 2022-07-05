import { useQuery, UseQueryOptions } from 'react-query';
import { Active, IItem } from '../../schema';
import * as APIs from '../services';

type Data = IItem[] | undefined;
type Param = Active | undefined;
type Options = Omit<UseQueryOptions<Data>, 'queryKey' | 'queryFn'>;

const FIVE_MINUTE = 5 * 60 * 1000;
export const GET_ITEMS = 'GET_ITEMS';
export const useGetItems = (active?: Param, options?: Options) =>
  useQuery<Data>(
    [GET_ITEMS, active],
    async () => {
      try {
        const res = await APIs.getItems(active);
        if (res.status === 200) return res.data;
      } catch (err) {
        console.log('err', err);
      }
    },
    {
      ...options,
      refetchInterval: FIVE_MINUTE,
    },
  );
