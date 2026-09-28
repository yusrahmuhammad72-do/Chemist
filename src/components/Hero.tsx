import React from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { ShieldCheck, Clock, FileUp, MessageSquare, Search, Award } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenPrescriptionModal: () => void;
  onNavigateToProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenPrescriptionModal,
  onNavigateToProducts,
}) => {
  const openWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I would like to enquire about medication availability and delivery in Lagos.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToProducts();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 border-b border-slate-200/80 pt-8 pb-16 lg:py-20">
      {/* Subtle medical cross watermark pattern (pure SVG, low opacity) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Welcoming Headline & Introduction */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata separator instead of pill tag */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <span>PCN Licensed #{PHARMACY_CONTACT.pcnRegNumber}</span>
              <span aria-hidden="true">·</span>
              <span>Lekki Phase 1, Lagos</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700">NAFDAC Certified</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1] text-balance">
              Your Trusted <br className="hidden sm:inline" />
              <span className="text-emerald-700">Community Chemist</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty">
              At HealthyCare Chemist, we provide genuine, temperature-controlled medications, daily vitamins, baby essentials, and compassionate consultations from certified Nigerian pharmacists you know and trust.
            </p>

            {/* Quick Hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search medicines, vitamins, baby care, or brands..."
                  className="w-full pl-12 pr-28 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-xs transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                >
                  Find
                </button>
              </div>
              <p className="text-[12px] text-slate-500 mt-2">
                Popular: Panadol Extra · Coartem · CeraVe · Redoxon · First Aid Kit · Sudocrem
              </p>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPrescriptionModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <FileUp className="w-4 h-4" />
                <span>Upload Prescription</span>
              </button>

              <button
                onClick={openWhatsAppEnquiry}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* 3 Proof Pillars */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-3 sm:gap-6 text-slate-700">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Authentic</span>
                </div>
                <p className="text-[12px] text-slate-500 leading-snug">Strict cold-chain storage & zero counterfeits.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed Chemist</span>
                </div>
                <p className="text-[12px] text-slate-500 leading-snug">Superintendent Pharmacist on site daily.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fast Metro Dispatch</span>
                </div>
                <p className="text-[12px] text-slate-500 leading-snug">Same-day delivery across Lagos & emergency line.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white">
              <img
                src="/src/assets/images/hero_chemist_pharmacy_1790593736078.jpg"
                alt="Friendly superintendent pharmacist at HealthyCare Chemist consultation desk"
                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient overlay at bottom for high legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                  On-Duty Pharmacist Care
                </span>
                <p className="text-sm sm:text-base font-medium text-white/95 leading-snug">
                  “We take the time to review your prescriptions, explain side effects, and verify safety for you and your loved ones.”
                </p>
                <span className="text-xs text-white/80 mt-2">
                  — Pharm. (Mrs.) Chioma Adeyemi, Superintendent Pharmacist
                </span>
              </div>
            </div>

            {/* Floating verification badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-md items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                PCN
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Verified Community Chemist</p>
                <p className="text-slate-500">Reg No: {PHARMACY_CONTACT.pcnRegNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
