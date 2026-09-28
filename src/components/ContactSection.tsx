import React, { useState } from 'react';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { Phone, MessageSquare, MapPin, Clock, Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('medication');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = [
      `*GENERAL PHARMACY ENQUIRY*`,
      `*HealthyCare Chemist Dispensary*`,
      `---------------------------------`,
      `*Name:* ${formName}`,
      `*Phone:* ${formPhone}`,
      `*Category:* ${inquiryType}`,
      `*Message:* ${message}`,
      `---------------------------------`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank');
    setSentSuccess(true);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I would like to enquire with the pharmacist on duty.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Location Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <span>Reach Our Dispensary</span>
                <span aria-hidden="true">·</span>
                <span>Pharmacist On Duty</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">
                Contact & Find Us
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Whether you need to refill an ongoing medication, check our cold-storage stock, or walk in for a free blood pressure reading, we are always here to assist.
              </p>
            </div>

            {/* Information List */}
            <div className="space-y-5 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Phone & Call Enquiries</h4>
                  <p className="text-slate-600 mt-0.5">
                    Call Direct: <a href={`tel:${PHARMACY_CONTACT.phone}`} className="hover:text-emerald-700 font-medium text-slate-900">{PHARMACY_CONTACT.phone}</a>
                  </p>
                  <p className="text-slate-500 text-xs">
                    International: <a href={`tel:${PHARMACY_CONTACT.formattedPhone}`} className="hover:text-emerald-700">{PHARMACY_CONTACT.formattedPhone}</a>
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">WhatsApp Fast Order & Consult</h4>
                  <p className="text-slate-600 mt-0.5">
                    Instant messaging with the on-duty pharmacist for stock availability and prescription submission.
                  </p>
                  <button
                    onClick={openWhatsAppDirect}
                    className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Order / Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Physical Pharmacy Location</h4>
                  <p className="text-slate-600 mt-0.5">
                    {PHARMACY_CONTACT.address}
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">
                    {PHARMACY_CONTACT.landmark}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Opening & Dispensary Hours</h4>
                  <p className="text-slate-600 mt-0.5">{PHARMACY_CONTACT.openingHours.weekdays}</p>
                  <p className="text-slate-600">{PHARMACY_CONTACT.openingHours.sunday}</p>
                  <p className="text-[11.5px] font-semibold text-emerald-800 mt-1">
                    {PHARMACY_CONTACT.openingHours.emergency}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Enquiries</h4>
                  <p className="text-slate-600 mt-0.5">
                    <a href={`mailto:${PHARMACY_CONTACT.email}`} className="hover:text-emerald-700">
                      {PHARMACY_CONTACT.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Send a Message to Our Pharmacist
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We typically reply in under 15 minutes during operating hours.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
              </div>

              {sentSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Enquiry Formatted for WhatsApp!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your message has been transferred to our WhatsApp chat desk. If WhatsApp did not open, you can send it manually or submit another inquiry.
                  </p>
                  <button
                    onClick={() => {
                      setSentSuccess(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Your Full Name <span className="text-emerald-700">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Babatunde Williams"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Phone / WhatsApp Number <span className="text-emerald-700">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. 0802 345 6789"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    >
                      <option value="medication">Medication Availability & Price</option>
                      <option value="prescription">Prescription Refill / Verification</option>
                      <option value="vitals">Booking Free BP or Glucose Screening</option>
                      <option value="delivery">Home / Office Delivery in Lagos</option>
                      <option value="other">General Pharmacist Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Message or Question <span className="text-emerald-700">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify the medicine names, symptoms, or delivery area..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to On-Duty Pharmacist</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Submitting forwards your inquiry directly to our pharmacy WhatsApp desk for rapid review.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
