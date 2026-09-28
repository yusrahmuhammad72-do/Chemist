import React from 'react';
import { AlertCircle, FileCheck, ArrowRight } from 'lucide-react';

interface PrescriptionBannerProps {
  onOpenPrescriptionModal: () => void;
}

export const PrescriptionBanner: React.FC<PrescriptionBannerProps> = ({
  onOpenPrescriptionModal,
}) => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-b border-emerald-100 py-2.5 px-4 text-xs text-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="p-1 rounded-full bg-emerald-600/10 text-emerald-700 shrink-0">
            <AlertCircle className="w-4 h-4 text-emerald-700" />
          </span>
          <p className="font-medium text-slate-800">
            <span className="font-semibold text-emerald-900">PCN Patient Safety Rule:</span> Prescription medicines (POM / Rx) cannot be purchased automatically. They require a valid doctor’s prescription and pharmacist verification prior to dispensing.
          </p>
        </div>

        <button
          onClick={onOpenPrescriptionModal}
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 shrink-0 transition-colors cursor-pointer py-0.5"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Submit Your Prescription Here</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
