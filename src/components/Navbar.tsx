import React, { useState } from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { ShoppingBag, MessageSquare, Phone, Menu, X, Shield, FileText } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPrescriptionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPrescriptionModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I would like to make an enquiry with the pharmacist on duty.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Subtle top information strip */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>PCN Registered Community Pharmacy ({PHARMACY_CONTACT.pcnRegNumber})</span>
            </span>
            <span aria-hidden="true" className="text-emerald-700">|</span>
            <span>100% NAFDAC Approved Medications</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <a href={`tel:${PHARMACY_CONTACT.phone}`} className="hover:text-white transition-colors">
                {PHARMACY_CONTACT.phone}
              </a>
            </span>
            <span aria-hidden="true" className="text-emerald-700">|</span>
            <span>Mon–Sat: 8:00 AM – 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single element brand title wordmark */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-emerald-700 transition-colors">
            <span className="font-display">Rx</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display leading-tight">
              HealthyCare <span className="text-emerald-600">Chemist</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              Community Pharmacy · Lekki Phase 1
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Clean text with subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#products" className="hover:text-emerald-700 transition-colors py-1">
            Medicines & Catalog
          </a>
          <a href="#prescription-desk" className="hover:text-emerald-700 transition-colors py-1">
            Prescription Desk
          </a>
          <a href="#services" className="hover:text-emerald-700 transition-colors py-1">
            Clinic & Vitals Check
          </a>
          <a href="#about" className="hover:text-emerald-700 transition-colors py-1">
            About Us
          </a>
          <a href="#faqs" className="hover:text-emerald-700 transition-colors py-1">
            FAQs
          </a>
          <a href="#contact" className="hover:text-emerald-700 transition-colors py-1">
            Contact & Location
          </a>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Upload Rx button */}
          <button
            onClick={onOpenPrescriptionModal}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
            title="Submit prescription for pharmacist review"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>Upload Rx</span>
          </button>

          {/* WhatsApp Direct button */}
          <button
            onClick={openWhatsAppDirect}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg shadow-xs transition-colors whitespace-nowrap"
            title="Chat directly with our pharmacist on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>

          {/* Cart Bag trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              Medicines & Products
            </a>
            <a
              href="#prescription-desk"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              Prescription Refill Desk
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              Clinic Services & Free BP Checks
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              About Our Pharmacists
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              Contact & Emergency Desk
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrescriptionModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              Upload Prescription for Verification
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppDirect();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#25D366] rounded-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Chat Directly on WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
