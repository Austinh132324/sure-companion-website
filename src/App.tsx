import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function AppShell() {
  useSmoothScroll();
  return (
    <>
      <Header />
      <main id="main">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AppShell />
    </BrowserRouter>
  );
}
