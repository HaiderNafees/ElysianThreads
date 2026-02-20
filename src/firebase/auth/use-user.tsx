'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';

interface UserState {
  data: User | null;
  loading: boolean;
}

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<UserState>({ data: null, loading: true });

  useEffect(() => {
    if (!auth) {
      setUser({ data: null, loading: false });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser({ data: user, loading: false });
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}
