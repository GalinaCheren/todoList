import React, { useCallback } from 'react';
import './index.css';
import { TTodoLists, SortBy, TMovie } from '../types';
import { Amount } from './Amount';

type TSortButton = {
  activeTodoList: TTodoLists;
  todoList: Record<string, TMovie[]>;
  activeList: string;
  setSortList: (sortName: SortBy) => void;
};

const LIST_TITLE = ['... watch:', '... listen:', '... buy:'];

export const SortButton = ({
  activeTodoList,
  setSortList,
  activeList,
  todoList
}: TSortButton) => {
  const sortByPrice = useCallback(() => {
    setSortList(SortBy.PRICE);
  }, [setSortList]);

  const sortByYear = () => {
    setSortList(SortBy.YEAR);
  };
  const sortByRating = () => {
    setSortList(SortBy.RATING);
  };
  const sortByNull = () => {
    setSortList(null);
  };

  return (
    <div className="sort-button">
      <Amount
        activeTodoList={activeTodoList}
        activeList={activeList}
        todoList={todoList}
      />
      {LIST_TITLE.includes(activeTodoList.title) && (
        <div className={`sort ${activeTodoList.sortBy ? 'active' : ''}`}>
          SORT
          <div className="sort-button-child">
            {activeTodoList.title === '... buy:' ? (
              <div
                className={`sort-menu${
                  activeTodoList.sortBy === SortBy.PRICE ? '-active' : ''
                }`}
                onClick={sortByPrice}
              >
                {`${SortBy.PRICE} ${activeTodoList.sortAsc ? '⇈' : '⇊'}`}
              </div>
            ) : (
              <>
                <div
                  className={`sort-menu${
                    activeTodoList.sortBy === SortBy.YEAR ? '-active' : ''
                  }`}
                  onClick={sortByYear}
                >
                  {`${SortBy.YEAR} ${activeTodoList.sortAsc ? '⇈' : '⇊'}`}
                </div>
                <div
                  className={`sort-menu${
                    activeTodoList.sortBy === SortBy.RATING ? '-active' : ''
                  }`}
                  onClick={sortByRating}
                >
                  {SortBy.RATING}
                </div>
              </>
            )}
            <div
              className={`sort-menu
                      }`}
              onClick={sortByNull}
            >
              ... reset ✗
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
