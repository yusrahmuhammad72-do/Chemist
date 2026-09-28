import React from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { FileUp, ShieldCheck, Clock, MessageSquare, AlertCircle, PhoneCall } from 'lucide-react';

interface PrescriptionDeskSectionProps {
  onOpenPrescriptionModal: () => void;
}

export const PrescriptionDeskSection: React.FC<PrescriptionDeskSectionProps> = ({
  onOpenPrescriptionModal,
}) => {
  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Pharmacist, I have a doctor's prescription slip I would like to verify and order.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="prescription-desk" className="py-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>PCN Certified Prescription Verification Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Need a Prescription Medicine Dispensed?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed text-pretty">
            Under Nigerian pharmaceutical safety regulations, prescription drugs (Rx) cannot be dispensed without clinical verification. Simply snap a clear photo of your doctor’s prescription slip and submit it below or on WhatsApp.
          </p>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2 pb-2">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400">Step 1</span>
              <h4 className="text-sm font-semibold text-white">Snap or Upload</h4>
              <p className="text-xs text-emerald-100/80 leading-normal">
                Take a clear picture of your doctor's written prescription slip.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400">Step 2</span>
              <h4 className="text-sm font-semibold text-white">Pharmacist Review</h4>
              <p className="text-xs text-emerald-100/80 leading-normal">
                Our Superintendent Pharmacist checks dosage, validity, and potential interactions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400">Step 3</span>
              <h4 className="text-sm font-semibold text-white">Discreet Delivery</h4>
              <p className="text-xs text-emerald-100/80 leading-normal">
                Confirm your price and receive temperature-controlled delivery or store pickup.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onOpenPrescriptionModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <FileUp className="w-4 h-4" />
              <span>Open Prescription Upload Form</span>
            </button>

            <button
              onClick={openWhatsAppDirect}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Prescription via WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-emerald-200/80 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Average review time: 10–15 mins</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Emergency line: {PHARMACY_CONTACT.phone}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
