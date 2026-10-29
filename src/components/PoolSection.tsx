import { ArrowRight, Waves } from 'lucide-react';
import { Reveal } from './Reveal';

interface PoolSectionProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const POOL_FACTS = [
  { value: '21 м', label: 'длина бассейна' },
  { value: '28–29°', label: 'температура воды' },
  { value: '2 чаши', label: 'взрослая и детская' },
  { value: '07:00', label: 'ранние заплывы с утра' }
];

export function PoolSection({ onOpenBooking }: PoolSectionProps) {
  return (
    <section id="pool" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Text column */}
          <div className="lg:col-span-5 lg:pt-10">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-5">
                <Waves className="w-4 h-4" />
                Аквазона клуба
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
                Бассейн
                <br />
                21 метр
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed font-medium max-w-md">
                Просторный бассейн с дорожками для свободного и спортивного плавания, мягкой очисткой воды без резкого запаха хлора и отдельной безопасной чашей для детей.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 max-w-md border-t border-white/10 pt-8">
                {POOL_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-1.5">
                      {fact.label}
                    </dt>
                    <dd className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenBooking('Запись: бассейн и аквазона', 'guest')}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_28px_rgba(232,24,47,0.5)] active:scale-95 cursor-pointer"
                >
                  Прийти на заплыв
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#kids"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 hover:border-white/60 text-white/85 hover:text-white font-bold text-sm transition-colors"
                >
                  Плавание для детей
                </a>
              </div>
            </Reveal>
          </div>

          {/* Asymmetric photo composition */}
          <div className="lg:col-span-7 relative">
            <Reveal className="img-zoom relative rounded-[28px] overflow-hidden border border-white/10" delay={100}>
              <img
                src="/images/pool-lanes.jpg"
                alt="Дорожки бассейна 21 метр в фитнес-клубе ГалаСпорт, Всеволожск"
                className="w-full h-[380px] sm:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  Реальное фото клуба
                </span>
                <p className="text-white font-bold text-lg sm:text-xl tracking-tight">
                  Дорожки для свободного плавания
                </p>
              </figcaption>
            </Reveal>

            {/* Overlapping photo card */}
            <Reveal
              className="relative sm:absolute sm:-bottom-14 sm:-left-6 lg:-left-14 mt-6 sm:mt-0 w-full sm:w-[46%] img-zoom rounded-3xl overflow-hidden border-4 border-black shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]"
              delay={260}
            >
              <img
                src="/images/pool-training.jpg"
                alt="Занятие по плаванию у борта бассейна с тренером — ГалаСпорт"
                className="w-full h-[220px] sm:h-[260px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-bold tracking-tight">
                Тренировки у борта с наставником
              </p>
            </Reveal>

            {/* Red geometric accents */}
            <div className="hidden sm:block absolute -top-8 -right-4 w-24 h-24 border-2 border-red-600/40 rounded-3xl -z-10" />
            <div className="hidden sm:block absolute top-1/2 -right-10 w-40 h-1 bg-red-600/60 rounded-full -z-10" />
          </div>
        </div>

        {/* Full-bleed panorama strip */}
        <Reveal delay={100} className="mt-20 sm:mt-32">
          <figure className="img-zoom relative rounded-[28px] overflow-hidden border border-white/10">
            <img
              src="/images/pool-panorama.jpg"
              alt="Панорама бассейна фитнес-клуба ГалаСпорт — зона отдыха у воды, шезлонги"
              className="w-full h-[340px] sm:h-[520px] lg:h-[560px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div className="max-w-xl">
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[-0.02em] text-white leading-snug">
                  Заплывы в стоимости каждой
                  <span className="text-red-500"> клубной карты</span>
                </p>
                <p className="mt-2 text-sm sm:text-base text-neutral-300 font-medium">
                  Взрослый бассейн 21 метр, детская чаша и зона отдыха — без дополнительной оплаты.
                </p>
              </div>
              <button
                onClick={() => onOpenBooking('Абонемент с бассейном', 'membership')}
                className="shrink-0 px-7 py-3.5 rounded-full bg-white text-black hover:bg-red-600 hover:text-white font-bold text-sm transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Смотреть абонементы
              </button>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
