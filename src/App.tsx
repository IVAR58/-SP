import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PoolSection } from './components/PoolSection';
import { ZonesSection } from './components/ZonesSection';
import { MembershipsSection } from './components/MembershipsSection';
import { SpaSection } from './components/SpaSection';
import { KidsSection } from './components/KidsSection';
import { PersonalTrainingSection } from './components/PersonalTrainingSection';
import { ScheduleSection } from './components/ScheduleSection';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { ReviewsAndFaqSection } from './components/ReviewsAndFaqSection';
import { MapAndContactsSection } from './components/MapAndContactsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Phone } from 'lucide-react';
import { CLUB_INFO } from './data/clubData';

interface ModalState {
  isOpen: boolean;
  title?: string;
  category?: string;
}

export default function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: 'Запись в фитнес-клуб ГалаСпорт',
    category: 'guest'
  });

  const handleOpenBooking = (title?: string, category?: string) => {
    setModalState({
      isOpen: true,
      title: title || 'Запись в фитнес-клуб ГалаСпорт',
      category: category || 'guest'
    });
  };

  const handleCloseBooking = () => setModalState((prev) => ({ ...prev, isOpen: false }));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar onOpenBooking={handleOpenBooking} />

      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <PoolSection onOpenBooking={handleOpenBooking} />
        <ZonesSection onOpenBooking={handleOpenBooking} />
        <MembershipsSection onOpenBooking={handleOpenBooking} />
        <SpaSection onOpenBooking={handleOpenBooking} />
        <KidsSection onOpenBooking={handleOpenBooking} />
        <PersonalTrainingSection onOpenBooking={handleOpenBooking} />
        <ScheduleSection onOpenBooking={handleOpenBooking} />
        <InteractiveCalculator onOpenBooking={handleOpenBooking} />
        <ReviewsAndFaqSection />
        <MapAndContactsSection onOpenBooking={handleOpenBooking} />
      </main>

      <Footer onOpenBooking={handleOpenBooking} />

      <BookingModal
        isOpen={modalState.isOpen}
        onClose={handleCloseBooking}
        initialTitle={modalState.title}
        initialCategory={modalState.category}
      />

      {/* Mobile quick actions */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden grid grid-cols-2 gap-2 p-2 rounded-full bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl">
        <a
          href={`tel:${CLUB_INFO.phoneClean}`}
          className="py-3 rounded-full border border-white/20 text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
        >
          <Phone className="w-4 h-4" />
          Позвонить
        </a>
        <button
          onClick={() => handleOpenBooking('Гостевой визит', 'guest')}
          className="py-3 rounded-full bg-red-600 text-white font-bold text-[13px] active:scale-[0.97] transition-transform cursor-pointer"
        >
          Гостевой визит
        </button>
      </div>
    </div>
  );
}
