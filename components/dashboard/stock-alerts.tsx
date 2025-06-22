"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Package, TrendingDown, Clock } from 'lucide-react';

const alerts = [
  {
    id: '1',
    product: 'iPhone 15 Pro 128GB',
    currentStock: 5,
    minStock: 20,
    category: 'Smartphones',
    priority: 'high' as const,
    supplier: 'TechDistrib',
    lastOrder: '2024-11-15',
  },
  {
    id: '2',
    product: 'Samsung Galaxy S24 256GB',
    currentStock: 8,
    minStock: 15,
    category: 'Smartphones',
    priority: 'medium' as const,
    supplier: 'MobileStore',
    lastOrder: '2024-11-20',
  },
  {
    id: '3',
    product: 'MacBook Air M3',
    currentStock: 2,
    minStock: 10,
    category: 'Ordinateurs',
    priority: 'high' as const,
    supplier: 'AppleDistrib',
    lastOrder: '2024-10-30',
  },
  {
    id: '4',
    product: 'AirPods Pro 2',
    currentStock: 12,
    minStock: 25,
    category: 'Audio',
    priority: 'medium' as const,
    supplier: 'AudioTech',
    lastOrder: '2024-11-18',
  },
  {
    id: '5',
    product: 'Dell XPS 13',
    currentStock: 3,
    minStock: 8,
    category: 'Ordinateurs',
    priority: 'high' as const,
    supplier: 'DellDirect',
    lastOrder: '2024-11-10',
  },
];

const priorityColors = {
  high: 'text-red-500 bg-red-100 dark:bg-red-900/20',
  medium: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20',
  low: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20',
};

export function StockAlerts() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Alertes Stock</span>
          </div>
          <Badge variant="destructive" className="text-xs">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{alert.product}</h4>
                    <p className="text-xs text-muted-foreground">{alert.category}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={priorityColors[alert.priority]}
                  >
                    {alert.priority === 'high' ? 'Urgent' : 'Moyen'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <Package className="w-3 h-3 text-muted-foreground" />
                    <span>Stock: {alert.currentStock}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-3 h-3 text-muted-foreground" />
                    <span>Min: {alert.minStock}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>{alert.lastOrder}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">via</span>
                    <span className="font-medium">{alert.supplier}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full mt-3 h-8"
                  variant={alert.priority === 'high' ? 'default' : 'outline'}
                >
                  Commander maintenant
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}