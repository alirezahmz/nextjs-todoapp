import React, { FC } from 'react';
import styles from './todoItem.module.css';
import closeIcon from '../../assets/icons/close.png';
import Image from 'next/image';

const TodoItem: FC = () => {
 
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
  };
  const handleDeleteItem = () => {};

  const handleDoubleClick = () => {};

  return (
    <div className={styles.item}>
      <input
        className={styles.checkbox}
        type={'checkbox'}
        checked={true}
        onChange={handleCheckBox}
      />

      <span onDoubleClick={handleDoubleClick}>item</span>
      <div className={styles.delIcon} onClick={handleDeleteItem}>
        <Image src={closeIcon} alt='*' />
      </div>
    </div>
  );
};

export default TodoItem;
