import React, { useEffect, useState, useRef } from 'react';
import { TTodoFormData } from './types';
import { TTodoLists } from '../types';

type TFormProps = {
  onSubmit: (newMovie: TTodoFormData) => void;
  todolists: TTodoLists[];
  activeList: string;
  activeTodoList: TTodoLists;
};

enum PlaceHolderTitle {
  TITLE = 'title',
  YEAR = 'year',
  image = 'image'
}

export const AddTodoForm = ({
  onSubmit,
  todolists,
  activeList,
  activeTodoList
}: TFormProps) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [placeholders, setPlaceholders] = useState({
    title: '',
    year: '',
    image: ''
  });

  const titlePlaceHolders = {
    title: 'Title:',
    year: activeTodoList.placeHolder,
    image: 'Link to image:'
  };

  const intervalRefs = useRef<Record<string, string>>({});

  const startUpdatePlaceholder = (title: PlaceHolderTitle) => {
    if (!titlePlaceHolders[title]) return;
    intervalRefs.current[title] = setInterval(() => {
      setPlaceholders((oldPlaceholders) => {
        if (oldPlaceholders[title].length === titlePlaceHolders[title].length) {
          return { ...oldPlaceholders, [title]: '' };
        } else {
          return {
            ...oldPlaceholders,
            [title]: titlePlaceHolders[title].slice(
              0,
              oldPlaceholders[title].length + 1
            )
          };
        }
      });
    }, 250) as null as string;
  };

  useEffect(() => {
    const titles = (Object.keys(placeholders) as PlaceHolderTitle[]).filter(
      (i) => i
    );
    titles.forEach(startUpdatePlaceholder);

    return () => {
      titles.forEach((title) => clearInterval(intervalRefs.current[title]));
    };
  }, [activeTodoList]);

  const pricePlaceHolder =
    todolists.find((item) => item.placeHolder === 'Price, UAH')?.id ===
    activeList;

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ title, year, image });
    setTitle('');
    setYear('');
    setImage('');
  };

  const onChangeInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangInputYearOrPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (pricePlaceHolder) {
      setYear(event.target.value);
    } else if (event.target.value.length > 4) {
      event.target.value = event.target.value.slice(0, 4);
    } else {
      setYear(event.target.value);
    }
  };

  const onChangeInputImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };
  return (
    <>
      <form action="" onSubmit={onSubmitForm}>
        <div className="form-side form-left">
          <input
            className="input-add"
            placeholder={placeholders.title}
            required
            value={title}
            onChange={onChangeInputTitle}
          />
          {activeTodoList.placeHolder && (
            <input
              className="input-add"
              required
              type="number"
              placeholder={placeholders.year}
              min={`${pricePlaceHolder ? '0' : '1900'}`}
              max={`${pricePlaceHolder ? '' : new Date().getFullYear()}`}
              value={year}
              onChange={onChangInputYearOrPrice}
            />
          )}

          <input
            className="input-add"
            placeholder={placeholders.image}
            value={image}
            onChange={onChangeInputImage}
          />
        </div>
        <div className="form-side form-right">
          <button className="button-add" type="submit">
            ADD
          </button>
        </div>
      </form>
    </>
  );
};
