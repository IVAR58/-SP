import { useState, useEffect } from 'react';

export function ClubStatusBadge({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState({ isOpen: true, toTime: '23:00', day: '' });

  useEffect(() => {
    const update = () => {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
      const dayIndex = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      const isWeekend = dayIndex === 0 || dayIndex === 6;
      const openHour = isWeekend ? 8 : 7;
      const closeHour = isWeekend ? 22 : 23;
      const daysRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      setState({
        isOpen: hour >= openHour && hour < closeHour,
        toTime: `${hour >= openHour && hour < closeHour ? closeHour : openHour}:00`,
        day: daysRu[dayIndex]
      });
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          state.isOpen ? 'bg-white' : 'bg-red-600'
        }`}
        style={state.isOpen ? { boxShadow: '0 0 8px rgba(255,255,255,0.8)' } : undefined}
      />
      <span className={state.isOpen ? 'text-white' : 'text-red-500'}>
        {state.isOpen ? 'Сейчас открыто' : 'Сейчас закрыто'}
      </span>
      <span className="text-neutral-500">·</span>
      <span className="text-neutral-400">до {state.toTime}</span>
      {!compact && (
        <>
          <span className="text-neutral-500 hidden sm:inline">·</span>
          <span className="text-neutral-400 hidden sm:inline">{state.day}</span>
        </>
      )}
    </span>
  );
}
