import React, { useState } from 'react';
import { Product } from '../types';
import { PHARMACY_CONTACT } from '../data/pharmacyData';
import { X, UploadCloud, ShieldAlert, FileText, CheckCircle2, MessageSquare, Phone, Image as ImageIcon } from 'lucide-react';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [medicationNotes, setMedicationNotes] = useState(
    initialProduct ? `${initialProduct.name} (${initialProduct.dosageForm})` : ''
  );
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const message = [
      `*PRESCRIPTION VERIFICATION REQUEST*`,
      `*HealthyCare Chemist Dispensary*`,
      `---------------------------------`,
      `*Patient Name:* ${patientName || 'Anonymous Community Patient'}`,
      `*Contact Phone:* ${phone || 'Not specified'}`,
      `*Medication Requested:* ${medicationNotes || 'See attached prescription photo'}`,
      doctorName ? `*Doctor:* ${doctorName}` : '',
      hospitalName ? `*Hospital/Clinic:* ${hospitalName}` : '',
      deliveryAddress ? `*Delivery Location:* ${deliveryAddress}` : '*Preference:* In-pharmacy pickup',
      selectedFile ? `*Prescription Image:* [Attached: ${selectedFile.name}]` : '*Note:* I will send the prescription photo in this chat now.',
      `---------------------------------`,
      `Please verify availability, confirm dosage, and share price details with me. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-emerald-800 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-emerald-900/40 hover:bg-emerald-900 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg">
              <FileText className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display leading-tight">
                Prescription & Pharmacist Verification Desk
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Fast review by Pharm. Chioma Adeyemi & licensed team
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Safety Notice */}
        <div className="bg-amber-50 px-5 sm:px-6 py-3 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Patient Safety Law:</strong> Nigerian law and PCN regulations mandate that prescription-only medicines (POM) can only be dispensed after pharmacist clinical review of a valid doctor's prescription.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-display">
              Request Forwarded to WhatsApp!
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your prescription details have been formatted for our on-duty pharmacist. If WhatsApp did not open automatically, click the button below to start the chat directly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <a
                href={`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open Pharmacist Chat</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Patient Full Name <span className="text-emerald-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Funke Adeyemi"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  WhatsApp / Phone Number <span className="text-emerald-700">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Prescribing Doctor & Hospital */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Doctor's Name (Optional)
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Bello"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Hospital / Clinic Name
                </label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="e.g. Reddington / Lagoon Hospital"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Medicine description */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Prescribed Medicines or Notes <span className="text-emerald-700">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={medicationNotes}
                onChange={(e) => setMedicationNotes(e.target.value)}
                placeholder="List the medicines written on your prescription or describe your refill need..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Upload Photo of Prescription Slip (Recommended)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-emerald-500 hover:bg-emerald-50/30 transition-colors">
                <input
                  type="file"
                  id="prescription-file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="prescription-file" className="cursor-pointer block">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Prescription preview"
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-emerald-600" />
                      )}
                      <div className="text-left text-xs">
                        <p className="font-semibold text-slate-900 truncate max-w-xs">{selectedFile.name}</p>
                        <p className="text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB · Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-700 font-medium">
                        Click to select photo from phone or computer
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports JPEG, PNG, or PDF of your doctor's written sheet
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Delivery Location / Street in Lagos (Optional for Home Delivery)
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="e.g. 15 Admiralty Way, Lekki Phase 1 or Pickup in store"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit to Pharmacist on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>Call directly: {PHARMACY_CONTACT.phone}</span>
                </span>
                <span>·</span>
                <span>Response in ~10 mins</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
