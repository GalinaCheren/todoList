import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReduser = combineReducers({});
export const store = configureStore({ reducer: rootReduser });
