import { useState } from 'react';
import { REVIEWS, FAQS, CLUB_INFO } from '../data/clubData';
import { ChevronDown, MessageSquare, ArrowUpRight, Star } from 'lucide-react';
import { Reveal } from './Reveal';

export function ReviewsAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 bg-neutral-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-red-500 mb-4">Голоса гостей</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                Что говорят о клубе
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href={CLUB_INFO.yandexUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-white/50 text-sm font-bold text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-red-500" />
              Читать отзывы на Яндекс Картах
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review, i) => (
            <Reveal key={i} delay={Math.min(i, 3) * 70}>
              <figure className="h-full rounded-[24px] border border-white/10 bg-white/[0.03] hover:border-red-600/40 p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <blockquote className="text-[20px] font-extrabold tracking-[-0.01em] text-white leading-snug">
                    «{review.highlight}»
                  </blockquote>
                  <p className="mt-3 text-[13px] text-neutral-400 leading-relaxed font-medium">{review.text}</p>
                </div>
                <figcaption className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-red-600 text-white text-[13px] font-extrabold flex items-center justify-center">
                    {review.name[0]}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">{review.name}</p>
                    <p className="text-[11px] font-semibold text-neutral-500">{review.date}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-24 sm:mt-32">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white text-center mb-3">
              Частые вопросы
            </h3>
            <p className="text-sm text-neutral-500 font-medium text-center mb-10">
              Всё важное перед первым визитом в клуб
            </p>
          </Reveal>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={idx} delay={Math.min(idx, 4) * 50}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-red-600/50 bg-red-600/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-[15px] font-bold text-white leading-snug">{faq.q}</span>
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen ? 'bg-red-600 border-red-600 rotate-180' : 'border-white/20'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-white" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-[13.5px] text-neutral-400 leading-relaxed font-medium max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
