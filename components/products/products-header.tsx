"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Download, Upload } from 'lucide-react';

interface ProductsHeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  stockFilter: string;
  onStockChange: (stock: string) => void;
}

export function ProductsHeader({ 
  onAddProduct,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockChange
}: ProductsHeaderProps) {
  
  // Fonction pour exporter les données
  const handleExport = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Erreur lors de l\'export');
      
      const products = await response.json();
      
      // Créer un fichier CSV simple
      const csvContent = [
        // En-têtes
        ['Nom', 'SKU', 'Catégorie', 'Prix', 'Coût', 'Stock', 'Stock Min', 'Fournisseur', 'Statut'].join(','),
        // Données
        ...products.map((product: any) => [
          `"${product.name}"`,
          product.sku,
          product.category,
          product.price,
          product.cost,
          product.stock,
          product.minStock,
          `"${product.supplier || ''}"`,
          product.status
        ].join(','))
      ].join('\n');

      // Télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `produits_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export des données');
    }
  };

  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Gestion des Produits</h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de produits et leurs informations
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Importer
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button onClick={onAddProduct} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Produit
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, référence, code-barres..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="smartphones">Smartphones</SelectItem>
                <SelectItem value="computers">Ordinateurs</SelectItem>
                <SelectItem value="tablets">Tablettes</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="accessories">Accessoires</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={stockFilter} onValueChange={onStockChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="in-stock">En stock</SelectItem>
                <SelectItem value="low-stock">Stock faible</SelectItem>
                <SelectItem value="out-of-stock">Rupture</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}