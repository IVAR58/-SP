import { KIDS_PROGRAMS, PERSONAL_TRAINERS_INFO } from '../data/clubData';
import { Waves, Award, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface KidsSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

export function KidsSection({ onOpenBooking }: KidsSectionProps) {
  const coach = PERSONAL_TRAINERS_INFO.coachHighlight;

  return (
    <section id="kids" className="py-24 sm:py-32 bg-neutral-950 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Детские секции · 3–17 лет</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Школа плавания
              <br />
              <span className="text-neutral-500">для детей и подростков</span>
            </h2>
          </Reveal>
        </div>

        {/* Coach feature — asymmetric with real pool photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <Reveal className="lg:col-span-7">
            <div className="relative img-zoom rounded-[28px] overflow-hidden border border-white/10">
              <img
                src="/images/pool-training.jpg"
                alt="Детская тренировка по плаванию у борта бассейна — ГалаСпорт"
                className="w-full h-[300px] sm:h-[460px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-[0.15em] mb-2">
                  Уроки в нашем бассейне
                </span>
                <p className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">
                  Мягкая адаптация к воде, техника, уверенность
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-[0.12em]">
                    <Award className="w-3.5 h-3.5" />
                    {coach.title}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">{coach.name}</h3>
                <p className="mt-1 text-sm font-bold text-red-500">{coach.role}</p>
                <p className="mt-1.5 text-[13px] font-semibold text-neutral-500">{coach.experience}</p>
                <p className="mt-4 text-[14px] text-neutral-400 leading-relaxed font-medium">
                  Обучение с первых шагов в воде, постановка спортивной техники, укрепление иммунитета и осанки. Индивидуально, в паре или в мини-группах по возрасту и уровню.
                </p>
                <button
                  onClick={() => onOpenBooking(`Детская секция: ${KIDS_PROGRAMS[1].title}`, 'kids')}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors cursor-pointer"
                >
                  Записаться к тренеру
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {KIDS_PROGRAMS.map((program, i) => (
            <Reveal key={program.id} delay={Math.min(i, 5) * 60}>
              <article
                className={`group h-full rounded-[24px] p-7 flex flex-col transition-all duration-500 hover:-translate-y-1.5 ${
                  program.popular
                    ? 'bg-red-600 shadow-[0_20px_60px_-18px_rgba(232,24,47,0.55)]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                      program.popular ? 'bg-black/30 text-white' : 'bg-red-600/15 text-red-500 border border-red-600/30'
                    }`}
                  >
                    {program.duration}
                  </span>
                  {program.popular && (
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-red-100">
                      Популярно
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-extrabold tracking-[-0.01em] text-white leading-snug">
                  {program.title}
                </h4>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[32px] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
                    {program.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                {program.priceNote && (
                  <p className={`mt-1 text-[12px] font-semibold ${program.popular ? 'text-red-100' : 'text-neutral-500'}`}>
                    {program.priceNote}
                  </p>
                )}

                <p className={`mt-4 text-[13px] leading-relaxed font-medium ${program.popular ? 'text-red-50/90' : 'text-neutral-400'}`}>
                  {program.description}
                </p>

                <p className={`mt-4 pt-4 border-t text-[12px] font-semibold flex items-center gap-2 ${program.popular ? 'border-white/25 text-red-100' : 'border-white/10 text-neutral-400'}`}>
                  <Waves className="w-4 h-4 shrink-0" />
                  {program.suitableFor}
                </p>

                <div className="mt-6 pt-1 grow flex items-end">
                  <button
                    onClick={() =>
                      onOpenBooking(`Детская секция: ${program.title} (${program.price} ₽)`, 'kids')
                    }
                    className={`w-full py-3 rounded-full font-bold text-[13px] transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                      program.popular
                        ? 'bg-black text-white hover:bg-neutral-900'
                        : 'bg-white text-black hover:bg-red-600 hover:text-white'
                    }`}
                  >
                    Записать ребёнка
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
