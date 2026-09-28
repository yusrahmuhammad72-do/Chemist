import React from 'react';
import { TESTIMONIALS } from '../data/pharmacyData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Community Voice</span>
            <span aria-hidden="true">·</span>
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Trusted by Families Across Lagos
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            From emergency midnight pediatric advice to chronic blood pressure management, hear why local families count on HealthyCare Chemist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span>{t.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.neighborhood}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
