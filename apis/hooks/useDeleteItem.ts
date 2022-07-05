import { useMutation, UseMutationOptions } from 'react-query';
import { Id, IItem, Title } from '../../schema';
import * as APIs from '../services';

type Data = IItem;
type Param = Id;
type Errors = any;

type Options = Omit<
  UseMutationOptions<Data, Errors, Param, unknown>,
  'mutationFn'
>;

export const useDeleteItem = (options?: Options) => {
  return useMutation<Data, Errors, Param>(async (param) => {
    try {
      const res = await APIs.deleteItem(param);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log('err', err);
    }
  }, options);
};
