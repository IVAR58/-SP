import { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Reveal } from './Reveal';

interface CalculatorProps {
  onOpenBooking: (title?: string, category?: string) => void;
}

const GOALS = [
  { id: 'fit', label: 'Фитнес и тренажёры' },
  { id: 'swim', label: 'Бассейн и плавание' },
  { id: 'spa', label: 'Спа, массаж и хамам' },
  { id: 'kids', label: 'Секция для ребёнка' }
] as const;

const TIMES = [
  { id: 'any', label: 'В любое время' },
  { id: 'day', label: 'Утро / день в будни' },
  { id: 'weekends', label: '1 раз в неделю' }
] as const;

const PERIODS = [
  { id: 'year', label: '1 год' },
  { id: 'half', label: '6 месяцев' },
  { id: 'month', label: '1 месяц' },
  { id: 'single', label: 'Разовый визит' }
] as const;

type GoalId = (typeof GOALS)[number]['id'];
type TimeId = (typeof TIMES)[number]['id'];
type PeriodId = (typeof PERIODS)[number]['id'];

export function InteractiveCalculator({ onOpenBooking }: CalculatorProps) {
  const [goal, setGoal] = useState<GoalId>('fit');
  const [time, setTime] = useState<TimeId>('any');
  const [period, setPeriod] = useState<PeriodId>('year');

  const getRecommendation = () => {
    if (goal === 'kids') {
      return {
        title: 'Детская секция плавания',
        price: '2 200 ₽ / урок · мини-группа от 1 000 ₽',
        description: 'Индивидуальные и мини-групповые занятия 3–17 лет с мастером спорта СССР Натальей Чеглаковой в детской чаше бассейна.',
        category: 'kids'
      };
    }
    if (goal === 'spa') {
      return {
        title: 'Спа-программа или процедура в хамаме',
        price: 'от 3 000 ₽',
        description: 'Пилинг, мыльный массаж, обёртывания в хамаме и авторские спа-релаксации длительностью до 2.5 часов.',
        category: 'spa'
      };
    }
    if (period === 'single') {
      return {
        title: 'Разовое посещение',
        price: '1 700 ₽',
        description: 'Весь клуб на весь день без ограничений: зал, бассейн 21 м, Cycle, групповые программы, сауна и хамам.',
        category: 'membership'
      };
    }
    if (time === 'weekends') {
      return {
        title: '50 посещений на 1 год',
        price: '26 000 ₽',
        description: 'Визиты списываются по факту прихода — идеальный формат при занятиях раз в неделю.',
        category: 'membership'
      };
    }
    if (time === 'day') {
      return period === 'half'
        ? {
            title: 'Дневной абонемент на 6 месяцев',
            price: '21 500 ₽',
            description: 'Дневной формат на полгода со всеми зонами клуба — максимум экономии при тренировках утром и днём.',
            category: 'membership'
          }
        : {
            title: 'Дневной абонемент на 1 год',
            price: '32 000 ₽',
            description: 'Около 2 660 ₽ в месяц за дневной доступ во все зоны клуба на целый год.',
            category: 'membership'
          };
    }
    if (period === 'half') {
      return {
        title: '6 месяцев без ограничений',
        price: '28 000 ₽',
        description: 'Хит продаж: полный безлимит в любые часы работы, 7 дней в неделю, на половину года.',
        category: 'membership'
      };
    }
    if (period === 'month') {
      return {
        title: '1 месяц без ограничений',
        price: '7 000 ₽',
        description: 'Месяц полной свободы во всех зонах клуба без долгосрочных обязательств.',
        category: 'membership'
      };
    }
    return {
      title: '1 год без ограничений',
      price: '42 000 ₽ · всего 3 500 ₽/мес',
      description: 'Флагманская карта: 12 месяцев неограниченного фитнеса, бассейна и спа в любое время работы клуба.',
      category: 'membership'
    };
  };

  const rec = getRecommendation();

  const Option = ({
    options,
    value,
    onChange,
    cols
  }: {
    options: readonly { id: string; label: string }[];
    value: string;
    onChange: (id: never) => void;
    cols: string;
  }) => (
    <div className={`grid ${cols} gap-2`}>
      {options.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id as never)}
            className={`relative px-4 py-3.5 rounded-2xl text-[13px] font-bold text-left transition-all duration-300 cursor-pointer ${
              active
                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(232,24,47,0.3)]'
                : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10 hover:border-white/25'
            }`}
          >
            <span className="pr-5 block">{item.label}</span>
            <span
              className={`absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                active ? 'border-white bg-white' : 'border-neutral-600'
              }`}
            >
              {active && <Check className="w-2.5 h-2.5 text-red-600" strokeWidth={4} />}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="py-24 sm:py-32 bg-black border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Подбор за минуту</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
              Какой формат подходит вам?
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-5 text-base text-neutral-400 leading-relaxed font-medium">
              Три вопроса — и мы покажем самый выгодный вариант посещения «ГалаСпорт».
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="rounded-[28px] border border-white/10 bg-neutral-950 p-6 sm:p-10">
            <div className="space-y-9">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  01 — Ваша цель
                </p>
                <Option options={GOALS} value={goal} onChange={(id: GoalId) => setGoal(id)} cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
              </div>

              {goal !== 'spa' && goal !== 'kids' && (
                <>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                      02 — Время посещений
                    </p>
                    <Option options={TIMES} value={time} onChange={(id: TimeId) => setTime(id)} cols="grid-cols-1 sm:grid-cols-3" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                      03 — Период
                    </p>
                    <Option options={PERIODS} value={period} onChange={(id: PeriodId) => setPeriod(id)} cols="grid-cols-2 lg:grid-cols-4" />
                  </div>
                </>
              )}
            </div>

            {/* Result */}
            <div className="mt-10 pt-8 border-t border-white/10" key={rec.title}>
              <div className="rounded-[22px] bg-red-600 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_24px_60px_-18px_rgba(232,24,47,0.5)]">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-red-100 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Рекомендуем
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">{rec.title}</p>
                  <p className="mt-1 text-lg font-extrabold text-red-100 tabular-nums">{rec.price}</p>
                  <p className="mt-2.5 text-[13.5px] text-red-50/90 font-medium max-w-lg leading-relaxed">{rec.description}</p>
                </div>
                <button
                  onClick={() => onOpenBooking(`Подбор: ${rec.title}`, rec.category)}
                  className="group shrink-0 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-bold text-sm transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Оформить
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
