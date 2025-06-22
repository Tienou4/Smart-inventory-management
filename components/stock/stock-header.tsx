"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Plus,
  Download,
  Filter,
} from 'lucide-react';

interface StockHeaderProps {
  onNewMovement: () => void;
}

const stats = [
  {
    label: 'Entrées (7j)',
    value: '2,456',
    change: '+12%',
    icon: TrendingUp,
    color: 'text-green-500',
  },
  {
    label: 'Sorties (7j)',
    value: '1,789',
    change: '+8%',
    icon: TrendingDown,
    color: 'text-blue-500',
  },
  {
    label: 'Ajustements',
    value: '23',
    change: '-5%',
    icon: Package,
    color: 'text-purple-500',
  },
  {
    label: 'Alertes',
    value: '12',
    change: 'urgent',
    icon: AlertTriangle,
    color: 'text-red-500',
  },
];

export function StockHeader({ onNewMovement }: StockHeaderProps) {
  return (
    <div className="space-y-6">
      <Card className="glass-morphism border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold">Mouvements de Stock</h1>
              <p className="text-muted-foreground">
                Suivez les entrées, sorties et ajustements de stock
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button onClick={onNewMovement} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Mouvement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass-morphism border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/30`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <Badge
                    variant={stat.change === 'urgent' ? 'destructive' : 'secondary'}
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
    </div>
  );
}