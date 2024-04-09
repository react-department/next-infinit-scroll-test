import React from 'react';

import type IPost from '@/store/posts/interfaces/IPost';

import styles from './sass/page.module.scss';

import Posts from '@/app/[lng]/components/Posts';
import { API_BASE_URL, POSTS_LIMIT } from '@/constants/general';
import { POSTS } from '@/constants/requestUrls';

async function getPosts() {
  const res = await fetch(`${API_BASE_URL}/${POSTS}?_start=0&_limit=${POSTS_LIMIT}`);
  return await res.json() as Promise<IPost[]>;
}

export default async function Home() {
  const postsData = await getPosts();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Posts posts={postsData} />
      </div>
    </main>
  );
}
