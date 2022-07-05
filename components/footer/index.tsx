import React, { FC } from 'react';
import { Active, IItem } from '../../schema';
import styles from './footer.module.css';
import Router, { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { GET_ITEMS } from '../../apis/hooks/useGetItems';
import { useUpdateItem } from '../../apis/hooks/useUpdateItem';

interface IFooter {
  data: IItem[] | undefined;
}
const filters: IItem[] = [
  {
    id: 1,
    title: 'All',
    active: false,
  },
  {
    id: 2,
    title: 'Active',
    active: true,
  },
];
const Footer: FC<IFooter> = ({ data }) => {
  const {
    query: { filter },
  } = useRouter();
  const active: Active | undefined = !!filter;
  const queryClient = useQueryClient();
  const { mutate } = useUpdateItem({
    onSuccess: () => {
      queryClient.invalidateQueries(GET_ITEMS);
    },
  });
  const handleFilter = (active: boolean) => {
    Router.push({
      pathname: '/',
      query: active ? { filter: 'active' } : null,
    });
  };
  const handleClearCompleted = () => {
    if (data?.length) {
      const completedTodos = data.filter((item) => item.active);
      for (let i = 0; i < completedTodos.length; i++) {
        const { id } = completedTodos[i];
        setTimeout(function () {
          mutate({ id, active: false });
        }, 1000 * i);
      }
    }
  };
  return (
    <div className={styles.footerContainer}>
      <div>
        <span className={styles.numberOfTodos}>{data?.length} </span>
        <span> items left</span>
      </div>
      <div className={styles.filterBar}>
        {filters.map((item: IItem) => (
          <span
            className={item.active === active ? styles.activeTab : ''}
            key={item.id}
            onClick={() => handleFilter(item.active as boolean)}>
            {item.title}
          </span>
        ))}
      </div>
      <button className={styles.button} onClick={handleClearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
