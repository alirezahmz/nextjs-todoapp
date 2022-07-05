import React, { FC } from 'react';
import { Active, IItem } from '../../schema';
import styles from './footer.module.css';
import Router, { useRouter } from 'next/router';

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
const Footer: FC = () => {
  const {
    query: { filter },
  } = useRouter();
  const active: Active | undefined = !!filter;
  const handleFilter = (active: boolean) => {
    Router.push({
      pathname: '/',
      query: active ? { filter: 'active' } : null,
    });
  };
  const handleClearCompleted = () => {};
  return (
    <div className={styles.footerContainer}>
      <div>
        <span className={styles.numberOfTodos}>25 </span>
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
