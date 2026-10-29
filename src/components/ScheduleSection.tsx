import { useState } from 'react';
import { SCHEDULE_ITEMS } from '../data/clubData';
import { User, MapPin, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface ScheduleSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const CAT_LABELS: Record<string, string> = {
  pool: 'Аквазона',
  cycle: 'Cycle',
  strength: 'Силовые',
  mind: 'Mind & Body',
  kids: 'Дети'
};

const CATS = [
  { id: 'all', label: 'Все направления' },
  { id: 'pool', label: 'Аквазона' },
  { id: 'cycle', label: 'Cycle студия' },
  { id: 'strength', label: 'Силовые' },
  { id: 'mind', label: 'Mind & Body' },
  { id: 'kids', label: 'Детские' }
] as const;

export function ScheduleSection({ onOpenBooking }: ScheduleSectionProps) {
  const jsDay = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getDay();
  const todayLabel = DAYS[(jsDay + 6) % 7];
  const [selectedDay, setSelectedDay] = useState(todayLabel);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = SCHEDULE_ITEMS.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);

  return (
    <section id="schedule" className="py-24 sm:py-32 bg-neutral-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Групповые программы</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                Расписание занятий
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-5 text-base text-neutral-400 leading-relaxed font-medium">
                Все групповые тренировки — аквааэробика, Cycle, йога, силовые классы — уже включены в клубные карты «ГалаСпорт».
              </p>
            </Reveal>
          </div>

          {/* Day pills */}
          <Reveal delay={140}>
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-white/[0.03] w-max">
              {DAYS.map((day) => {
                const active = day === selectedDay;
                const isToday = day === todayLabel;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-[13px] font-extrabold transition-all duration-300 cursor-pointer ${
                      active ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {day}
                    {isToday && !active && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {CATS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[12.5px] font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Sessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, index) => (
            <Reveal key={index} delay={Math.min(index, 5) * 50}>
              <article className="group h-full rounded-[22px] bg-white/[0.03] border border-white/10 hover:border-red-600/50 p-6 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-lg font-extrabold tracking-[-0.01em] text-white tabular-nums">{item.time}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-red-600/15 border border-red-600/30 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-red-500">
                        {CAT_LABELS[item.category]}
                      </span>
                      <span className="hidden sm:inline-block text-[11px] font-bold text-neutral-500">{item.level}</span>
                    </div>
                  </div>

                  <h4 className="text-[17px] font-extrabold tracking-[-0.01em] text-white group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h4>

                  <div className="mt-3 space-y-1.5">
                    <p className="flex items-center gap-2 text-[12.5px] font-semibold text-neutral-400">
                      <User className="w-3.5 h-3.5 text-neutral-600" />
                      {item.instructor}
                    </p>
                    <p className="flex items-center gap-2 text-[12.5px] font-semibold text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      {item.room}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-neutral-500">
                    {selectedDay} · включено в карту
                  </span>
                  <button
                    onClick={() => onOpenBooking(`Групповая тренировка: ${item.title} (${selectedDay}, ${item.time})`, 'group')}
                    className="inline-flex items-center gap-1 text-[12.5px] font-bold text-white hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Записаться
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
