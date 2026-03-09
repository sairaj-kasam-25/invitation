import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Countdown.module.css';

function getTimeLeft() {
  const target = new Date('2026-03-14T19:00:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function Pad({ n }) {
  return String(n).padStart(2, '0');
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.label}>Reception begins in</p>
          <div className={styles.timer}>
            {units.map((u, i) => (
              <div key={u.label} className={styles.unit}>
                <span className={styles.value}><Pad n={u.value} /></span>
                <span className={styles.unitLabel}>{u.label}</span>
                {i < units.length - 1 && <span className={styles.colon}>:</span>}
              </div>
            ))}
          </div>
          <p className={styles.subLabel}>March 14, 2026 — Vasavi Convention, Gajwel</p>
        </motion.div>
      </div>
    </section>
  );
}
