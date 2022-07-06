import React, { FC, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDeleteItem } from '../../apis/hooks/useDeleteItem';
import { GET_ITEMS } from '../../apis/hooks/useGetItems';
import { useUpdateItem } from '../../apis/hooks/useUpdateItem';
import { Active, IItem } from '../../schema';
import styles from './todoItem.module.css';
import closeIcon from '../../assets/icons/close.png';
import Image from 'next/image';
import { useTodoDispatch } from '../../context/todo.reducer';
import { deleteItem, updateItem } from '../../context/todo.action';
import { useRouter } from 'next/router';

const TodoItem: FC<IItem> = ({ id, title, active }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string | undefined>('');
  const dispatch = useTodoDispatch();
  const {
    query: { filter },
  } = useRouter();
  const activeFilter: Active | undefined = !!filter;

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateItem } = useUpdateItem({
    onSuccess: (data) => {
      if (data) {
        dispatch(updateItem(data));
        queryClient.invalidateQueries(GET_ITEMS);
      }
    },
  });

  const { mutate: mutateDeleteItem } = useDeleteItem({
    onSuccess: (_, id) => {
      if (id) {
        dispatch(deleteItem(id));
        queryClient.invalidateQueries(GET_ITEMS);
      }
    },
  });

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const param = {
      id,
      active: checked,
    };
    mutateUpdateItem(param);
  };
  // delete specific item
  const handleDeleteItem = () => {
    mutateDeleteItem(id);
  };

  // active input for changing value
  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  // fill edit value state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditValue(value);
  };

  // call updateItem api for updating title
  const handleEditItem = () => {
    const param = {
      id,
      title: editValue,
    };
    mutateUpdateItem(param);
    setIsEditing(false);
  };

  // send updateItem api after clicking on Enter button
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditItem();
    }
  };

  return (
    <div className={styles.item}>
      {!activeFilter && (
        <input
          className={styles.checkbox}
          type={'checkbox'}
          checked={active}
          onChange={handleCheckBox}
        />
      )}
      {isEditing ? (
        <input
          className={styles.editInput}
          type='text'
          value={editValue}
          onChange={handleChange}
          onBlur={handleEditItem}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick} className={styles.title}>
          {title}
        </span>
      )}
      <div className={styles.delIcon} onClick={handleDeleteItem}>
        <Image src={closeIcon} alt='*' />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
