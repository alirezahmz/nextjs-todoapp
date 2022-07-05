import axios from 'axios';
import { baseUrl } from '../constants';
import { Active, Id, IItem, Title } from '../schema';

const getItems = (active?: Active | undefined) => {
  return axios.get(`${baseUrl}${active ? `?active=${false}` : ''}`);
};
const postItem = async (title: Title) => {
  return axios.post(baseUrl, {
    title,
    active: false,
  });
};
const updateItem = async ({ id, title, active }: IItem) => {
  return axios.patch(
    `${baseUrl}/${id}`,
    title
      ? {
          title,
        }
      : { active },
  );
};
const deleteItem = async (id: Id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export { getItems, postItem, updateItem, deleteItem };
