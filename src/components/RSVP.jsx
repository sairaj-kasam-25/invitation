import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RSVP.module.css';

const events = ['Mehendi', 'Sangeet', 'Wedding Ceremony', 'Reception'];

export default function RSVP() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', guests: '1',
    events: [], dietary: '', message: '', attending: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        events: checked ? [...f.events, value] : f.events.filter(v => v !== value)
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className={styles.section}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <span className={styles.eyebrow}>You're Invited</span>
            <h2 className={styles.title}>RSVP</h2>
            <p className={styles.subtitle}>
              Please respond by <strong>March 25, 2025</strong>. We can't wait to celebrate with you!
            </p>
          </div>

          {!submitted ? (
            <form className={styles.form} onSubmit={submit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={form.name} onChange={handle}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email" id="email" name="email"
                    value={form.email} onChange={handle}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={form.phone} onChange={handle}
                    placeholder="+91 ••• ••• ••••"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="guests">Number of Guests *</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handle} required>
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label>Attending *</label>
                <div className={styles.radioGroup}>
                  {['Joyfully Accept', 'Regretfully Decline'].map(opt => (
                    <label key={opt} className={styles.radioLabel}>
                      <input
                        type="radio" name="attending"
                        value={opt} checked={form.attending === opt}
                        onChange={handle} required
                      />
                      <span className={styles.radioCustom} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Which events will you attend?</label>
                <div className={styles.checkGroup}>
                  {events.map(ev => (
                    <label key={ev} className={styles.checkLabel}>
                      <input
                        type="checkbox" name="events"
                        value={ev}
                        checked={form.events.includes(ev)}
                        onChange={handle}
                      />
                      <span className={styles.checkCustom} />
                      <span>{ev}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="dietary">Dietary Requirements</label>
                  <input
                    type="text" id="dietary" name="dietary"
                    value={form.dietary} onChange={handle}
                    placeholder="Vegetarian, Vegan, Allergies..."
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message for the Couple</label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handle}
                  placeholder="Leave your heartfelt wishes..."
                  rows={4}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send RSVP
              </button>
            </form>
          ) : (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.successIcon}>✦</span>
              <h3 className={styles.successTitle}>Thank You, {form.name}!</h3>
              <p className={styles.successText}>
                Your RSVP has been received. We're thrilled to have you join us in our celebrations.
                We'll be in touch with more details soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
