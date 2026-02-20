'use client';
import { initializeFirebase, FirebaseProvider } from '.';
import type { ReactNode } from 'react';

let firebaseApp: any = null;
let firestore: any = null;
let auth: any = null;

/**
 * The FirebaseClientProvider component is a client-side component that
 * initializes Firebase and provides it to all child components.
 *
 * It ensures that Firebase is only initialized once on the client.
 */
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (typeof window !== 'undefined' && !firebaseApp) {
    const services = initializeFirebase();
    firebaseApp = services.firebaseApp;
    firestore = services.firestore;
    auth = services.auth;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
