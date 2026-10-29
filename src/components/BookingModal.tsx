import { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, CalendarDays, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialCategory?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialTitle = 'Запись в фитнес-клуб ГалаСпорт',
  initialCategory = 'guest'
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
      setIsSubmitted(false);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [isOpen, initialCategory]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500);
  };

  const fieldClass =
    'w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-red-600 focus:bg-white/[0.06] transition-colors placeholder:text-neutral-600';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-neutral-950 border border-white/15 rounded-[28px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-7 sm:p-9 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.06] hover:bg-red-600 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(232,24,47,0.45)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-white">Заявка принята</h3>
            <p className="mt-3 text-sm text-neutral-400 font-medium leading-relaxed max-w-sm mx-auto">
              {name ? `${name}, спасибо!` : 'Спасибо!'} Администратор свяжется с вами по номеру{' '}
              <span className="text-white font-bold">{phone}</span> в ближайшее время для подтверждения.
            </p>
            <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-white/[0.03] text-left text-[13px] font-medium text-neutral-400 space-y-1.5">
              <p className="text-white font-extrabold">Фитнес-клуб «ГалаСпорт»</p>
              <p>{CLUB_INFO.address}</p>
              <p className="tabular-nums">Пн–Пт 07:00–23:00 · Сб–Вс 08:00–22:00</p>
              <a href={`tel:${CLUB_INFO.phoneClean}`} className="text-red-500 font-bold hover:underline">
                {CLUB_INFO.phone}
              </a>
            </div>
            <button
              onClick={onClose}
              className="mt-7 w-full py-4 rounded-full bg-white text-black hover:bg-red-600 hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer"
            >
              Отлично
            </button>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-red-500 mb-2">
              ГалаСпорт · Всеволожск
            </p>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white pr-10">{initialTitle}</h3>
            <p className="mt-2 text-[13px] text-neutral-500 font-medium">
              Оставьте контакты — администратор уточнит детали и предложит удобное время.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                  Направление
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-red-600 transition-colors [&>option]:bg-neutral-950"
                >
                  <option value="guest">Гостевой визит / экскурсия по клубу</option>
                  <option value="membership">Клубная карта / абонемент</option>
                  <option value="single">Разовое посещение на весь день (1 700 ₽)</option>
                  <option value="spa">Спа-программа / процедура в хамаме</option>
                  <option value="gift">Подарочный сертификат</option>
                  <option value="kids">Детская секция плавания (3–17 лет)</option>
                  <option value="pt">Персональная тренировка</option>
                  <option value="swim-adult">Плавание для взрослых</option>
                  <option value="callback">Обратный звонок</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                  Имя
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Как к вам обращаться"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                  Желаемая дата
                </label>
                <div className="relative">
                  <CalendarDays className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`${fieldClass} [color-scheme:dark]`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                  Комментарий
                </label>
                <textarea
                  rows={2}
                  placeholder="Удобное время звонка, возраст ребёнка, выбранная программа…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-red-600 focus:bg-white/[0.06] transition-colors placeholder:text-neutral-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_32px_rgba(232,24,47,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? 'Отправляем…' : 'Отправить заявку'}
                {!isLoading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>

              <p className="flex items-start justify-center gap-2 text-[11px] text-neutral-600 font-medium text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                Соглашаюсь на обработку персональных данных
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
