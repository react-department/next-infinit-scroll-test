import type { ILngNs } from '@/i18n/interfaces/IUseTranslation';
import type IPost from '@/store/posts/interfaces/IPost';

type IParams = {
  lng: ILngNs,
};

export interface ILayout {
  children: React.ReactNode,
  params: IParams,
}

export interface IPage {
  params: IParams,
}

export interface IPostPage {
  posts: IPost[],
}
