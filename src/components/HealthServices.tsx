import React from 'react';
import { SERVICES, PHARMACY_CONTACT } from '../data/pharmacyData';
import { Activity, HeartPulse, Thermometer, ShieldCheck, Baby, Stethoscope, Clock, CheckCircle2 } from 'lucide-react';

interface HealthServicesProps {
  onOpenConsultationModal: () => void;
}

export const HealthServices: React.FC<HealthServicesProps> = ({
  onOpenConsultationModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart-pulse':
        return <HeartPulse className="w-5 h-5 text-emerald-700" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-emerald-700" />;
      case 'thermometer':
        return <Thermometer className="w-5 h-5 text-emerald-700" />;
      case 'shield-check':
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'baby':
        return <Baby className="w-5 h-5 text-emerald-700" />;
      case 'stethoscope':
      default:
        return <Stethoscope className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleWhatsAppBooking = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I would like to enquire about or book your service: "${serviceTitle}".`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Community Wellness & Primary Care</span>
            <span aria-hidden="true">·</span>
            <span>Preventative Health Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            In-Store Health Checks & Clinical Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Good health starts with early screening and accessible community counsel. Drop into our dispensary anytime for routine vitals, malaria diagnostic checks, and personalized medication therapy reviews.
          </p>
        </div>

        {/* Feature Spotlight Row: Image + Key Care Manifesto */}
        <div className="mb-14 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[300px]">
            <img
              src="/src/assets/images/pharmacist_consultation_1790593750889.jpg"
              alt="Superintendent Pharmacist conducting a blood pressure review at HealthyCare Chemist"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                Our Pharmacist Care Promise
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                “A chemist is more than a medicine shop—we are the first line of defence in the community.”
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Whether you need your monthly blood pressure recorded, advice on managing gestational diabetes, or clarification on antibiotic regimens, our Superintendent Pharmacist and certified clinical team are here to listen and guide you without appointment barriers.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero wait times for emergency vitals check</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private, confidential consultation room</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cold-chain insulin & biological dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct referral link with top Lagos hospitals</span>
              </div>
            </div>

            <div>
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <span>Request Pharmacist Consult on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/80 flex items-center justify-center">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="text-xs font-bold text-emerald-800 tabular-nums">
                    {srv.fee}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  {srv.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11.5px] text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{srv.schedule}</span>
                </div>

                <button
                  onClick={() => handleWhatsAppBooking(srv.title)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer underline underline-offset-2"
                >
                  Book / Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
