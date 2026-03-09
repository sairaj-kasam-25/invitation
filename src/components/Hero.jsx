import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { couple, reception } from '../data/weddingData';
import styles from './Hero.module.css';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" className={styles.hero} ref={ref}>
      {/* Parallax background */}
      <motion.div className={styles.bgWrap} style={{ y }}>
        <div className={styles.bg} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/AJ_06417.JPG)` }} />
        <div className={styles.bgOverlay} />
      </motion.div>

      {/* Decorative circles */}
      <div className={`${styles.deco} ${styles.decoTL}`} />
      <div className={`${styles.deco} ${styles.decoBR}`} />
      <div className={styles.decoLine} />

      <motion.div className={styles.content} style={{ opacity }}>
        <motion.p
          className={styles.preTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Reception Invitation
        </motion.p>

        <motion.div
          className={styles.names}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className={styles.name}>{couple.groom.name}</h1>
          <span className={styles.amp}>&</span>
          <h1 className={styles.name}>{couple.bride.name}</h1>
        </motion.div>

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <span className={styles.dividerLine} />
          <span className={styles.dividerIcon}>✦</span>
          <span className={styles.dividerLine} />
        </motion.div>

        <motion.p
          className={styles.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {reception.date} · {reception.time}
        </motion.p>

        <motion.p
          className={styles.location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {reception.venue} · {couple.city}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <a href="#reception" className={styles.cta} onClick={e => {
            e.preventDefault();
            document.querySelector('#reception')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View Details
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </section>
  );
}
