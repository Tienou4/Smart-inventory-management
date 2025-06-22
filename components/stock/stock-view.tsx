"use client";

import { useState } from 'react';
import { StockHeader } from './stock-header';
import { StockMovements } from './stock-movements';
import { StockAdjustmentDialog } from './stock-adjustment-dialog';

export function StockView() {
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <StockHeader onNewMovement={() => setIsAdjustmentDialogOpen(true)} />
      <StockMovements />
      <StockAdjustmentDialog
        isOpen={isAdjustmentDialogOpen}
        onClose={() => setIsAdjustmentDialogOpen(false)}
      />
    </div>
  );
}