"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

const detailedReports = [
  {
    product: 'iPhone 15 Pro 128GB',
    category: 'Smartphones',
    stockInitial: 120,
    entrees: 85,
    sorties: 160,
    stockFinal: 45,
    ventes: 245,
    revenue: 294000,
    profit: 73500,
    rotation: 5.4,
    trend: 'up',
  },
  {
    product: 'MacBook Air M3',
    category: 'Ordinateurs',
    stockInitial: 45,
    entrees: 56,
    sorties: 89,
    stockFinal: 12,
    ventes: 89,
    revenue: 142400,
    profit: 35600,
    rotation: 4.2,
    trend: 'up',
  },
  {
    product: 'AirPods Pro 2',
    category: 'Audio',
    stockInitial: 200,
    entrees: 134,
    sorties: 256,
    stockFinal: 78,
    ventes: 156,
    revenue: 39000,
    profit: 11700,
    rotation: 6.8,
    trend: 'up',
  },
  {
    product: 'Samsung Galaxy S24',
    category: 'Smartphones',
    stockInitial: 80,
    entrees: 77,
    sorties: 134,
    stockFinal: 23,
    ventes: 134,
    revenue: 120600,
    profit: 30150,
    rotation: 4.8,
    trend: 'down',
  },
  {
    product: 'iPad Pro 12.9"',
    category: 'Tablettes',
    stockInitial: 60,
    entrees: 38,
    sorties: 67,
    stockFinal: 31,
    ventes: 67,
    revenue: 80400,
    profit: 20100,
    rotation: 3.2,
    trend: 'up',
  },
];

export function ReportsTable() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Rapport Détaillé par Produit</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Stock Initial</TableHead>
                <TableHead>Entrées</TableHead>
                <TableHead>Sorties</TableHead>
                <TableHead>Stock Final</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>CA</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Rotation</TableHead>
                <TableHead>Tendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedReports.map((item) => (
                <TableRow key={item.product} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.stockInitial}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">+{item.entrees}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 font-medium">-{item.sorties}</span>
                  </TableCell>
                  <TableCell>
                    <span className={item.stockFinal < 20 ? 'text-orange-600 font-medium' : ''}>
                      {item.stockFinal}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{item.ventes}</TableCell>
                  <TableCell className="font-medium">
                    €{item.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    €{item.profit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.rotation > 4 ? 'default' : 'secondary'}>
                      {item.rotation}x
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
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