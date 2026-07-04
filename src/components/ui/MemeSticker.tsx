import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MemeStickerProps {
  src: string;
  alt: string;
  className?: string;
  rotate?: number;
  side?: 'left' | 'right';
}

export function MemeSticker({ src, alt, className = '', rotate = -6, side = 'right' }: MemeStickerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const sideClass = side === 'right' ? 'left-full ml-4' : 'right-full mr-4';

  return (
    <>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={() => setOpen(true)}
        className={`hidden xl:block absolute w-36 2xl:w-44 rounded-lg shadow-2xl ring-1 ring-white/10 cursor-zoom-in pointer-events-auto z-10 ${sideClass} ${className}`}
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        whileInView={{ opacity: 1, scale: 1, rotate }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ rotate: 0, scale: 1.12, zIndex: 20, transition: { duration: 0.2 } }}
      />

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            >
              <motion.img
                src={src}
                alt={alt}
                className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-white/80 hover:text-white"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
