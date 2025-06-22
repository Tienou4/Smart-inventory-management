"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export function SettingsHeader() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">
              Configurez votre application selon vos besoins
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}