"use client";

import { useState } from 'react';
import { ProductsList } from './products-list';
import { ProductsHeader } from './products-header';
import { ProductDialog } from './product-dialog';

// Interface pour les produits (correspondant à celle de products-list.tsx)
interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string | null;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock?: number | null;
  supplier?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  images?: { id: string; url: string; isMain: boolean }[];
  createdAt: string;
}

export function ProductsView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // ✅ Typage correct
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    // Déclencher un refresh de la liste après ajout/modification
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <ProductsHeader 
        onAddProduct={() => setIsDialogOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        stockFilter={stockFilter}
        onStockChange={setStockFilter}
      />
      <ProductsList 
        onEditProduct={(product) => {
          setSelectedProduct(product);
          setIsDialogOpen(true);
        }}
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        stockFilter={stockFilter}
        refreshTrigger={refreshTrigger}
      />
      <ProductDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        product={selectedProduct}
      />
    </div>
  );
}