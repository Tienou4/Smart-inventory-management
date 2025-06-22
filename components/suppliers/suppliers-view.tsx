"use client";

import { useState } from 'react';
import { SuppliersHeader } from './suppliers-header';
import { SuppliersList } from './suppliers-list';
import { SupplierDialog } from './supplier-dialog';

export function SuppliersView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  return (
    <div className="space-y-6">
      <SuppliersHeader onAddSupplier={() => setIsDialogOpen(true)} />
      <SuppliersList 
        onEditSupplier={(supplier) => {
          setSelectedSupplier(supplier);
          setIsDialogOpen(true);
        }}
      />
      <SupplierDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedSupplier(null);
        }}
        supplier={selectedSupplier}
      />
    </div>
  );
}