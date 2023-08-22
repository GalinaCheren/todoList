import type { TTodoFormData } from './add-todo-form/types';

export type TMovie = {
  id: string;
  isDone: boolean;
  rating: number;
  createdAt: string;
} & TTodoFormData;

export enum FilterValue {
  ALL,
  ACTIVE,
  COMPLETED
}
export type TTodoLists = {
  id: string;
  title: string;
  placeHolder: string;
  filter: FilterValue;
  sortBy?: SortBy;
  sortAsc?: boolean;
};

export enum SortBy {
  YEAR = '...by year',
  PRICE = '... by price',
  RATING = '... by rating'
}
