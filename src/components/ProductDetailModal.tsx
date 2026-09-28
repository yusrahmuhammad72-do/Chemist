import React from 'react';
import { Product } from '../types';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { X, ShieldCheck, AlertTriangle, MessageSquare, Plus, Check, FileText } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenPrescriptionModal: (product: Product) => void;
  isInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenPrescriptionModal,
  isInCart,
}) => {
  if (!product) return null;

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I am enquiring about: ${product.name} (₦${product.price.toLocaleString()}). Do you have stock available for pickup or delivery?`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-xs transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Image Column */}
          <div className="sm:col-span-5 bg-slate-100 p-6 flex flex-col justify-between relative border-b sm:border-b-0 sm:border-r border-slate-200">
            <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{product.nafdacRegNo}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Sourced directly from licensed pharmaceutical distributors under strict cold-chain management.
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="sm:col-span-7 p-6 sm:p-7 space-y-5">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-emerald-800 uppercase tracking-wider">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.brand}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-display">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{product.dosageForm} · {product.packSize}</p>
            </div>

            {/* Price line */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-slate-100">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-700 font-semibold">
                {product.inStock ? 'Available in Pharmacy' : 'Available by Pre-order'}
              </span>
            </div>

            {/* Safety Prescription Notice if Rx */}
            {product.requiresPrescription ? (
              <div className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Prescription-Only Medicine (POM / Rx)</span>
                </div>
                <p className="text-amber-800 leading-relaxed text-[11.5px]">
                  Under Pharmacy Council of Nigeria (PCN) law, this drug cannot be dispensed automatically. You must present or upload a doctor’s valid prescription and consult our on-duty pharmacist.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-xl text-xs flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Over-The-Counter (OTC) medicine. Safe for self-care per dosage instructions.</span>
              </div>
            )}

            {/* Clinical Specifications */}
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <h4 className="font-semibold text-slate-900 mb-0.5">Indications & Uses</h4>
                <p className="text-slate-600 leading-relaxed">{product.indications}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-0.5">Active Ingredients</h4>
                <p className="text-slate-600">{product.activeIngredients}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-0.5">Directions for Use</h4>
                <p className="text-slate-600">{product.usageInstructions}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-0.5">Storage Conditions</h4>
                <p className="text-slate-600">{product.storageInfo}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {product.requiresPrescription ? (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPrescriptionModal(product);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Submit Prescription for Pharmacist Review</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      isInCart
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>In Your Order List</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              )}

              <button
                onClick={handleWhatsAppEnquiry}
                className="text-[12px] text-slate-500 hover:text-emerald-700 text-center transition-colors underline cursor-pointer"
              >
                Have a question about this medicine? Speak to on-duty pharmacist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
