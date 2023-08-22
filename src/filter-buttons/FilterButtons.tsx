import React from 'react';
import { FilterValue } from '../types';

type TPropsFilter = {
  filterTodoList: (value: FilterValue) => void;
  filter: FilterValue;
};

export const FilterButtons = ({ filterTodoList, filter }: TPropsFilter) => {
  const filterAll = () => {
    filterTodoList(FilterValue.ALL);
  };
  const filterCompleted = () => {
    filterTodoList(FilterValue.COMPLETED);
  };
  const filterActive = () => {
    filterTodoList(FilterValue.ACTIVE);
  };

  return (
    <>
      <div className="filter-buttons">
        <button
          className={`filter-button${
            filter === FilterValue.ALL ? '-active-filter' : ''
          }`}
          onClick={filterAll}
        >
          all
        </button>
        <button
          className={`filter-button${
            filter === FilterValue.COMPLETED ? '-active-filter' : ''
          }`}
          onClick={filterCompleted}
        >
          already
        </button>
        <button
          className={`filter-button${
            filter === FilterValue.ACTIVE ? '-active-filter' : ''
          }`}
          onClick={filterActive}
        >
          want to do
        </button>
      </div>
    </>
  );
};
