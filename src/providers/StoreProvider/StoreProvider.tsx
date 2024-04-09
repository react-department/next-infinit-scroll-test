'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import makeStore from '../../store/store';

import type { AppStore } from '@/store/types/TStore';
import type IStoreProvider from './interfaces/IStoreProvider';

export default function StoreProvider({ children }: IStoreProvider) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
