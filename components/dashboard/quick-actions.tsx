"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus,
  Package,
  Users,
  FileText,
  TrendingUp,
  ShoppingCart,
  Scan,
  Download,
} from 'lucide-react';

const actions = [
  {
    label: 'Nouveau Produit',
    icon: Plus,
    color: 'bg-blue-500 hover:bg-blue-600',
    description: 'Ajouter un produit',
  },
  {
    label: 'Entrée Stock',
    icon: Package,
    color: 'bg-green-500 hover:bg-green-600',
    description: 'Réceptionner',
  },
  {
    label: 'Scanner',
    icon: Scan,
    color: 'bg-purple-500 hover:bg-purple-600',
    description: 'Code-barres',
  },
  {
    label: 'Commande',
    icon: ShoppingCart,
    color: 'bg-orange-500 hover:bg-orange-600',
    description: 'Nouvelle commande',
  },
  {
    label: 'Fournisseur',
    icon: Users,
    color: 'bg-teal-500 hover:bg-teal-600',
    description: 'Ajouter',
  },
  {
    label: 'Rapport',
    icon: FileText,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    description: 'Générer',
  },
  {
    label: 'Prédiction',
    icon: TrendingUp,
    color: 'bg-pink-500 hover:bg-pink-600',
    description: 'IA Analytics',
  },
  {
    label: 'Export',
    icon: Download,
    color: 'bg-slate-500 hover:bg-slate-600',
    description: 'Données',
  },
];

export function QuickActions() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200"
              >
                <div className={`p-3 rounded-lg ${action.color} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}