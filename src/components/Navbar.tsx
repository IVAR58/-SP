import { useState, useEffect } from 'react';
import { Phone, Menu, X, MapPin } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { ClubStatusBadge } from './ClubStatusBadge';

interface NavbarProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const NAV_LINKS = [
  { label: 'Бассейн', href: '#pool' },
  { label: 'Зоны клуба', href: '#zones' },
  { label: 'Абонементы', href: '#memberships' },
  { label: 'Спа и хамам', href: '#spa' },
  { label: 'Детям', href: '#kids' },
  { label: 'Тренеры', href: '#trainers' },
  { label: 'Расписание', href: '#schedule' },
  { label: 'Контакты', href: '#contacts' }
];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility top bar */}
      <div className="relative z-50 bg-black text-xs border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-3">
          <ClubStatusBadge />
          <a
            href="#contacts"
            className="hidden lg:flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <MapPin className="w-3 h-3 text-red-500" />
            <span className="font-medium">{CLUB_INFO.address}</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenBooking('Обратный звонок', 'callback')}
              className="hidden sm:block text-neutral-400 hover:text-red-500 transition-colors font-medium cursor-pointer"
            >
              Заказать звонок
            </button>
            <a
              href={`tel:${CLUB_INFO.phoneClean}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-red-500 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{CLUB_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Scroll progress line */}
        <div
          className="absolute top-0 left-0 h-px bg-red-600 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Wordmark */}
            <a href="#" className="group flex items-baseline gap-2 select-none">
              <span className="text-[22px] sm:text-2xl font-extrabold tracking-[-0.02em] text-white leading-none">
                ГАЛАСПОРТ
              </span>
              <span className="w-2 h-2 rounded-full bg-red-600 group-hover:scale-125 transition-transform" />
              <span className="hidden md:block text-[11px] font-semibold text-neutral-500 tracking-[0.2em] uppercase translate-y-[-1px]">
                Всеволожск
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-[13.5px] font-semibold text-neutral-400 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden sm:block">
              <button
                onClick={() => onOpenBooking('Гостевой визит', 'guest')}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold tracking-tight transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,24,47,0.45)] active:scale-95 cursor-pointer"
              >
                Гостевой визит
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 -mr-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Меню"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileOpen ? 'max-h-[560px] bg-black/95 backdrop-blur-xl border-b border-white/[0.08]' : 'max-h-0'
          }`}
        >
          <div className="px-5 py-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-2.5 text-base font-semibold text-neutral-300 hover:text-red-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`tel:${CLUB_INFO.phoneClean}`}
                className="w-full py-3 rounded-full border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {CLUB_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenBooking('Гостевой визит', 'guest');
                }}
                className="w-full py-3 rounded-full bg-red-600 text-white font-bold text-sm cursor-pointer"
              >
                Записаться на визит
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
