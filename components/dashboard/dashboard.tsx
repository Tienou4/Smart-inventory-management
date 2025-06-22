"use client";

import { useState } from 'react';
import { StatsCards } from './stats-cards';
import { StockChart } from './stock-chart';
import { RecentActivity } from './recent-activity';
import { TopProducts } from './top-products';
import { StockAlerts } from './stock-alerts';
import { QuickActions } from './quick-actions';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <StockChart />
        </div>
        
        {/* Right Column - Alerts & Activity */}
        <div className="space-y-6">
          <StockAlerts />
          <RecentActivity />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopProducts />
      </div>
    </div>
  );
}