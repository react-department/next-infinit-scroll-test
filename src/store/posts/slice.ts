import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type IPost from '@/store/posts/interfaces/IPost';
import type { IPostsStore } from '@/store/posts/interfaces/IPostsStore';

import { API_BASE_URL, POSTS_LIMIT } from '@/constants/general';
import { POSTS } from '@/constants/requestUrls';

export const initialState: IPostsStore = {
  isLoading: false,
  posts: [],
};

export const getMorePosts = createAsyncThunk<IPost[], { start: number }>(
  'posts/getPosts',
  async ({ start }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${API_BASE_URL}/${POSTS}?_start=${start}&_limit=${POSTS_LIMIT}`);

      if (data.status === 200) {
        return await (await data.json() as Promise<IPost[]>);
      }

      return rejectWithValue('Error');
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const postsSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setPostsState: (state, action: PayloadAction<Partial<IPostsStore>>) => ({ ...state, ...action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMorePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMorePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload];
      });
  },
});

export const {
  setPostsState,
} = postsSlice.actions;

export default postsSlice.reducer;
