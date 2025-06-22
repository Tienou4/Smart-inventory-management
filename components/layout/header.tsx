"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Monitor,
  RefreshCw,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import type { ViewType } from '@/app/(main)/dashboard/page';

interface HeaderProps {
  onMenuClick: () => void;
  currentView: ViewType;
}

const viewTitles: Record<ViewType, string> = {
  dashboard: 'Tableau de bord',
  products: 'Gestion des produits',
  stock: 'Mouvements de stock',
  suppliers: 'Fournisseurs',
  reports: 'Rapports et analyses',
  settings: 'Paramètres',
};

export function Header({ onMenuClick, currentView }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b bg-card/95 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">
            {viewTitles[currentView]}
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10 w-64 bg-muted/50"
          />
        </div>

        {/* Sync Status */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/20">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-green-700 dark:text-green-400">
            Connecté
          </span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-2 p-2">
              <div className="flex items-start space-x-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Stock faible</p>
                  <p className="text-xs text-muted-foreground">
                    5 produits nécessitent un réapprovisionnement
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvelle commande</p>
                  <p className="text-xs text-muted-foreground">
                    Commande #1247 reçue de TechSupply
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Rapport mensuel</p>
                  <p className="text-xs text-muted-foreground">
                    Analyse disponible pour janvier 2025
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              Clair
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              Sombre
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              Système
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar-placeholder.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  TU
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Tienou</p>
                <p className="text-xs leading-none text-muted-foreground">
                  ulrich.tienou@TIENOVA.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}