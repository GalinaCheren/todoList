import React from 'react';
import type { TMovie, TTodoLists } from '../types';
import { Rating } from '../rating/Rating';
import { IMAGE_REGEXP } from '../constants';

type TProps = {
  todoList: TMovie[];
  onDelete: (idMovie: string) => void;
  onDone: (idMovie: string) => void;
  activeTodoList: TTodoLists;
  setTodoRating: (activeId: string, newRating: number) => void;
};

export const WatchList = ({
  todoList,
  onDelete,
  onDone,
  activeTodoList,
  setTodoRating
}: TProps) => {
  return (
    <>
      <div className="watch-list">
        {todoList?.map((item) => {
          return (
            <div
              className={`movie${item.isDone ? ' opacity' : ''}`}
              key={item.id}
            >
              {IMAGE_REGEXP.test(item.image) && (
                <img src={item.image} alt=" :(" className="this-movie" />
              )}
              <div className="input-checkbox-p">
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => {
                    onDone(item.id);
                  }}
                />
                <div>
                  <p>
                    {item.title.charAt(0).toLocaleUpperCase() +
                      item.title.slice(1)}
                  </p>
                  <p className="item-title-year">{`${item.year}${
                    (item.year.length > 4 || item.year.length < 4) && item.year
                      ? ' UAH'
                      : ''
                  }`}</p>
                </div>

                <button
                  className="onDelete-button"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                ></button>
              </div>
              {activeTodoList.title === '... watch:' ||
              activeTodoList.title === '... listen:' ? (
                <Rating
                  rating={item.rating}
                  setRating={(newRating) => {
                    setTodoRating(item.id, newRating);
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
