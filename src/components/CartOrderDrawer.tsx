import React, { useState } from 'react';
import { CartItem } from '../types';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

interface CartOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartOrderDrawer: React.FC<CartOrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 35000 || subtotal === 0 ? 0 : 1500;
  const grandTotal = subtotal + deliveryFee;

  const hasPrescriptionItem = items.some((item) => item.product.requiresPrescription);

  const handleCheckoutViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    const itemsText = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (x${item.quantity}) - ₦${(
            item.product.price * item.quantity
          ).toLocaleString()}${item.product.requiresPrescription ? ' [Rx Required]' : ''}`
      )
      .join('\n');

    const messageLines = [
      `*HEALTHYCARE CHEMIST - NEW ORDER REQUEST*`,
      `---------------------------------------`,
      `*Customer Name:* ${customerName || 'Community Patient'}`,
      `*Phone Number:* ${customerPhone || 'Not specified'}`,
      `*Delivery Location:* ${deliveryAddress || 'Store Pickup (Lekki Phase 1)'}`,
      orderNotes ? `*Notes:* ${orderNotes}` : '',
      `---------------------------------------`,
      `*ORDERED ITEMS:*`,
      itemsText,
      `---------------------------------------`,
      `*Subtotal:* ₦${subtotal.toLocaleString()}`,
      `*Estimated Delivery:* ${deliveryFee === 0 ? 'FREE (Orders over ₦35k)' : `₦${deliveryFee.toLocaleString()}`}`,
      `*Total Estimate:* ₦${grandTotal.toLocaleString()}`,
      `---------------------------------------`,
      hasPrescriptionItem
        ? `*⚠️ Notice:* This order contains prescription medication. I will provide a photo of my doctor's prescription for the pharmacist.`
        : `*All items are OTC self-care.*`,
      `---------------------------------------`,
      `Please confirm item availability and send payment / bank transfer details.`,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${encodeURIComponent(
      messageLines.join('\n')
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Your Order List
              </h3>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer mr-1"
                title="Clear all"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Your order list is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Add medicines, wellness vitamins, baby essentials, or first aid items from our catalog to order directly via WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Prescription warning banner if list contains Rx item */}
              {hasPrescriptionItem && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Prescription Items Included</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Our pharmacist will verify your doctor’s prescription during checkout on WhatsApp before packaging.
                  </p>
                </div>
              )}

              {/* Items List */}
              <div className="divide-y divide-slate-100 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-900 truncate max-w-[190px]">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">{item.product.packSize}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-md bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Delivery & Contact Information
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                  />

                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone / WhatsApp Number *"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                  />

                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Delivery Address (e.g. Admiralty Way, Lekki)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                  />

                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Special instructions or brand preferences..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery (Lagos)</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="tabular-nums text-emerald-800">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutViaWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Order to Pharmacist on WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct confirmation by licensed pharmacist</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
