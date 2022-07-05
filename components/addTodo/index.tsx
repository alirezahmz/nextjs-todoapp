import React, { KeyboardEvent } from 'react';
import styles from './addTodo.module.css';

const AddTodo = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  };
  const handleAddTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <>
      <input
        className={styles.input}
        type='text'
        name='addTodo'
        onChange={handleChange}
        onKeyPress={handleAddTodo}
        placeholder='what needs to be done?'
      />
    </>
  );
};

export default AddTodo;
