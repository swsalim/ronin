import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex max-w-7xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      {/* <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20"> */}
      {children}
      {/* </main> */}
      <Footer />
    </div>
  );
}
