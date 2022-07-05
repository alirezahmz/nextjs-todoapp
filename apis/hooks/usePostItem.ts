import { useMutation, UseMutationOptions } from 'react-query';
import { IItem, Title } from '../../schema';
import * as APIs from '../services';

type Param = Title;
type Data = IItem;
type Errors = any;
type Options = Omit<
  UseMutationOptions<Data, Errors, Param, unknown>,
  'mutationFn'
>;

export const usePostItem = (options?: Options) => {
  return useMutation<Data, Errors, Param>(async (param) => {
    try {
      const res = await APIs.postItem(param);
      if (res.status === 201) {
        return res.data;
      }
    } catch (err) {
      console.log('err', err);
    }
  }, options);
};
