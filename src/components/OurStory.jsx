import { motion } from 'framer-motion';
import { story, couple } from '../data/weddingData';
import styles from './OurStory.module.css';

export default function OurStory() {
  return (
    <section id="story" className={styles.section}>
      <div className={styles.decoLeft} />
      <div className={styles.decoRight} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>Our Love Story</span>
          <h2 className={styles.title}>
            {couple.groom.name}{' '}
            <span className={styles.amp}>&</span>{' '}
            {couple.bride.name}
          </h2>
          <p className={styles.intro}>
            A story of two souls finding each other in the most unexpected of places,
            and choosing each other every single day since.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {story.map((item, i) => (
            <motion.div
              key={item.year}
              className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 * i }}
            >
              <div className={styles.card}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </div>
              <div className={styles.dot} />
            </motion.div>
          ))}
          <div className={styles.timelineBar} />
        </div>
      </div>
    </section>
  );
}
