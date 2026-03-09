import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery } from '../data/weddingData';
import styles from './Gallery.module.css';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(null);

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => goTo((active - 1 + gallery.length) % gallery.length);
  const next = () => goTo((active + 1) % gallery.length);

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>Our Moments</span>
          <h2 className={styles.title}>Our <em>Gallery</em></h2>
        </motion.div>
      </div>

      {/* Full-width slider */}
      <motion.div
        className={styles.sliderWrap}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.slider}>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={active}
              className={styles.slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
              onClick={() => setLightbox(gallery[active])}
            >
              <img src={gallery[active].src} alt={gallery[active].alt} draggable={false} />
              <div className={styles.slideOverlay} />
              <span className={styles.slideHint}>Tap to enlarge · Drag to slide</span>
            </motion.div>
          </AnimatePresence>

          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">‹</button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">›</button>
          <div className={styles.counter}>{active + 1} / {gallery.length}</div>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {gallery.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className={styles.thumbStrip}>
          {gallery.map((img, i) => (
            <motion.button
              key={img.id}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={img.src} alt={img.alt} draggable={false} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} />
              <button className={styles.closeBtn} onClick={() => setLightbox(null)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
