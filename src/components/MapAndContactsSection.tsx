import { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { MapPin, Navigation, Check, Copy, X, ArrowUpRight, DoorOpen, Car, Landmark } from 'lucide-react';
import { ClubStatusBadge } from './ClubStatusBadge';
import { Reveal } from './Reveal';

interface MapAndContactsSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function MapAndContactsSection({ onOpenBooking }: MapAndContactsSectionProps) {
  const [copied, setCopied] = useState(false);
  const [entranceOpen, setEntranceOpen] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CLUB_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const todayIndex = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getDay();
  const currentScheduleIdx = [6, 0, 1, 2, 3, 4, 5][todayIndex];

  return (
    <section id="contacts" className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Контакты</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Мы во Всеволожске —
              <br />
              <span className="text-neutral-500">Армянский переулок, 29</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address / phone card */}
            <Reveal>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-8 space-y-7">
                <div className="flex items-center justify-between">
                  <ClubStatusBadge />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-600">Ежедневно</span>
                </div>

                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Адрес</p>
                  <p className="text-xl font-extrabold tracking-[-0.01em] text-white flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    {CLUB_INFO.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={copyAddress}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                        copied
                          ? 'bg-white text-black'
                          : 'bg-white/[0.06] text-neutral-300 hover:text-white border border-white/10 hover:border-white/30'
                      }`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Скопировано' : 'Скопировать адрес'}
                    </button>
                    <button
                      onClick={() => setEntranceOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold bg-white/[0.06] text-neutral-300 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                    >
                      <DoorOpen className="w-3.5 h-3.5" />
                      Показать входы
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Рецепция</p>
                  <a
                    href={`tel:${CLUB_INFO.phoneClean}`}
                    className="text-[28px] sm:text-[32px] font-extrabold tracking-[-0.02em] text-white hover:text-red-500 transition-colors tabular-nums"
                  >
                    {CLUB_INFO.phone}
                  </a>
                </div>

                <a
                  href={`https://yandex.ru/maps/?rtext=~${encodeURIComponent('Всеволожск, Армянский пер., 29')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_28px_rgba(232,24,47,0.5)] flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Построить маршрут
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            {/* Schedule card */}
            <Reveal delay={100}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">График работы</p>
                <ul className="space-y-1">
                  {CLUB_INFO.schedule.map((item, idx) => {
                    const isToday = idx === currentScheduleIdx;
                    return (
                      <li
                        key={idx}
                        className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-[13.5px] transition-colors ${
                          isToday ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 font-medium hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {isToday && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          {item.day}
                          {isToday && <span className="text-[11px] font-semibold text-red-100">· сегодня</span>}
                        </span>
                        <span className={`tabular-nums font-bold ${isToday ? 'text-white' : 'text-white'}`}>{item.hours}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-5 pt-5 border-t border-white/10 flex items-start gap-2.5 text-[12px] font-semibold text-neutral-500">
                  <Car className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  Бесплатная парковка для гостей клуба прямо у входа.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Map column */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-[28px] overflow-hidden border border-white/10 bg-neutral-950 h-full flex flex-col">
              <div className="px-6 py-4 flex items-center justify-between gap-3 border-b border-white/[0.08]">
                <p className="text-sm font-extrabold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  «ГалаСпорт» на карте
                </p>
                <a
                  href={CLUB_INFO.yandexUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] font-bold text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  Открыть в Яндекс Картах
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative flex-1 min-h-[420px] sm:min-h-[520px]">
                <iframe
                  title="Фитнес-клуб ГалаСпорт — карта Всеволожска"
                  src="https://yandex.ru/map-widget/v1/?ll=30.678000%2C60.021000&z=16&text=ГалаСпорт Всеволожск Армянский переулок 29"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: 'grayscale(1) invert(0.92) contrast(1.02)' }}
                />

                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-red-500 mb-1">Фитнес-клуб</p>
                  <p className="text-base font-extrabold text-white tracking-tight">ГалаСпорт</p>
                  <p className="text-[12.5px] font-medium text-neutral-400 mt-1">Армянский пер., 29, Всеволожск</p>
                  <button
                    onClick={() => onOpenBooking('Бесплатная экскурсия по клубу', 'guest')}
                    className="mt-4 w-full py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Записаться на экскурсию
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Entrances modal */}
        {entranceOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setEntranceOpen(false)}
          >
            <div
              className="bg-neutral-950 border border-white/15 rounded-[28px] max-w-lg w-full p-7 sm:p-9 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                  <Landmark className="w-5 h-5 text-red-500" />
                  Входы в клуб
                </p>
                <button
                  onClick={() => setEntranceOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Закрыть"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Центральный вход и рецепция',
                    text: 'Со стороны Армянского переулка, 29 — под вывеской «ГалаСпорт». Здесь вас встретит администратор.'
                  },
                  {
                    title: 'Бесплатная парковка',
                    text: 'Удобный заезд с Армянского переулка прямо к зданию. Освещение и видеонаблюдение.'
                  },
                  {
                    title: 'Первый этаж',
                    text: 'Стойка рецепции, гардероб, вход в аквазону и раздевалки спа-комплекса.'
                  }
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[15px] font-extrabold text-white">{item.title}</p>
                    <p className="mt-1.5 text-[13px] font-medium text-neutral-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setEntranceOpen(false)}
                  className="flex-1 py-3.5 rounded-full border border-white/15 hover:border-white/50 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  Закрыть
                </button>
                <a
                  href={`https://yandex.ru/maps/?rtext=~${encodeURIComponent('Всеволожск, Армянский пер., 29')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm text-center transition-colors"
                >
                  Маршрут в навигаторе
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
