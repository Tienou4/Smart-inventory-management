"use client";

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Dashboard } from '@/components/dashboard/dashboard';
import { ProductsView } from '@/components/products/products-view';
import { StockView } from '@/components/stock/stock-view';
import { SuppliersView } from '@/components/suppliers/suppliers-view';
import { ReportsView } from '@/components/reports/reports-view';
import { SettingsView } from '@/components/settings/settings-view';

export type ViewType = 'dashboard' | 'products' | 'stock' | 'suppliers' | 'reports' | 'settings';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsView />;
      case 'stock':
        return <StockView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex h-screen">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            currentView={currentView}
          />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {renderView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}