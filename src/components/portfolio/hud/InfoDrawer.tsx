import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/data/project';

type Props = {
  project: Project;
  open: boolean;
};

export default function InfoDrawer({ project, open }: Props) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key={project.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto overflow-hidden border-t border-white/10 bg-black/85 backdrop-blur-md"
        >
          <div className="grid gap-8 px-5 sm:px-8 py-8 md:grid-cols-[2fr_1fr_1fr] max-w-7xl mx-auto">
            <div className="space-y-3 text-sm leading-relaxed text-white/70">
              {project.longDescription?.map((p, i) => <p key={i}>{p}</p>) ?? (
                <p>{project.description}</p>
              )}
            </div>
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Services
              </h3>
              <ul className="space-y-1.5 text-sm text-white/80">
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Stack
              </h3>
              <ul className="space-y-1.5 text-sm text-white/80">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
