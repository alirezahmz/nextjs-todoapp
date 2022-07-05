export type Title = string;
export type Active = boolean;
export type Id = number;

export interface IItem {
  id: Id;
  title?: Title;
  active?: Active;
}