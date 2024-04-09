'use client';

import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { shallowEqual } from 'react-redux';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';
import type { IPostPage } from '@/app/[lng]/interfaces/IPage';
import type IPost from '@/store/posts/interfaces/IPost';

import styles from '../sass/page.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/hooks/useApp';
import { getMorePosts } from '@/store/posts/slice';

function Posts({ posts }: IPostPage): ReactElement {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const { postsData } = useAppSelector(({ posts: postsSlice }) => (
    { postsData: postsSlice }
  ), shallowEqual);

  const allPosts = useMemo(() => (
    [...posts, ...postsData.posts]
  ), [posts, postsData.posts]);

  const getMorePost = async () => {
    const { payload } = await dispatch(getMorePosts({ start: allPosts.length })) as PayloadAction<IPost[]>;
    if (payload.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {allPosts.map((data) => (
          <div key={data.id}>
            <div className={styles.post}>
              <strong>{data.id}</strong>
              <span>{data.title}</span>
              <p>{data.body}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
