import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Reception from './components/Reception';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Reception />
      </main>
      <Footer />
    </>
  );
}
