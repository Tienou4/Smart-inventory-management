"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  X,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
} from 'lucide-react';
import type { ViewType } from '@/app/(main)/dashboard/page';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    id: 'dashboard' as ViewType,
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    id: 'products' as ViewType,
    label: 'Produits',
    icon: Package,
    badge: '1,247',
  },
  {
    id: 'stock' as ViewType,
    label: 'Stock',
    icon: Warehouse,
    badge: null,
  },
  {
    id: 'suppliers' as ViewType,
    label: 'Fournisseurs',
    icon: Users,
    badge: '23',
  },
  {
    id: 'reports' as ViewType,
    label: 'Rapports',
    icon: BarChart3,
    badge: null,
  },
];

const quickStats = [
  {
    label: 'Alertes Stock',
    value: '12',
    icon: AlertTriangle,
    color: 'text-orange-500',
  },
  {
    label: 'Commandes',
    value: '8',
    icon: ShoppingCart,
    color: 'text-green-500',
  },
  {
    label: 'Tendance',
    value: '+15%',
    icon: TrendingUp,
    color: 'text-blue-500',
  },
];

export function Sidebar({ currentView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 transform border-r bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TIENOVA <span className='text-xs'>Stock</span></h1>
                <p className="text-xs text-muted-foreground">Gestion Intelligente</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="md:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4 py-6">
            {/* Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-11 px-4 text-left font-medium",
                      isActive && "bg-primary text-primary-foreground shadow-sm",
                      !isActive && "hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                    onClick={() => {
                      onViewChange(item.id);
                      if (window.innerWidth < 768) onToggle();
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>

            <Separator className="my-6" />

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground px-2">
                Aperçu Rapide
              </h3>
              <div className="space-y-3">
                {quickStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Icon className={cn("w-4 h-4", stat.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{stat.label}</p>
                        <p className="text-sm text-muted-foreground">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Settings */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 px-4 text-left font-medium hover:bg-accent/50"
              onClick={() => {
                onViewChange('settings');
                if (window.innerWidth < 768) onToggle();
              }}
            >
              <Settings className="w-5 h-5" />
              <span>Paramètres</span>
            </Button>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Mode Demo</p>
                <p className="text-xs text-muted-foreground">Toutes les fonctionnalités</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}