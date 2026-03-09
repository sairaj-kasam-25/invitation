import { motion } from 'framer-motion';
import { couple, reception } from '../data/weddingData';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.top}>
            <div className={styles.names}>
              <span className={styles.name}>{couple.groom.name}</span>
              <span className={styles.amp}>&</span>
              <span className={styles.name}>{couple.bride.name}</span>
            </div>
            <p className={styles.tagline}>Wedding Reception</p>
            <div className={styles.divider}>
              <span />
              <span className={styles.dividerIcon}>✦</span>
              <span />
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailCol}>
              <span className={styles.detailLabel}>Date</span>
              <span className={styles.detailValue}>{reception.date}</span>
            </div>
            <div className={styles.detailCol}>
              <span className={styles.detailLabel}>Time</span>
              <span className={styles.detailValue}>{reception.time}</span>
            </div>
            <div className={styles.detailCol}>
              <span className={styles.detailLabel}>Venue</span>
              <span className={styles.detailValue}>{reception.venue}</span>
            </div>
            <div className={styles.detailCol}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{couple.city}</span>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © 2026 Ganesh & Manasa Wedding Reception
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
