import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/weddingData';
import styles from './Events.module.css';

function EventCard({ event, isActive, onClick }) {
  return (
    <motion.div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardDay}>{event.day}</span>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <span className={styles.cardSub}>{event.subtitle}</span>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardDate}>{event.date}</span>
        <span className={styles.cardTime}>{event.time}</span>
      </div>
      <div className={styles.cardAccent} style={{ background: event.color }} />
    </motion.div>
  );
}

export default function Events() {
  const [active, setActive] = useState(events[2]);

  return (
    <section id="events" className={styles.section}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>Celebrations</span>
          <h2 className={styles.title}>Our <em>Events</em></h2>
          <p className={styles.subtitle}>
            Four magical celebrations — each one a unique expression of our joy, culture, and love.
          </p>
        </motion.div>

        <div className={styles.layout}>
          {/* Cards grid */}
          <motion.div
            className={styles.cards}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {events.map(e => (
              <EventCard
                key={e.id}
                event={e}
                isActive={active?.id === e.id}
                onClick={() => setActive(e)}
              />
            ))}
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                className={styles.detail}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.detailImage}>
                  <img src={active.image} alt={active.title} />
                  <div className={styles.detailImageOverlay} />
                </div>
                <div className={styles.detailContent}>
                  <div className={styles.detailHeader}>
                    <span className={styles.detailEyebrow}>{active.day} · {active.date}</span>
                    <h3 className={styles.detailTitle}>{active.title}</h3>
                    <p className={styles.detailSub}>{active.subtitle}</p>
                  </div>

                  <div className={styles.divider}>
                    <span />
                    <span className={styles.dividerDot}>✦</span>
                    <span />
                  </div>

                  <p className={styles.detailText}>{active.description}</p>

                  <div className={styles.detailMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Venue</span>
                      <span className={styles.metaValue}>{active.venue}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Address</span>
                      <span className={styles.metaValue}>{active.address}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Time</span>
                      <span className={styles.metaValue}>{active.time}</span>
                    </div>
                  </div>

                  <a
                    href={active.mapsLink || `https://maps.google.com?q=${encodeURIComponent(active.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapBtn}
                  >
                    📍 Navigate to Venue
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
