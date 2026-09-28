/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { PrescriptionBanner } from './components/PrescriptionBanner';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { PrescriptionDeskSection } from './components/PrescriptionDeskSection';
import { HealthServices } from './components/HealthServices';
import { AboutUs } from './components/AboutUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { CartOrderDrawer } from './components/CartOrderDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionTargetProduct, setPrescriptionTargetProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    // If it requires a prescription, prompt the prescription consultation modal
    if (product.requiresPrescription) {
      handleOpenPrescriptionModal(product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenPrescriptionModal = (product?: Product) => {
    setPrescriptionTargetProduct(product || null);
    setIsPrescriptionModalOpen(true);
  };

  const handleNavigateToProducts = () => {
    const productsElement = document.getElementById('products');
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartProductIds = cartItems.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Fixed/Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescriptionModal={() => handleOpenPrescriptionModal()}
      />

      {/* Regulatory Prescription Compliance Banner */}
      <PrescriptionBanner
        onOpenPrescriptionModal={() => handleOpenPrescriptionModal()}
      />

      <main className="flex-1">
        {/* Hero Section with Search and Pharmacy Introduction */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenPrescriptionModal={() => handleOpenPrescriptionModal()}
          onNavigateToProducts={handleNavigateToProducts}
        />

        {/* Medicines, Vitamins, Skincare, Baby & First Aid Catalog */}
        <ProductCatalog
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
          onOpenPrescriptionModal={handleOpenPrescriptionModal}
          cartProductIds={cartProductIds}
        />

        {/* Dedicated Prescription Verification & WhatsApp Desk Anchor Section */}
        <PrescriptionDeskSection
          onOpenPrescriptionModal={() => handleOpenPrescriptionModal()}
        />

        {/* Community Clinic Services & Free Vitals Checks */}
        <HealthServices
          onOpenConsultationModal={() => handleOpenPrescriptionModal()}
        />

        {/* About HealthyCare Chemist, PCN Standards & Superintendent Pharmacist */}
        <AboutUs />

        {/* Testimonials from Lagos Families */}
        <TestimonialsSection />

        {/* FAQs covering Prescription Policy, Authenticity & Delivery */}
        <FAQSection />

        {/* Contact Us Section with Phone, WhatsApp, Opening Hours & Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenPrescriptionModal={handleOpenPrescriptionModal}
        isInCart={selectedProduct ? cartProductIds.includes(selectedProduct.id) : false}
      />

      {/* Prescription Upload & Consultation Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => {
          setIsPrescriptionModalOpen(false);
          setPrescriptionTargetProduct(null);
        }}
        initialProduct={prescriptionTargetProduct}
      />

      {/* Slide-over Order Bag Drawer */}
      <CartOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
