"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  ShoppingCart,
  Truck,
  BarChart3,
} from 'lucide-react';

const stats = [
  {
    title: 'Produits en Stock',
    value: '1,247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Package,
    description: 'vs mois dernier',
  },
  {
    title: 'Valeur du Stock',
    value: '€847K',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'vs mois dernier',
  },
  {
    title: 'Alertes Stock',
    value: '23',
    change: '-5',
    changeType: 'negative' as const,
    icon: AlertTriangle,
    description: 'à traiter',
  },
  {
    title: 'Commandes',
    value: '156',
    change: '+23%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
    description: 'ce mois',
  },
  {
    title: 'Fournisseurs',
    value: '45',
    change: '+3',
    changeType: 'positive' as const,
    icon: Users,
    description: 'actifs',
  },
  {
    title: 'Expéditions',
    value: '89',
    change: '+15%',
    changeType: 'positive' as const,
    icon: Truck,
    description: 'cette semaine',
  },
  {
    title: 'Rotation Stock',
    value: '4.2x',
    change: '+0.3',
    changeType: 'positive' as const,
    icon: BarChart3,
    description: 'par année',
  },
  {
    title: 'Taux de Service',
    value: '98.5%',
    change: '+1.2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: 'satisfaction',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="glass-morphism card-hover border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <Badge
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}