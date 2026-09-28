import React from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { ShieldCheck, Award, Zap, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pharmacist Profile Card & Real Chemist Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Established Community Care</span>
              <span aria-hidden="true">·</span>
              <span>PCN License #{PHARMACY_CONTACT.pcnRegNumber}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              About HealthyCare Chemist
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              HealthyCare Chemist was founded with a singular conviction: every family in our community deserves access to genuine, rigorously managed pharmaceuticals and qualified, empathetic guidance without fear of substandard or expired medications.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Led by <strong>Pharm. (Mrs.) Chioma Adeyemi</strong> (B.Pharm, MPSN), our dispensary operates under strict international Good Pharmacy Practice (GPP) protocols. We maintain 24/7 dedicated cold-chain storage with active inverter and diesel backup power systems, ensuring that insulins, pediatric suspensions, and biological therapies never suffer thermal degradation.
            </p>

            {/* Core Values Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Zero-Counterfeit Guarantee</h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  All inventory is procured exclusively through certified manufacturers and accredited NAFDAC importers with complete batch audit trails.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Continuous Cold-Chain</h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  Medical-grade refrigerators with continuous data logging ensure sensitive vaccines and insulins maintain 2°C–8°C potency.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Ethical Prescription Law</h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  We champion responsible antimicrobial stewardship, refusing indiscriminate OTC antibiotic sales to protect our public health.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Community First</h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  Free weekly blood pressure checks, monthly senior citizen wellness clinics, and accessible medication reviews for all residents.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pharmacist Profile Card & Facility Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl font-display shadow-xs shrink-0">
                  CA
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Pharm. (Mrs.) Chioma Adeyemi
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium">
                    Superintendent Pharmacist & Clinical Director
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    B.Pharm (Unilag), MPSN, PCN Certified Practitioner #14892
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-600 italic border-l-2 border-emerald-500 pl-4 py-1 leading-relaxed">
                “When you come into HealthyCare Chemist, you are not just a customer buying a packet of tablets. You are a neighbor whose wellbeing is in our hands. That is why we check interactions, explain side effects, and verify every single prescription.”
              </blockquote>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed under the Pharmacists Council of Nigeria (PCN) Act</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Member of the Association of Community Pharmacists of Nigeria (ACPN)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Registered Premises Certificate displayed prominently at our Lekki dispensary</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Visit Our Lekki Phase 1 Dispensary
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
