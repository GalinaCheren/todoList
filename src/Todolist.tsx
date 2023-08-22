import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import { TMovie, FilterValue, TTodoLists, SortBy } from './types';
import { WatchList } from './watch-lists/WatchLists';
import { AddTodoForm } from './add-todo-form/AddTodoForm';
import type { TTodoFormData } from './add-todo-form/types';
import { FilterButtons } from './filter-buttons/FilterButtons';
import { MenuButton } from './menu-button/MenuButton';
import { AddRemoveButtons } from './add-remove-list/AddRemoveButtons';
import { SortButton } from './sort-button/SortButton';
import { useParams } from 'react-router-dom';

function Todolist() {
  const [todoList, setTodoList] = useState<Record<string, TMovie[]>>(
    localStorage.todoList ? JSON.parse(localStorage.todoList) : {}
  );

  const [todolists, setTodolists] = useState<TTodoLists[]>(
    localStorage.todolists
      ? JSON.parse(localStorage.todolists)
      : [
          {
            id: uuidv4(),
            title: '... watch:',
            placeHolder: 'YYYY',
            filter: FilterValue.ALL,
            sortBy: null,
            sortAsc: true
          },
          {
            id: uuidv4(),
            title: '... buy:',
            placeHolder: 'Price, UAH',
            filter: FilterValue.ALL,
            sortBy: null,
            sortAsc: true
          },
          {
            id: uuidv4(),
            title: '... listen:',
            placeHolder: 'YYYY',
            filter: FilterValue.ALL,
            sortBy: null,
            sortAsc: true
          }
        ]
  );

  const [activeList, setActiveList] = useState<string>(null);

  useEffect(() => {
    localStorage.todoList = JSON.stringify(todoList);
    localStorage.todolists = JSON.stringify(todolists);
  }, [todoList, todolists]);

  const { id } = useParams();
  const navigate = useNavigate();

  console.log(todoList, todolists);

  const addTodo = useCallback(
    (newTodo: TTodoFormData) => {
      setTodoList((oldTodoList) => ({
        ...oldTodoList,
        [activeList]: [
          ...(oldTodoList[activeList] || []),
          {
            id: uuidv4(),
            isDone: false,
            rating: null,
            createdAt: new Date().toISOString(),
            ...newTodo
          }
        ]
      }));
    },
    [activeList]
  );

  useEffect(() => {
    if (!id) {
      setActiveList(todolists[0].id);
    } else if (todolists.find((todo) => todo.id === id)) {
      setActiveList(id);
    } else {
      const titleObject = todolists.find(
        (todo) => todo.title.slice(4, -1) === id
      );
      if (titleObject) {
        setActiveList(titleObject.id);
      } else {
        navigate('/404');
      }
    }
  }, [id, navigate, todolists]);

  const navigateTo = (navigateId: string) => {
    setActiveList(navigateId);
  };

  const removeMovie = useCallback(
    (idMovie: string) => {
      setTodoList((oldToDoList) => ({
        ...oldToDoList,
        [activeList]: oldToDoList[activeList].filter(({ id }) => idMovie !== id)
      }));
    },
    [activeList]
  );

  const viewMovie = useCallback(
    (idMovie: string) => {
      setTodoList((oldToDoList) => ({
        ...oldToDoList,
        [activeList]: oldToDoList[activeList].map((movie) => {
          if (movie.id === idMovie) {
            return { ...movie, isDone: !movie.isDone };
          } else {
            return movie;
          }
        })
      }));
    },
    [activeList]
  );

  const activeTodoList = useMemo(() => {
    return (
      activeList &&
      (todolists.find((list) => list.id === activeList) as TTodoLists)
    );
  }, [activeList, todolists]);

  const filteredTodoList = useMemo(() => {
    if (!todoList[activeList]) {
      return [];
    }
    if (activeTodoList?.filter === FilterValue.ACTIVE) {
      return todoList[activeList].filter((movie) => movie.isDone === false);
    }
    if (activeTodoList?.filter === FilterValue.COMPLETED) {
      return todoList[activeList].filter((movie) => movie.isDone === true);
    }
    return todoList[activeList];
  }, [activeList, activeTodoList?.filter, todoList]);

  const sortedTodoList = useMemo((): TMovie[] => {
    if (!activeTodoList?.sortBy) {
      return filteredTodoList;
    }
    let ascMultiplier = 1;
    if (activeTodoList.sortBy !== SortBy.RATING && !activeTodoList.sortAsc) {
      ascMultiplier = -1;
    }
    return [...filteredTodoList].sort((a, b) => {
      switch (activeTodoList.sortBy) {
        case SortBy.RATING:
          return +b.rating - +a.rating;
        default:
          return (+a.year - +b.year) * ascMultiplier;
      }
    });
  }, [activeTodoList?.sortAsc, activeTodoList?.sortBy, filteredTodoList]);

  const deleteList = useCallback(() => {
    setTodoList((oldTodolist) => {
      const newTodolist = { ...oldTodolist };
      delete newTodolist[activeList];
      return newTodolist;
    });
    const newTodolists = todolists.filter((list) => list.id !== activeList);
    setTodolists(newTodolists);
    setActiveList(newTodolists[0]?.id);
    navigate('/watch');
  }, [activeList, todolists, navigate]);

  const onAddList = useCallback((inputValue: string) => {
    setTodolists((oldTodolists) => [
      ...oldTodolists,
      {
        id: uuidv4(),
        title: `... ${inputValue.trim()}`,
        placeHolder: null,
        filter: FilterValue.ALL
      }
    ]);
  }, []);

  const setListTodoRating = useCallback(
    (activeId: string, newRating: number) => {
      setTodoList((oldToDoList) => ({
        ...oldToDoList,
        [activeList]: oldToDoList[activeList].map((todo) => {
          if (todo.id === activeId) {
            return { ...todo, rating: newRating };
          } else return todo;
        })
      }));
    },
    [activeList]
  );

  const changeFilter = useCallback(
    (value: FilterValue) => {
      setTodolists((oldTodolists) =>
        oldTodolists.map((list) =>
          list.id === activeList ? { ...list, filter: value } : list
        )
      );
    },
    [activeList]
  );

  const setSortList = useCallback(
    (sortBy: SortBy) => {
      setTodolists((oldTodolists) =>
        oldTodolists.map((list) => {
          if (list.id === activeList) {
            if (!sortBy) {
              return { ...list, sortBy, sortAsc: true };
            }
            if (list.sortBy === sortBy && list.sortBy !== SortBy.RATING) {
              return { ...list, sortAsc: !list.sortAsc };
            }
            return { ...list, sortBy };
          }
          return list;
        })
      );
    },
    [activeList]
  );

  if (!activeList) {
    return <>'loading'</>;
  }

  return (
    <>
      <div className="list-block">
        <h1 className="list-title">
          {`${
            activeTodoList.placeHolder ? 'I want to ' : ''
          }${activeTodoList?.title.slice(4)}`}
        </h1>
        <MenuButton
          todoLists={todolists}
          navigateTo={navigateTo}
          activeList={activeList}
          activeTodoList={activeTodoList}
        />
        <AddRemoveButtons
          onDeleteList={deleteList}
          activeList={activeList}
          addNewList={onAddList}
          activeTodoList={activeTodoList}
        />
        <div className="add-new-movie">
          <AddTodoForm
            onSubmit={addTodo}
            todolists={todolists}
            activeList={activeList}
            activeTodoList={activeTodoList}
          />
        </div>

        <SortButton
          activeTodoList={activeTodoList}
          setSortList={setSortList}
          todoList={todoList}
          activeList={activeList}
        />
      </div>
      <div className="line" />
      <div className="list-block1">
        <WatchList
          todoList={sortedTodoList}
          onDelete={removeMovie}
          onDone={viewMovie}
          activeTodoList={activeTodoList}
          setTodoRating={setListTodoRating}
        />

        {todoList[activeList]?.length > 0 ? (
          <FilterButtons
            filterTodoList={changeFilter}
            filter={activeTodoList?.filter}
          />
        ) : null}
      </div>
    </>
  );
}

export default Todolist;
