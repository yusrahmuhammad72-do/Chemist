import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, PHARMACY_CONTACT } from '../data/pharmacyData';
import { Search, Filter, AlertTriangle, ShieldCheck, Eye, Plus, Check, MessageSquare } from 'lucide-react';

interface ProductCatalogProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenPrescriptionModal: (product?: Product) => void;
  cartProductIds: string[];
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'medicines', label: 'Medicines & Pain Relief' },
  { id: 'vitamins', label: 'Vitamins & Supplements' },
  { id: 'skincare', label: 'Skincare & Dermatology' },
  { id: 'baby', label: 'Baby & Mother Care' },
  { id: 'firstaid', label: 'First Aid & Emergency' },
  { id: 'diagnostics', label: 'Health Devices & Monitors' },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onAddToCart,
  onOpenPrescriptionModal,
  cartProductIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [rxFilter, setRxFilter] = useState<'all' | 'otc' | 'rx'>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

      // Search match
      const searchLower = searchQuery.toLowerCase().trim();
      const searchMatch =
        !searchLower ||
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.indications.toLowerCase().includes(searchLower) ||
        product.activeIngredients.toLowerCase().includes(searchLower);

      // Rx filter
      const rxMatch =
        rxFilter === 'all' ||
        (rxFilter === 'otc' && !product.requiresPrescription) ||
        (rxFilter === 'rx' && product.requiresPrescription);

      return categoryMatch && searchMatch && rxMatch;
    });
  }, [selectedCategory, searchQuery, rxFilter]);

  const handleWhatsAppSingleOrder = (product: Product) => {
    if (product.requiresPrescription) {
      onOpenPrescriptionModal(product);
      return;
    }
    const text = encodeURIComponent(
      `Hello HealthyCare Chemist, I would like to order: ${product.name} (₦${product.price.toLocaleString()}). Please confirm stock and delivery to my address.`
    );
    window.open(`https://wa.me/${PHARMACY_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="products" className="py-14 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <span>Authentic Pharmacy Inventory</span>
              <span aria-hidden="true">·</span>
              <span>100% Genuine NAFDAC Verified</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Medicines & Health Products
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Carefully curated, temperature-managed medications, daily wellness vitamins, and pediatric supplies for your family.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-semibold tabular-nums">{filteredProducts.length}</span> of {PRODUCTS.length} products
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-4 mb-8">
          {/* Top row: Live Search & Prescription Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products by brand, medicine name, active chemical or symptom..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Segmented Rx Filter (Buttons with clear states) */}
            <div className="sm:col-span-4 flex items-center p-1 bg-slate-200/70 rounded-lg text-xs font-medium text-slate-600">
              <button
                type="button"
                onClick={() => setRxFilter('all')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  rxFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                All Items
              </button>
              <button
                type="button"
                onClick={() => setRxFilter('otc')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  rxFilter === 'otc'
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                OTC (No Rx)
              </button>
              <button
                type="button"
                onClick={() => setRxFilter('rx')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  rxFilter === 'rx'
                    ? 'bg-white text-amber-800 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                Prescription (Rx)
              </button>
            </div>
          </div>

          {/* Category Filter Buttons (Functional Segmented Tab Row) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty Search Result State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              We may still have this item in our physical dispensary or cold-room storage. Contact our on-duty pharmacist directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setRxFilter('all');
                  onSearchChange('');
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => onOpenPrescriptionModal()}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                Ask Pharmacist on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inCart = cartProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Product Image Slot with Fallback */}
                <div 
                  className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Safety Indicator: Prescription required vs OTC */}
                  <div className="absolute top-2.5 left-2.5">
                    {product.requiresPrescription ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-amber-500 text-white rounded-md shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Prescription Required</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-emerald-100 text-emerald-800 rounded-md">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Over-The-Counter</span>
                      </span>
                    )}
                  </div>

                  {/* Quick view hover button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute bottom-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Unboxed metadata line with subtle separators */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-medium text-slate-600">{product.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.packSize}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action Area */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-bold text-slate-900 tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {product.inStock ? 'In Stock' : 'Call to Order'}
                      </span>
                    </div>

                    {/* Prescription Notice / Interactive Action Button */}
                    {product.requiresPrescription ? (
                      <div className="space-y-1.5">
                        <button
                          onClick={() => onOpenPrescriptionModal(product)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Consult Pharmacist (Rx)</span>
                        </button>
                        <p className="text-[10px] text-slate-400 text-center leading-tight">
                          Dispensed only upon valid doctor's prescription verification
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            inCart
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-emerald-700 text-white hover:bg-emerald-800'
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleWhatsAppSingleOrder(product)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Instant order inquiry via WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
