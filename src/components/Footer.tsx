import { CLUB_INFO } from '../data/clubData';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-black border-t border-white/[0.08] pt-20 pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div className="mb-20 pb-16 border-b border-white/[0.08] text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">
            ГалаСпорт · Всеволожск
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] max-w-3xl mx-auto">
            Приходите знакомиться —
            <span className="text-red-500"> клуб открыт ежедневно</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking('Гостевой визит', 'guest')}
              className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_32px_rgba(232,24,47,0.5)] active:scale-95 cursor-pointer"
            >
              Записаться на гостевой визит
            </button>
            <a
              href={`tel:${CLUB_INFO.phoneClean}`}
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-bold text-sm transition-colors"
            >
              {CLUB_INFO.phone}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-[-0.02em] text-white">ГАЛАСПОРТ</span>
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </a>
            <p className="mt-4 text-[13px] text-neutral-500 leading-relaxed font-medium max-w-xs">
              Фитнес-клуб полного цикла: бассейн 21 м и детская чаша, тренажёрный зал, Cycle-студия, групповые программы, спа-комплекс с хамамом.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-600 mb-4">Направления</p>
            <ul className="space-y-2.5 text-[13.5px] font-semibold text-neutral-400">
              {[
                { label: 'Бассейн 21 метр', href: '#pool' },
                { label: 'Зоны клуба', href: '#zones' },
                { label: 'Спа и хамам', href: '#spa' },
                { label: 'Детская школа плавания', href: '#kids' },
                { label: 'Персональные тренировки', href: '#trainers' },
                { label: 'Расписание', href: '#schedule' }
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-red-500 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-600 mb-4">Яндекс Карты</p>
            <ul className="space-y-2.5 text-[13.5px] font-semibold text-neutral-400">
              {[
                { label: 'ГалаСпорт на карте', href: CLUB_INFO.yandexUrl },
                { label: 'Фитнес-клубы Всеволожска', href: CLUB_INFO.yandexCategoryFitness },
                { label: 'Спортивный зал', href: CLUB_INFO.yandexCategoryGym },
                { label: 'Бассейны Всеволожска', href: CLUB_INFO.yandexCategoryPool }
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-red-500 transition-colors inline-flex items-center gap-1.5"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-600 mb-4">Контакты</p>
            <ul className="space-y-3.5 text-[13.5px] font-semibold text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{CLUB_INFO.address}</span>
              </li>
              <li>
                <a href={`tel:${CLUB_INFO.phoneClean}`} className="flex items-center gap-2.5 text-white font-extrabold hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4 text-red-500" />
                  {CLUB_INFO.phone}
                </a>
              </li>
              <li className="text-neutral-500 tabular-nums leading-relaxed">
                Пн–Пт 07:00–23:00
                <br />
                Сб–Вс 08:00–22:00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-7 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] font-semibold text-neutral-600">
          <p>© {new Date().getFullYear()} Фитнес-клуб «ГалаСпорт», Всеволожск</p>
          <p>
            Армянский пер., 29 ·{' '}
            <a href={`tel:${CLUB_INFO.phoneClean}`} className="hover:text-red-500 transition-colors">
              {CLUB_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
