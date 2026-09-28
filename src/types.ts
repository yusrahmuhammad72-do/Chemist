export type ProductCategory = 
  | 'all'
  | 'medicines'
  | 'vitamins'
  | 'skincare'
  | 'baby'
  | 'firstaid'
  | 'diagnostics';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // In Naira (₦)
  packSize: string;
  dosageForm: string; // e.g., '500mg Tablets', 'Syrup 100ml', 'Effervescent Tablets'
  description: string;
  indications: string;
  requiresPrescription: boolean; // Rx vs OTC
  inStock: boolean;
  nafdacRegNo: string;
  activeIngredients: string;
  usageInstructions: string;
  storageInfo: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PharmacyService {
  id: string;
  title: string;
  description: string;
  schedule: string;
  fee: string;
  iconName: 'heart-pulse' | 'activity' | 'thermometer' | 'shield-check' | 'baby' | 'stethoscope';
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'prescription' | 'orders' | 'authenticity' | 'services';
}
