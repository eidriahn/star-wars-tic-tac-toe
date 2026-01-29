import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  Slot,
  type Signal,
} from '@builder.io/qwik';
import type { AuthState } from './types';

export const AuthContext = createContextId<Signal<AuthState>>('auth-context');

export const AuthProvider = component$(() => {
  const state = useSignal<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  useContextProvider(AuthContext, state);

  return <Slot />;
});