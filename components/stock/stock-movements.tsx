"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

const movements = [
  {
    id: 'MOV-001',
    date: '2024-12-14',
    time: '14:30',
    product: 'iPhone 15 Pro 128GB',
    sku: 'IPH15P-128-TIT',
    type: 'in',
    quantity: 50,
    reason: 'Réception commande',
    reference: 'CMD-2024-156',
    user: 'Marie Dubois',
    location: 'A1-B2',
  },
  {
    id: 'MOV-002',
    date: '2024-12-14',
    time: '13:15',
    product: 'MacBook Air M3',
    sku: 'MBA-M3-13-SLV',
    type: 'out',
    quantity: -8,
    reason: 'Vente magasin',
    reference: 'VTE-2024-892',
    user: 'Jean Martin',
    location: 'B2-C1',
  },
  {
    id: 'MOV-003',
    date: '2024-12-14',
    time: '11:45',
    product: 'AirPods Pro 2',
    sku: 'APP-2GEN-WHT',
    type: 'adjustment',
    quantity: -2,
    reason: 'Correction inventaire',
    reference: 'ADJ-2024-023',
    user: 'Sophie Laurent',
    location: 'C1-D3',
  },
  {
    id: 'MOV-004',
    date: '2024-12-13',
    time: '16:20',
    product: 'Samsung Galaxy S24',
    sku: 'SGS24-256-BLK',
    type: 'in',
    quantity: 25,
    reason: 'Réception commande',
    reference: 'CMD-2024-157',
    user: 'Pierre Durand',
    location: 'D1-E2',
  },
  {
    id: 'MOV-005',
    date: '2024-12-13',
    time: '15:10',
    product: 'iPad Pro 12.9"',
    sku: 'IPD-PRO-129-M2',
    type: 'out',
    quantity: -12,
    reason: 'Commande client',
    reference: 'VTE-2024-893',
    user: 'Anne Leclerc',
    location: 'E2-F1',
  },
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case 'in':
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'out':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    case 'adjustment':
      return <RotateCcw className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const getMovementBadge = (type: string) => {
  switch (type) {
    case 'in':
      return <Badge className="bg-green-100 text-green-800">Entrée</Badge>;
    case 'out':
      return <Badge className="bg-red-100 text-red-800">Sortie</Badge>;
    case 'adjustment':
      return <Badge className="bg-blue-100 text-blue-800">Ajustement</Badge>;
    default:
      return null;
  }
};

export function StockMovements() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Historique des Mouvements</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par produit, référence..."
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="in">Entrées</SelectItem>
                <SelectItem value="out">Sorties</SelectItem>
                <SelectItem value="adjustment">Ajustements</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd&apos;hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="custom">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Emplacement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id} className="hover:bg-muted/50">
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {movement.id}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movement.date}</p>
                      <p className="text-sm text-muted-foreground">{movement.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-sm text-muted-foreground">{movement.sku}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getMovementIcon(movement.type)}
                      {getMovementBadge(movement.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-bold ${
                        movement.quantity > 0
                          ? 'text-green-600'
                          : movement.quantity < 0
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{movement.reason}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {movement.reference}
                    </code>
                  </TableCell>
                  <TableCell>{movement.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.location}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}