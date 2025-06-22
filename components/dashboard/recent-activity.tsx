"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Activity,
  Package,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Truck,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'stock_in',
    description: 'Réception de 50 iPhone 15 Pro',
    time: 'Il y a 2 heures',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    id: '2',
    type: 'stock_out',
    description: 'Vente de 15 MacBook Air M3',
    time: 'Il y a 3 heures',
    icon: TrendingDown,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    id: '3',
    type: 'order',
    description: 'Nouvelle commande #1247',
    time: 'Il y a 4 heures',
    icon: ShoppingCart,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    id: '4',
    type: 'alert',
    description: 'Stock faible: AirPods Pro 2',
    time: 'Il y a 5 heures',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
  {
    id: '5',
    type: 'shipment',
    description: 'Expédition vers Lyon',
    time: 'Il y a 6 heures',
    icon: Truck,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    id: '6',
    type: 'supplier',
    description: 'Nouveau fournisseur ajouté',
    time: 'Il y a 1 jour',
    icon: UserPlus,
    color: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-900/20',
  },
  {
    id: '7',
    type: 'stock_in',
    description: 'Réception de 25 Samsung Galaxy S24',
    time: 'Il y a 1 jour',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    id: '8',
    type: 'stock_out',
    description: 'Vente de 8 iPad Pro',
    time: 'Il y a 2 jours',
    icon: TrendingDown,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
];

export function RecentActivity() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Activity className="w-5 h-5 text-primary" />
          <span>Activité Récente</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}