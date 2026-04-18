'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { projects, type Project } from '@/data/project';

function slugFor(p: Project): string {
  return p.slug ?? String(p.id);
}

export function useProjectNav(options?: { disabled?: boolean }) {
  const disabled = !!options?.disabled;
  const router = useRouter();
  const params = useSearchParams();
  const currentKey = params.get('project');

  const index = useMemo(() => {
    if (!currentKey) return 0;
    const i = projects.findIndex(
      (p) => slugFor(p) === currentKey || String(p.id) === currentKey,
    );
    return i === -1 ? 0 : i;
  }, [currentKey]);

  const project = projects[index];

  const goTo = useCallback(
    (i: number) => {
      const clamped =
        ((i % projects.length) + projects.length) % projects.length;
      const target = slugFor(projects[clamped]);
      const q = new URLSearchParams(params);
      q.set('project', target);
      router.replace(`/portfolio?${q.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (disabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'l') next();
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'h') prev();
      else if (e.key.toLowerCase() === 'j') next();
      else if (e.key.toLowerCase() === 'k') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, disabled]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) next();
      else prev();
    },
    [next, prev],
  );

  return {
    index,
    project,
    total: projects.length,
    goTo,
    next,
    prev,
    onTouchStart,
    onTouchEnd,
  };
}

export { slugFor };
