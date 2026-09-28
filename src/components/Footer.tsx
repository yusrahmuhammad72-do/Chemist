import React from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { Shield, Phone, MessageSquare, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const openWhatsApp = () => {
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}`, '_blank');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                Rx
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                HealthyCare <span className="text-emerald-400">Chemist</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your registered community chemist in Lekki Phase 1, Lagos. Dedicated to authentic medications, strict cold-chain management, and compassionate clinical counsel for neighbourhood families.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-[11.5px] font-medium pt-1">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Registered under PCN Act · Premises License #{PHARMACY_CONTACT.pcnRegNumber}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Medicines & Catalog
                </a>
              </li>
              <li>
                <a href="#prescription-desk" className="hover:text-emerald-400 transition-colors">
                  Prescription Refill Desk
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Free Blood Pressure Checks
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Our Pharmacists
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Pain Relief & Cold Care
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Daily Vitamins & Zinc
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Dermatology & Skincare
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Baby Care & Infant Drops
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Emergency First Aid Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dispensary Contact</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{PHARMACY_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${PHARMACY_CONTACT.phone}`} className="hover:text-white transition-colors">
                  {PHARMACY_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${PHARMACY_CONTACT.email}`} className="hover:text-white transition-colors break-all">
                  {PHARMACY_CONTACT.email}
                </a>
              </div>
              <div>
                <button
                  onClick={openWhatsApp}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-md transition-colors font-medium text-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Medical Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong className="text-slate-400">Medical Safety & Regulatory Disclaimer:</strong> All prescription-only medicines (POM / Rx) are dispensed strictly in accordance with Nigerian law and Pharmacy Council of Nigeria (PCN) guidelines upon presentation of a valid doctor's prescription and consultation with our licensed superintendent pharmacist. The product information provided on this platform is for informational and educational purposes only and is not intended to substitute for professional medical diagnosis or personalized clinical treatment. Always read product labels carefully and consult your doctor or pharmacist if symptoms persist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-500">
            <p>© {new Date().getFullYear()} HealthyCare Chemist. All rights reserved.</p>
            <p>Superintendent Pharmacist: {PHARMACY_CONTACT.superintendentPharmacist}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
