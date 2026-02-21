
'use client';

import { Suspense } from 'react';
import { NewArrivalsContent } from './new-arrivals-content';

export default function NewArrivalsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewArrivalsContent />
    </Suspense>
  );
}
