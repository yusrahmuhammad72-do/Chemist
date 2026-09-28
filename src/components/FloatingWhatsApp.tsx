import React from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { MessageSquare, ShoppingBag } from 'lucide-react';

interface FloatingWhatsAppProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  cartCount,
  onOpenCart,
}) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I have an enquiry for the on-duty pharmacist.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* If cart has items, show floating cart pill button */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer text-xs font-semibold"
          aria-label="View Cart Bag"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Order List</span>
          <span className="w-5 h-5 bg-white text-emerald-800 rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums">
            {cartCount}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={openWhatsApp}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl transition-transform hover:scale-105 cursor-pointer text-xs font-bold"
        aria-label="Chat on WhatsApp"
        title="Chat with Pharmacist on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Pharmacist WhatsApp Desk</span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};
