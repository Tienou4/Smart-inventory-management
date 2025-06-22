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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Package, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

interface StockAdjustmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro 128GB',
    sku: 'IPH15P-128-TIT',
    currentStock: 45,
    location: 'A1-B2',
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    sku: 'MBA-M3-13-SLV',
    currentStock: 12,
    location: 'B2-C1',
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    sku: 'APP-2GEN-WHT',
    currentStock: 78,
    location: 'C1-D3',
  },
];

export function StockAdjustmentDialog({ isOpen, onClose }: StockAdjustmentDialogProps) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [movementType, setMovementType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      selectedProduct,
      movementType,
      quantity,
      reason,
      reference,
      notes,
    });
    onClose();
  };

  const selectedProductData = sampleProducts.find(p => p.id === selectedProduct);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau Mouvement de Stock</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="product">Produit</TabsTrigger>
              <TabsTrigger value="movement">Mouvement</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Rechercher un produit</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Tapez le nom ou la référence du produit..."
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ou sélectionner dans la liste</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{product.name}</span>
                              <Badge variant="outline">{product.sku}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProductData && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{selectedProductData.name}</h4>
                        <Badge>{selectedProductData.sku}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Stock actuel:</span>
                          <span className="ml-2 font-medium">{selectedProductData.currentStock}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Emplacement:</span>
                          <span className="ml-2 font-medium">{selectedProductData.location}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="movement" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Type de mouvement *</Label>
                    <Select value={movementType} onValueChange={setMovementType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span>Entrée de stock</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="out">
                          <div className="flex items-center space-x-2">
                            <TrendingDown className="w-4 h-4 text-red-500" />
                            <span>Sortie de stock</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="adjustment">
                          <div className="flex items-center space-x-2">
                            <RotateCcw className="w-4 h-4 text-blue-500" />
                            <span>Ajustement</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Ex: 25"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motif *</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un motif" />
                      </SelectTrigger>
                      <SelectContent>
                        {movementType === 'in' && (
                          <>
                            <SelectItem value="purchase">Réception commande</SelectItem>
                            <SelectItem value="return">Retour client</SelectItem>
                            <SelectItem value="transfer">Transfert entrepôt</SelectItem>
                          </>
                        )}
                        {movementType === 'out' && (
                          <>
                            <SelectItem value="sale">Vente</SelectItem>
                            <SelectItem value="damage">Produit défectueux</SelectItem>
                            <SelectItem value="loss">Perte</SelectItem>
                            <SelectItem value="transfer">Transfert</SelectItem>
                          </>
                        )}
                        {movementType === 'adjustment' && (
                          <>
                            <SelectItem value="inventory">Correction inventaire</SelectItem>
                            <SelectItem value="error">Correction erreur</SelectItem>
                            <SelectItem value="audit">Audit</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProductData && quantity && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Nouveau stock:</span>
                        <span className="text-lg font-bold">
                          {movementType === 'in' 
                            ? selectedProductData.currentStock + parseInt(quantity || '0')
                            : selectedProductData.currentStock - parseInt(quantity || '0')
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference">Référence</Label>
                    <Input
                      id="reference"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Ex: CMD-2024-156, VTE-2024-892"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes additionnelles</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Informations complémentaires..."
                      rows={3}
                    />
                  </div>

                  {/* Résumé */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-3">Résumé du mouvement</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Produit:</span>
                        <span>{selectedProductData?.name || 'Non sélectionné'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{movementType || 'Non sélectionné'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantité:</span>
                        <span>{quantity || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Motif:</span>
                        <span>{reason || 'Non sélectionné'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={!selectedProduct || !movementType || !quantity || !reason}
            >
              Enregistrer le mouvement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}