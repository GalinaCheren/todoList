import React from 'react';
import Todolist from './Todolist';
import { Route, Routes } from 'react-router-dom';
import { Error } from './error/Error';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/:id" element={<Todolist />} />
        <Route path="/404" element={<Error />} />
      </Routes>
    </>
  );
};
