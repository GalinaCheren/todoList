import { TTodoLists } from '../types';

export type TAddRemoveButtons = {
  onDeleteList: () => void;
  activeList: string;
  addNewList: (inputValue: string) => void;
  activeTodoList: TTodoLists;
};
