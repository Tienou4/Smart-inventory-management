"use client";

import { useState, useEffect } from 'react';
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
import { MoreVertical, Edit, Trash2, Eye, Package, AlertTriangle, Loader2 } from 'lucide-react';

// Interface pour les produits du backend
interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string | null;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock?: number | null;
  supplier?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  images?: { id: string; url: string; isMain: boolean }[];
  createdAt: string;
}

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
  onEditProduct: (product: Product) => void;
  searchQuery?: string;
  categoryFilter?: string;
  stockFilter?: string;
  refreshTrigger?: number;
}

export function ProductsList({ 
  onEditProduct, 
  searchQuery = '', 
  categoryFilter = 'all', 
  stockFilter = 'all',
  refreshTrigger = 0
}: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un produit
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Rafraîchir la liste
      await fetchProducts();
    } catch (error) {
      console.error('Erreur de suppression:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  // Charger les produits au montage et lors des changements
  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  // Filtrer les produits selon les critères
  const filteredProducts = products.filter(product => {
    // Filtre de recherche
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchQuery));

    // Filtre de catégorie
    const matchesCategory = categoryFilter === 'all' || 
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    // Filtre de stock
    let matchesStock = true;
    if (stockFilter === 'in-stock') {
      matchesStock = product.stock > product.minStock;
    } else if (stockFilter === 'low-stock') {
      matchesStock = product.stock > 0 && product.stock <= product.minStock;
    } else if (stockFilter === 'out-of-stock') {
      matchesStock = product.stock === 0;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  if (loading) {
    return (
      <Card className="glass-morphism border-0 shadow-lg">
        <CardContent className="p-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Chargement des produits...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-morphism border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="text-red-600 mb-4">
            <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
            <p className="font-medium">Erreur de chargement</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={fetchProducts} variant="outline">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

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
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Aucun produit trouvé</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <img
                        src={
                          product.images?.find(img => img.isMain)?.url || 
                          product.images?.[0]?.url || 
                          'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
                        }
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.barcode || 'Pas de code-barres'}
                        </p>
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
                        <p className="font-medium">XAF{product.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Coût: XAF{product.cost.toLocaleString()}
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
                    <TableCell>{product.supplier || 'Non défini'}</TableCell>
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
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}