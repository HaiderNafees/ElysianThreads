'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface DocState<T> {
  data: T | null;
  loading: boolean;
}

export function useDoc<T extends DocumentData>(
  ref: DocumentReference<T> | null
) {
  const [state, setState] = useState<DocState<T>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    if (!ref) {
      setState({ data: null, loading: false });
      return;
    }
    setState(prevState => ({ ...prevState, loading: true }));

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        if (doc.exists()) {
          setState({ data: { id: doc.id, ...doc.data() } as T, loading: false });
        } else {
          setState({ data: null, loading: false });
        }
      },
      async (error) => {
        console.error('useDoc snapshot error:', error);

        const permissionError = new FirestorePermissionError({
            path: ref.path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);

        setState({ data: null, loading: false });
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return state;
}
