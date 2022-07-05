import React, { KeyboardEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { GET_ITEMS } from '../../apis/hooks/useGetItems';
import { usePostItem } from '../../apis/hooks/usePostItem';
import styles from './addTodo.module.css';

const AddTodo = () => {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = usePostItem({
    onSuccess: () => {
      queryClient.invalidateQueries(GET_ITEMS);
      setValue('');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  const handleAddTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      mutate(value);
    }
  };
  return (
    <>
      <input
        className={styles.input}
        type='text'
        name='addTodo'
        value={value}
        onChange={handleChange}
        onKeyPress={handleAddTodo}
        placeholder='what needs to be done?'
      />
    </>
  );
};

export default AddTodo;
