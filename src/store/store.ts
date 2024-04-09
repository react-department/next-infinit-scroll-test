import { configureStore } from '@reduxjs/toolkit';

import posts from './posts/slice';

const makeStore = () => configureStore({
  reducer: {
    posts,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default makeStore;
