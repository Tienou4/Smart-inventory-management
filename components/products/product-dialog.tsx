"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Package, DollarSign, BarChart3 } from 'lucide-react';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export function ProductDialog({ isOpen, onClose, product }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    barcode: product?.barcode || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price || '',
    cost: product?.cost || '',
    stock: product?.stock || '',
    minStock: product?.minStock || '',
    maxStock: product?.maxStock || '',
    location: product?.location || '',
    supplier: product?.supplier || '',
    active: product?.status === 'active' || true,
  });

  const isEditing = !!product;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le produit' : 'Nouveau produit'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="pricing">Prix</TabsTrigger>
              <TabsTrigger value="inventory">Stock</TabsTrigger>
              <TabsTrigger value="media">Média</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du produit *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: iPhone 15 Pro 128GB"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku">Référence (SKU) *</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="Ex: IPH15P-128-TIT"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="barcode">Code-barres</Label>
                      <Input
                        id="barcode"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        placeholder="1234567890123"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smartphones">Smartphones</SelectItem>
                          <SelectItem value="computers">Ordinateurs</SelectItem>
                          <SelectItem value="tablets">Tablettes</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="accessories">Accessoires</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description détaillée du produit..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Produit actif</Label>
                      <p className="text-sm text-muted-foreground">
                        Le produit sera visible dans le catalogue
                      </p>
                    </div>
                    <Switch
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active : true })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Tarification</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Prix d&apos;achat (FCFA) *</Label>
                      <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                        placeholder="899.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Prix de vente (FCFA) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="1199.00"
                        required
                      />
                    </div>
                  </div>

                  {formData.cost && formData.price && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Marge brute:</span>
                        <span className="text-lg font-bold text-green-600">
                          XAF{(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Marge (%):</span>
                        <span className="text-lg font-bold text-green-600">
                          {(((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.price)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Package className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Gestion du stock</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock actuel</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="45"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minStock">Stock minimum *</Label>
                      <Input
                        id="minStock"
                        type="number"
                        value={formData.minStock}
                        onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                        placeholder="20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxStock">Stock maximum</Label>
                      <Input
                        id="maxStock"
                        type="number"
                        value={formData.maxStock}
                        onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Emplacement</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: A1-B2-C3"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fournisseur principal</Label>
                      <Select value={formData.supplier} onValueChange={(value) => setFormData({ ...formData, supplier: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un fournisseur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techdistrib">TechDistrib</SelectItem>
                          <SelectItem value="appledistrib">AppleDistrib</SelectItem>
                          <SelectItem value="samsungdirect">SamsungDirect</SelectItem>
                          <SelectItem value="audiotech">AudioTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Upload className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Images du produit</h3>
                  </div>

                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Glissez vos images ici</p>
                    <p className="text-muted-foreground mb-4">
                      ou cliquez pour sélectionner des fichiers
                    </p>
                    <Button variant="outline">
                      Parcourir les fichiers
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Formats acceptés: JPG, PNG, WebP. Taille maximale: 5MB par image.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {isEditing ? 'Mettre à jour' : 'Créer le produit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}