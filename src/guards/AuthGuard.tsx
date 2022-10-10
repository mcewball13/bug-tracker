import { useState, useEffect, ReactNode } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth.js';

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated, isInitialized]);

  return <>{children}</>;
}
