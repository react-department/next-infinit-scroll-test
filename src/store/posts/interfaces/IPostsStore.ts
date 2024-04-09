import type IPost from '@/store/posts/interfaces/IPost';

export interface IPostsStore {
  isLoading: boolean,
  posts: IPost[],
}
