"use client";
import React from 'react'; 
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { productSchema } from '@/schemas/productSchema';
import { z } from 'zod';
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

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductDialog({ isOpen, onClose, product }: ProductDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormValues>({
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    price: product?.price || 0,
    cost: product?.cost || 0,
    stock: product?.stock || 0,
    minStock: product?.minStock || 0,
    maxStock: product?.maxStock || null,
    barcode: product?.barcode || null,
    description: product?.description || null,
    location: product?.location || null,
    supplier: product?.supplier || null,
    active: product?.status === 'active' || false,
    images: [],
  });

  const isEditing = !!product;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convertir les données en type approprié
      const parsedData = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) || 0 : formData.price,
        cost: typeof formData.cost === 'string' ? parseFloat(formData.cost) || 0 : formData.cost,
        stock: typeof formData.stock === 'string' ? parseInt(formData.stock) || 0 : formData.stock,
        minStock: typeof formData.minStock === 'string' ? parseInt(formData.minStock) || 0 : formData.minStock,
        maxStock: formData.maxStock ? (typeof formData.maxStock === 'string' ? parseInt(formData.maxStock) : formData.maxStock) : null,
        barcode: formData.barcode || null,
        description: formData.description || null,
        location: formData.location || null,
        supplier: formData.supplier || null,
        active: formData.active,
      };

      // Valider avec Zod
      const validated = productSchema.parse(parsedData);

      // Envoyer les données via fetch
      const url = isEditing ? `/api/products?id=${product?.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const body = new FormData();

      body.append("name", validated.name);
      body.append("sku", validated.sku);
      body.append("category", validated.category);
      body.append("price", validated.price.toString());
      body.append("cost", validated.cost.toString());
      body.append("stock", validated.stock.toString());
      body.append("minStock", validated.minStock.toString());

    if (validated.maxStock !== null && validated.maxStock !== undefined) {
          body.append("maxStock", validated.maxStock.toString());
      } else {
        body.append("maxStock", "");
      }

      body.append("barcode", validated.barcode || "");
      body.append("description", validated.description || "");
      body.append("location", validated.location || "");
      body.append("supplier", validated.supplier || "");
      body.append("active", validated.active ? "true" : "false");

      // Ajout des images
      formData.images.forEach((file) => {
        body.append("images", file);
      });

      const response = await fetch(url, { method, body });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      const result = await response.json();
      console.log("✅ Produit sauvegardé :", result);

      onClose();
      router.refresh();

    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map(e => `${e.path.join('.')} : ${e.message}`).join(", ");
        alert(`Données invalides : ${errorMessage}`);
      } else {
        alert(`Échec de la soumission : ${(error as Error).message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le produit' : 'Nouveau produit'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modifiez les informations de ce produit' : 'Créez un nouveau produit pour votre inventaire'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="pricing">Prix</TabsTrigger>
              <TabsTrigger value="inventory">Stock</TabsTrigger>
              <TabsTrigger value="media">Média</TabsTrigger>
            </TabsList>

            {/* Onglet Général */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du produit *</Label>
                      <Input
                        id="name"
                        value={formData.name ?? ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: iPhone 15 Pro 128GB"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">Référence (SKU) *</Label>
                      <Input
                        id="sku"
                        value={formData.sku ?? ''}
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
                        value={formData.barcode ?? ''}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value || null })}
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
                      value={formData.description ?? ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
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
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Prix */}
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
                        value={formData.cost || ''}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value ? parseFloat(e.target.value) : 0 })}
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
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseFloat(e.target.value) : 0 })}
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
                          XAF{(Number(formData.price) - Number(formData.cost)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Marge (%):</span>
                        <span className="text-lg font-bold text-green-600">
                          {(((Number(formData.price) - Number(formData.cost)) / Number(formData.price)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Stock */}
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
                        value={formData.stock || ''}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value ? parseInt(e.target.value) : 0 })}
                        placeholder="45"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minStock">Stock minimum *</Label>
                      <Input
                        id="minStock"
                        type="number"
                        value={formData.minStock || ''}
                        onChange={(e) => setFormData({ ...formData, minStock: e.target.value ? parseInt(e.target.value) : 0 })}
                        placeholder="20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStock">Stock maximum</Label>
                      <Input
                        id="maxStock"
                        type="number"
                        value={formData.maxStock || ''}
                        onChange={(e) => setFormData({ ...formData, maxStock: e.target.value ? parseInt(e.target.value) : null })}
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Emplacement</Label>
                      <Input
                        id="location"
                        value={formData.location ?? ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value || null })}
                        placeholder="Ex: A1-B2-C3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fournisseur principal</Label>
                      <Select value={formData.supplier ?? ''} onValueChange={(value) => setFormData({ ...formData, supplier: value || null })}>
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

            {/* Onglet Média */}
            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Upload className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Images du produit</h3>
                  </div>

                  {/* Upload zone */}
                <div className="space-y-4">
                    <Label>Images du produit</Label>

                    <div className="relative w-full h-48">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            setFormData((prev) => ({
                              ...prev,
                              images: [...prev.images, ...Array.from(files)],
                            }));
                          }
                        }}
                        className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
                      />

                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-full pointer-events-none select-none">
                        <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="font-medium">Glissez vos fichiers ici</p>
                        <p className="text-sm text-muted-foreground">ou cliquez pour importer</p>
                      </div>
                    </div>
                  </div>


                  {/* Prévisualisation */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {Array.from(formData.images ?? []).map((file, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Aperçu ${index}`}
                            width={128}
                            height={128}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newImages = Array.from(formData.images).filter((_, i) => i !== index);
                              setFormData({ ...formData, images: newImages });
                            }}
                          >
                            <span>X</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Formats acceptés: JPG, PNG, WebP. Taille maximale: 5MB par image.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : isEditing ? "Mettre à jour" : "Créer le produit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}