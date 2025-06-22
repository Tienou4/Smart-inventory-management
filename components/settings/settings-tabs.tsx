"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Building,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Smartphone,
} from 'lucide-react';

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="company">Entreprise</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="integrations">Intégrations</TabsTrigger>
        <TabsTrigger value="appearance">Apparence</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profil Utilisateur</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" defaultValue="Jean" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" defaultValue="Dupont" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jean.dupont@entreprise.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" defaultValue="+33 1 23 45 67 89" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue="europe/paris">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                  <SelectItem value="europe/london">Europe/London</SelectItem>
                  <SelectItem value="america/new_york">America/New_York</SelectItem>
                  <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Sauvegarder les modifications</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="company" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Informations Entreprise</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input id="companyName" defaultValue="Mon Entreprise SARL" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siret">SIRET</Label>
                <Input id="siret" defaultValue="12345678901234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vatNumber">Numéro TVA</Label>
                <Input id="vatNumber" defaultValue="FR12345678901" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea id="address" defaultValue="123 Rue du Commerce&#10;75001 Paris&#10;France" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+33 1 23 45 67 89" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input id="website" defaultValue="https://www.monentreprise.fr" />
              </div>
            </div>
            
            <Button>Mettre à jour</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Préférences de Notification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Notifications Email</span>
              </h4>
              
              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertes de stock faible</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir un email quand un produit atteint le stock minimum
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nouvelles commandes</p>
                    <p className="text-sm text-muted-foreground">
                      Notification lors de la réception d'une nouvelle commande
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rapports hebdomadaires</p>
                    <p className="text-sm text-muted-foreground">
                      Résumé des performances chaque lundi
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Notifications Push</span>
              </h4>
              
              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertes critiques</p>
                    <p className="text-sm text-muted-foreground">
                      Ruptures de stock et problèmes urgents
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mouvements de stock</p>
                    <p className="text-sm text-muted-foreground">
                      Entrées et sorties importantes
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <Button>Sauvegarder les préférences</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Sécurité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Changer le mot de passe</h4>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Changer le mot de passe</Button>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Authentification à deux facteurs</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Activer 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Sécurisez votre compte avec une authentification à deux facteurs
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Sessions actives</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Session actuelle</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome sur Windows • Paris, France
                    </p>
                  </div>
                  <span className="text-sm text-green-600">Actif</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Mobile</p>
                    <p className="text-sm text-muted-foreground">
                      Safari sur iPhone • Il y a 2 heures
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Déconnecter</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integrations" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Intégrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Comptabilité</h4>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Synchronisez vos données avec votre logiciel de comptabilité
                </p>
                <Button variant="outline" size="sm">Configurer</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">E-commerce</h4>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Connectez votre boutique en ligne pour synchroniser les stocks
                </p>
                <Button variant="outline" size="sm">Configurer</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Scanner codes-barres</h4>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Utilisez votre smartphone pour scanner les codes-barres
                </p>
                <Button variant="outline" size="sm">Tester</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">API externe</h4>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Intégrez avec vos systèmes existants via notre API
                </p>
                <Button variant="outline" size="sm">Documentation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-6">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Apparence</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Thème</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="w-full h-20 bg-white border rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Clair</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ring-2 ring-primary">
                  <div className="w-full h-20 bg-slate-900 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Sombre</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="w-full h-20 bg-gradient-to-br from-white to-slate-900 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Auto</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Couleur d'accent</h4>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer ring-2 ring-blue-500 ring-offset-2"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Préférences d'affichage</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sidebar compacte</p>
                    <p className="text-sm text-muted-foreground">
                      Réduire la largeur de la barre latérale
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Activer les transitions et animations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode haute densité</p>
                    <p className="text-sm text-muted-foreground">
                      Afficher plus d'informations par écran
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <Button>Appliquer les changements</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}