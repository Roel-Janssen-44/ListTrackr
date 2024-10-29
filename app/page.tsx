import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { Metadata } from 'next';
import Hero from '@/app/components/hero';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
