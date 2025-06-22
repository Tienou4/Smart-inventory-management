"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { MoreVertical, Edit, Trash2, Eye, Phone, Mail, MapPin, Star } from 'lucide-react';

const suppliers = [
  {
    id: '1',
    name: 'TechDistrib',
    contact: 'Marie Leclerc',
    email:  'marie@techdistrib.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Tech, 75001 Paris',
    category: 'Électronique',
    status: 'active',
    rating: 4.8,
    orders: 45,
    totalValue: 245000,
    lastOrder: '2024-12-10',
    paymentTerms: '30 jours',
    performance: 96,
  },
  {
    id: '2',
    name: 'AppleDistrib',
    contact: 'Jean Martin',
    email: 'jean@appledistrib.com',
    phone: '+33 1 34 56 78 90',
    address: '456 Avenue Apple, 69000 Lyon',
    category: 'Apple Premium',
    status: 'active',
    rating: 4.9,
    orders: 32,
    totalValue: 189000,
    lastOrder: '2024-12-12',
    paymentTerms: '15 jours',
    performance: 98,
  },
  {
    id: '3',
    name: 'SamsungDirect',
    contact: 'Sophie Dubois',
    email: 'sophie@samsungdirect.fr',
    phone: '+33 1 45 67 89 01',
    address: '789 Boulevard Samsung, 13000 Marseille',
    category: 'Samsung',
    status: 'active',
    rating: 4.6,
    orders: 28,
    totalValue: 156000,
    lastOrder: '2024-12-08',
    paymentTerms: '45 jours',
    performance: 92,
  },
  {
    id: '4',
    name: 'AudioTech',
    contact: 'Pierre Laurent',
    email: 'pierre@audiotech.fr',
    phone: '+33 1 56 78 90 12',
    address: '321 Rue Audio, 33000 Bordeaux',
    category: 'Audio & Accessoires',
    status: 'active',
    rating: 4.4,
    orders: 19,
    totalValue: 89000,
    lastOrder: '2024-12-05',
    paymentTerms: '30 jours',
    performance: 88,
  },
  {
    id: '5',
    name: 'MobileStore',
    contact: 'Anne Moreau',
    email: 'anne@mobilestore.fr',
    phone: '+33 1 67 89 01 23',
    address: '654 Place Mobile, 59000 Lille',
    category: 'Smartphones',
    status: 'inactive',
    rating: 4.1,
    orders: 12,
    totalValue: 45000,
    lastOrder: '2024-11-15',
    paymentTerms: '60 jours',
    performance: 82,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactif</Badge>;
    case 'pending':
      return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPerformanceColor = (performance: number) => {
  if (performance >= 95) return 'text-green-600';
  if (performance >= 85) return 'text-orange-600';
  return 'text-red-600';
};

interface SuppliersListProps {
  onEditSupplier: (supplier: any) => void;
}

export function SuppliersList({ onEditSupplier }: SuppliersListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <Card key={supplier.id} className="glass-morphism border-0 shadow-lg card-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {supplier.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{supplier.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusBadge(supplier.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditSupplier(supplier)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{supplier.contact}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{supplier.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-primary">{supplier.orders}</p>
                <p className="text-xs text-muted-foreground">Commandes</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  €{(supplier.totalValue / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground">Chiffre d&apos;affaires</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{supplier.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Dernière commande: {supplier.lastOrder}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className={`font-medium ${getPerformanceColor(supplier.performance)}`}>
                    {supplier.performance}%
                  </span>
                </div>
                <Progress value={supplier.performance} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conditions:</span>
                <span className="font-medium">{supplier.paymentTerms}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}