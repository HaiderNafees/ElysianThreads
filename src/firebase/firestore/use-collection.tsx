'use client';
import { useState, useEffect, useRef } from 'react';
import { onSnapshot, query, collection, where, getDocs, type Query, type DocumentData, type CollectionReference } from 'firebase/firestore';
import type { QueryConstraint } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface CollectionState<T> {
  data: T[] | null;
  loading: boolean;
}

export function useCollection<T extends DocumentData>(
  q: Query<T> | CollectionReference<T> | null
) {
  const [state, setState] = useState<CollectionState<T>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    if (!q) {
      setState({ data: null, loading: false });
      return;
    }
    setState(prevState => ({ ...prevState, loading: true }));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as T);
        });
        setState({ data, loading: false });
      },
      async (error) => {
        console.error('useCollection snapshot error:', error);
        
        const path = 'path' in q ? q.path : 'unknown path';
        const permissionError = new FirestorePermissionError({
            path: path,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);

        setState({ data: null, loading: false });
      }
    );

    return () => unsubscribe();
  }, [q]);

  return state;
}
