
'use client';

import { Suspense } from 'react';
import { NavigationEvents } from '@/components/NavigationEvents';
import Loader from '@/components/Loader';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <NavigationEvents />
      {children}
    </Suspense>
  );
}
