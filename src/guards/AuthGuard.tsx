import { useState, useEffect, ReactNode } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();

  useEffect(() => {
    // * handles if there is a favorite setup and they are not logged in or their token expired
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [pathname, push, isAuthenticated, requestedLocation]);
  if (!isInitialized) {
    // TODO add loading component
    return null;
  }
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // TODO add login component
    return <Login />;
  }

  return <>{children}</>;
}
