import React, { useState } from 'react';
import { FAQS, PHARMACY_CONTACT } from '../data/pharmacyData';
import { ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const openWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I have a question about prescriptions, medicines, or delivery.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Everything you need to know about our prescription verification policy, NAFDAC authenticity, and WhatsApp delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-emerald-950 font-display">
              Have a specific medication question or urgent enquiry?
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Our on-duty superintendent pharmacist is directly reachable on WhatsApp.
            </p>
          </div>

          <button
            onClick={openWhatsAppHelp}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
