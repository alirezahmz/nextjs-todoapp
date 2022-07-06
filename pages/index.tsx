import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useGetItems } from '../apis/hooks/useGetItems';
import { Active, IItem } from '../schema';
import { AddTodo, TodoItem, Footer } from '../components';
import { useTodo } from '../context/todo.reducer';
import { getItems } from '../context/todo.action';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const [{ items }, dispatch] = useTodo();

  const {
    query: { filter },
  } = useRouter();
  const active: Active | undefined = !!filter;

  const { isLoading, data } = useGetItems(active);

  useEffect(() => {
    if (data) {
      dispatch(getItems(data));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>NextJs-todoApp</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className={styles.container}>
          <h2 className={styles.title}>Todo</h2>
          <div className={styles.wrapper}>
            <div className={styles.todoContainer}>
              <div className={styles.header} />
              <AddTodo />
              <div className={styles.list}>
                {isLoading ? (
                  <div className={styles.statusMessage}>loading...</div>
                ) : !data?.length ? (
                  <div className={styles.statusMessage}>
                    no todo has been added yet!
                  </div>
                ) : (
                  items?.map((item: IItem) => (
                    <TodoItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      active={item.active}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <Footer data={items} />
        </div>
      </main>
    </>
  );
};

export default Home;
