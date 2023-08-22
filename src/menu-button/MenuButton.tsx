import React from 'react';
import { TMovie, TTodoLists } from '../types';
import { Link } from 'react-router-dom';

type TMenuButton = {
  todoLists: TTodoLists[];
  navigateTo: (navigateId: string) => void;
  activeList: string;
  activeTodoList: TTodoLists;
};

export const MenuButton = ({
  todoLists,
  navigateTo,
  activeList,
  activeTodoList
}: TMenuButton) => {
  return (
    <div className="dropdown">
      <button className="mainmenubtn">I want to...</button>
      <div className="dropdown-child">
        {todoLists.map((list, index) => {
          return (
            <Link
              to={`/${index < 3 ? list.title.slice(4, -1) : list.id}`}
              className={`menu-button${
                list.id === activeList ? '-active' : ''
              }`}
              key={list.id}
            >
              {list.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
