"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Building,
  TrendingUp,
  ShoppingCart,
  Plus,
  Download,
  Upload,
} from 'lucide-react';

interface SuppliersHeaderProps {
  onAddSupplier: () => void;
}

const stats = [
  {
    label: 'Fournisseurs Actifs',
    value: '23',
    change: '+3',
    icon: Users,
    color: 'text-blue-500',
  },
  {
    label: 'Partenaires Premium',
    value: '8',
    change: '+1',
    icon: Building,
    color: 'text-purple-500',
  },
  {
    label: 'Commandes ce mois',
    value: '156',
    change: '+24%',
    icon: ShoppingCart,
    color: 'text-green-500',
  },
  {
    label: 'Performance moyenne',
    value: '94.2%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-orange-500',
  },
];

export function SuppliersHeader({ onAddSupplier }: SuppliersHeaderProps) {
  return (
    <div className="space-y-6">
      <Card className="glass-morphism border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Fournisseurs</h1>
              <p className="text-muted-foreground">
                Gérez vos partenaires et leurs relations commerciales
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button onClick={onAddSupplier} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Fournisseur
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
                  <Badge variant="secondary" className="text-xs">
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