'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

type Ctx = {
  toggleRef: { current: (() => void) | null };
};

const GlobalMenuContext = createContext<Ctx | null>(null);

export function GlobalMenuProvider({ children }: { children: ReactNode }) {
  const toggleRef = useRef<(() => void) | null>(null);
  const value = useMemo<Ctx>(() => ({ toggleRef }), []);
  return (
    <GlobalMenuContext.Provider value={value}>
      {children}
    </GlobalMenuContext.Provider>
  );
}

export function useRegisterGlobalMenuToggle(fn: () => void) {
  const ctx = useContext(GlobalMenuContext);
  useEffect(() => {
    if (!ctx) return;
    ctx.toggleRef.current = fn;
    return () => {
      if (ctx.toggleRef.current === fn) ctx.toggleRef.current = null;
    };
  }, [ctx, fn]);
}

export function useGlobalMenuToggle() {
  const ctx = useContext(GlobalMenuContext);
  return useCallback(() => ctx?.toggleRef.current?.(), [ctx]);
}
