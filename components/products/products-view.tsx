"use client";

import { useState } from 'react';
import { ProductsList } from './products-list';
import { ProductsHeader } from './products-header';
import { ProductDialog } from './product-dialog';

export function ProductsView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="space-y-6">
      <ProductsHeader onAddProduct={() => setIsDialogOpen(true)} />
      <ProductsList 
        onEditProduct={(product) => {
          setSelectedProduct(product);
          setIsDialogOpen(true);
        }}
      />
      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
}