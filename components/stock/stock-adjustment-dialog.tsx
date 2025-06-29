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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw, 
  Download,
  FileText,
  Receipt,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';

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
    price: 1200000,
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    sku: 'MBA-M3-13-SLV',
    currentStock: 12,
    location: 'B2-C1',
    price: 1800000,
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    sku: 'APP-2GEN-WHT',
    currentStock: 78,
    location: 'C1-D3',
    price: 350000,
  },
];

export default function StockAdjustmentDialog({ isOpen = true, onClose = () => {} }: StockAdjustmentDialogProps) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [movementType, setMovementType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');
  const [billingInfo, setBillingInfo] = useState({
    invoiceNumber: '',
    customerName: '',
    paymentMethod: '',
  });

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
      ...(reason === 'sale' && { billingInfo })
    });
    onClose();
  };

  const handleDownloadInvoice = () => {
    // Logique de téléchargement de la facture
    console.log('Téléchargement de la facture...');
  };

  const handleDownloadMovement = () => {
    // Logique de téléchargement du mouvement
    console.log('Téléchargement du mouvement...');
  };

  const selectedProductData = sampleProducts.find(p => p.id === selectedProduct);
  const totalAmount = selectedProductData && quantity 
    ? selectedProductData.price * parseInt(quantity || '0') 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Nouveau Mouvement de Stock
          </DialogTitle>
        </DialogHeader>

        <div onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <Tabs defaultValue="product" className="w-full flex flex-col flex-1 min-h-0">
            <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
              <TabsTrigger value="product">Produit</TabsTrigger>
              <TabsTrigger value="movement">Mouvement</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="download" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Téléchargement
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0 mt-4">
              <ScrollArea className="h-full">
                <div className="pr-4">
                  <TabsContent value="product" className="mt-0">
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
                          <Label>Sélectionner un produit</Label>
                          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un produit" />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-48">
                                {sampleProducts.map((product) => (
                                  <SelectItem key={product.id} value={product.id}>
                                    <div className="flex items-center justify-between w-full gap-2">
                                      <span className="truncate max-w-[70%]">{product.name}</span>
                                      <Badge variant="outline" className="flex-shrink-0">{product.sku}</Badge>
                                    </div>
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedProductData && (
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2 gap-2">
                              <h4 className="font-medium truncate">{selectedProductData.name}</h4>
                              <Badge className="flex-shrink-0">{selectedProductData.sku}</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="truncate">
                                <span className="text-muted-foreground">Stock actuel:</span>
                                <span className="ml-2 font-medium">{selectedProductData.currentStock}</span>
                              </div>
                              <div className="truncate">
                                <span className="text-muted-foreground">Emplacement:</span>
                                <span className="ml-2 font-medium">{selectedProductData.location}</span>
                              </div>
                              <div className="truncate">
                                <span className="text-muted-foreground">Prix:</span>
                                <span className="ml-2 font-medium">{selectedProductData.price.toLocaleString()} FCFA</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="movement" className="mt-0">
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

                  <TabsContent value="details" className="mt-0">
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

                        {/* Section de facturation visible pour les ventes */}
                        {reason === 'sale' && (
                          <>
                            <Separator className="my-4" />
                            <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                              <h4 className="font-medium flex items-center gap-2">
                                <Receipt className="w-4 h-4" />
                                Informations de Facturation
                              </h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="invoiceNumber">Numéro de Facture *</Label>
                                  <Input
                                    id="invoiceNumber"
                                    value={billingInfo.invoiceNumber}
                                    onChange={(e) =>
                                      setBillingInfo({ ...billingInfo, invoiceNumber: e.target.value })
                                    }
                                    placeholder="Ex: FACT-2024-001"
                                    required
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="customerName">Nom du Client *</Label>
                                  <Input
                                    id="customerName"
                                    value={billingInfo.customerName}
                                    onChange={(e) =>
                                      setBillingInfo({ ...billingInfo, customerName: e.target.value })
                                    }
                                    placeholder="Ex: John Doe"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="paymentMethod">Mode de Paiement *</Label>
                                <Select
                                  value={billingInfo.paymentMethod}
                                  onValueChange={(value) =>
                                    setBillingInfo({ ...billingInfo, paymentMethod: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un mode de paiement" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cash">
                                      <div className="flex items-center gap-2">
                                        <span>💵</span>
                                        <span>Espèces</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="credit_card">
                                      <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Carte Bancaire</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="bank_transfer">
                                      <div className="flex items-center gap-2">
                                        <span>🏦</span>
                                        <span>Virement Bancaire</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {totalAmount > 0 && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-green-800">Montant total:</span>
                                    <span className="text-xl font-bold text-green-800">
                                      {totalAmount.toLocaleString()} FCFA
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        <Separator className="my-4" />
                        
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-3">Résumé du mouvement</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Produit:</span>
                              <span className="truncate max-w-[60%] text-right">{selectedProductData?.name || 'Non sélectionné'}</span>
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

                  <TabsContent value="download" className="mt-0">
                    <div className="flex flex-col gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Mouvement de Stock
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Téléchargez le document de mouvement de stock au format PDF.
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>Date: {new Date().toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Package className="w-4 h-4" />
                              <span>Référence: {reference || 'Auto-générée'}</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={handleDownloadMovement}
                            className="w-full"
                            variant="outline"
                            disabled={!selectedProduct || !movementType || !quantity}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger le Mouvement
                          </Button>
                        </CardContent>
                      </Card>

                      {reason === 'sale' ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Receipt className="w-5 h-5" />
                              Facture
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Téléchargez la facture de vente au format PDF.
                            </p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Receipt className="w-4 h-4" />
                                <span>N° Facture: {billingInfo.invoiceNumber || 'Non défini'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Client: {billingInfo.customerName || 'Non défini'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                <span>Paiement: {billingInfo.paymentMethod || 'Non défini'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>💰</span>
                                <span>Montant: {totalAmount.toLocaleString()} FCFA</span>
                              </div>
                            </div>
                            
                            <Button 
                              onClick={handleDownloadInvoice}
                              className="w-full"
                              disabled={!billingInfo.invoiceNumber || !billingInfo.customerName}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger la Facture
                            </Button>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="p-6 text-center">
                            <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h4 className="font-medium mb-2">Aucune facture disponible</h4>
                            <p className="text-sm text-muted-foreground">
                              La facture n&apos;est disponible que pour les mouvements de type Vente.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6 border-t mt-6 flex-shrink-0">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}