'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const PAUSE_AFTER_MANUAL = 6000;

export function useGalleryCycler(total: number) {
  const [index, setIndex] = useState(0);
  const pausedUntil = useRef(0);

  useEffect(() => {
    setIndex(0);
    pausedUntil.current = 0;
  }, [total]);

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + PAUSE_AFTER_MANUAL;
  }, []);

  return { index, next, prev, go, pause };
}
