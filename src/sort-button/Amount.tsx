import React from 'react';
import './index.css';
import { TTodoLists, TMovie, FilterValue } from '../types';

type TAmount = {
  activeTodoList: TTodoLists;
  todoList: Record<string, TMovie[]>;
  activeList: string;
};

export const Amount = ({ activeTodoList, activeList, todoList }: TAmount) => {
  const data = { text: '', value: 0 };
  if (activeTodoList.filter === FilterValue.ALL) {
    data.text = 'Total amount:';
    data.value =
      todoList[activeList]?.reduce((acc, list) => {
        acc += Number(list.year);
        return acc;
      }, 0) || 0;
  } else if (activeTodoList.filter === FilterValue.COMPLETED) {
    data.text = 'Completed amount:';
    data.value = todoList[activeList].reduce((acc, list) => {
      if (list.isDone) {
        acc += Number(list.year);
      }
      return acc;
    }, 0);
  } else if (activeTodoList.filter === FilterValue.ACTIVE) {
    data.text = 'Unused amount:';
    data.value = todoList[activeList].reduce((acc, list) => {
      if (!list.isDone) {
        acc += Number(list.year);
      }
      return acc;
    }, 0);
  }
  return (
    <>
      {activeTodoList.placeHolder === 'Price, UAH' ? (
        <>
          <div className="total-amount">
            {data.text}
            <span className="color-amount">{` ${data.value} UAH`}</span>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};
