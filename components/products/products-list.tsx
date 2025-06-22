"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical, Edit, Trash2, Eye, Package, AlertTriangle } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro 128GB',
    sku: 'IPH15P-128-TIT',
    barcode: '1234567890123',
    category: 'Smartphones',
    price: 1199,
    cost: 899,
    stock: 45,
    minStock: 20,
    supplier: 'TechDistrib',
    status: 'active',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'MacBook Air M3 13"',
    sku: 'MBA-M3-13-SLV',
    barcode: '2345678901234',
    category: 'Ordinateurs',
    price: 1299,
    cost: 999,
    stock: 12,
    minStock: 10,
    supplier: 'AppleDistrib',
    status: 'active',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'AirPods Pro 2ème génération',
    sku: 'APP-2GEN-WHT',
    barcode: '3456789012345',
    category: 'Audio',
    price: 279,
    cost: 189,
    stock: 78,
    minStock: 50,
    supplier: 'AudioTech',
    status: 'active',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 256GB',
    sku: 'SGS24-256-BLK',
    barcode: '4567890123456',
    category: 'Smartphones',
    price: 899,
    cost: 649,
    stock: 8,
    minStock: 15,
    supplier: 'SamsungDirect',
    status: 'low-stock',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" M2',
    sku: 'IPD-PRO-129-M2',
    barcode: '5678901234567',
    category: 'Tablettes',
    price: 1199,
    cost: 899,
    stock: 0,
    minStock: 8,
    supplier: 'AppleDistrib',
    status: 'out-of-stock',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

const getStatusBadge = (status: string, stock: number, minStock: number) => {
  if (stock === 0) {
    return <Badge variant="destructive">Rupture</Badge>;
  }
  if (stock <= minStock) {
    return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock faible</Badge>;
  }
  return <Badge variant="secondary" className="bg-green-100 text-green-800">En stock</Badge>;
};

interface ProductsListProps {
  onEditProduct: (product: any) => void;
}

export function ProductsList({ onEditProduct }: ProductsListProps) {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-16"></TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.barcode}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {product.sku}
                    </code>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">XAF{product.price}</p>
                      <p className="text-sm text-muted-foreground">
                        Coût: XAF{product.cost}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{product.stock}</span>
                      {product.stock <= product.minStock && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Min: {product.minStock}
                    </p>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.stock, product.minStock)}
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditProduct(product)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="w-4 h-4 mr-2" />
                          Mouvement
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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