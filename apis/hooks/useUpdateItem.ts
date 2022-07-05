import { useMutation, UseMutationOptions } from 'react-query';
import { IItem } from '../../schema';
import * as APIs from '../services';

type Param = IItem;
type Data = IItem;
type Errors = any;
type Options = Omit<
  UseMutationOptions<Data, Errors, Param, unknown>,
  'mutationFn'
>;

export const useUpdateItem = (options?: Options) => {
  return useMutation<Data, Errors, Param>(async (param) => {
    try {
      const res = await APIs.updateItem(param);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log('err', err);
    }
  }, options);
};
