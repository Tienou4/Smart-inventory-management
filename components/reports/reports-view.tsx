"use client";

import { ReportsHeader } from './reports-header';
import { ReportsCharts } from './reports-charts';
import { ReportsTable } from './reports-table';

export function ReportsView() {
  return (
    <div className="space-y-6">
      <ReportsHeader />
      <ReportsCharts />
      <ReportsTable />
    </div>
  );
}