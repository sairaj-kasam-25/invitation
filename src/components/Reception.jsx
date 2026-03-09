import { motion } from 'framer-motion';
import { reception, couple } from '../data/weddingData';
import styles from './Reception.module.css';

const details = [
  { label: 'Date', value: reception.date },
  { label: 'Day', value: reception.day },
  { label: 'Time', value: reception.time },
  { label: 'Venue', value: reception.venue },
  { label: 'Location', value: reception.address },
];

export default function Reception() {
  return (
    <section id="reception" className={styles.section}>
      <div className={styles.bgDeco} />

      <div className="container">
        {/* Section heading */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>You Are Cordially Invited</span>
          <h2 className={styles.title}>Wedding <em>Reception</em></h2>
          <p className={styles.description}>{reception.description}</p>
        </motion.div>

        {/* Main card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Image side */}
          <div className={styles.imageWrap} id="venue">
            <img src={reception.image} alt="Reception venue" />
            <div className={styles.imageOverlay} />
            <div className={styles.imageLabel}>
              <span className={styles.imageLabelTop}>Reception</span>
              <span className={styles.imageLabelVenue}>{reception.venue}</span>
            </div>
          </div>

          {/* Info side */}
          <div className={styles.info}>
            <div className={styles.coupleBlock}>
              <span className={styles.coupleName}>{couple.groom.name}</span>
              <span className={styles.coupleAmp}>&</span>
              <span className={styles.coupleName}>{couple.bride.name}</span>
            </div>

            <div className={styles.divider}>
              <span /><span className={styles.dividerDot}>✦</span><span />
            </div>

            <div className={styles.detailsGrid}>
              {details.map(d => (
                <div key={d.label} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{d.label}</span>
                  <span className={styles.detailValue}>{d.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider}>
              <span /><span className={styles.dividerDot}>✦</span><span />
            </div>

            <p className={styles.wish}>
              Your presence will make our celebration truly special. 💫
            </p>

            <a
              href={reception.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
            >
              📍 Find Your Way to Us
            </a>
          </div>
        </motion.div>

        {/* Decorative bottom quote */}
        <motion.p
          className={styles.quote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          "One year of love, a lifetime of memories — come celebrate with us 💍"
        </motion.p>
      </div>
    </section>
  );
}
