"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const stockData = [
  { month: 'Jan', valeur: 650000, volume: 1200, commandes: 45 },
  { month: 'Fév', valeur: 680000, volume: 1350, commandes: 52 },
  { month: 'Mar', valeur: 620000, volume: 1180, commandes: 48 },
  { month: 'Avr', valeur: 720000, volume: 1420, commandes: 58 },
  { month: 'Mai', valeur: 780000, volume: 1520, commandes: 62 },
  { month: 'Jun', valeur: 740000, volume: 1380, commandes: 55 },
  { month: 'Jul', valeur: 820000, volume: 1620, commandes: 68 },
  { month: 'Aoû', valeur: 790000, volume: 1480, commandes: 59 },
  { month: 'Sep', valeur: 850000, volume: 1650, commandes: 72 },
  { month: 'Oct', valeur: 880000, volume: 1720, commandes: 78 },
  { month: 'Nov', valeur: 920000, volume: 1850, commandes: 85 },
  { month: 'Déc', valeur: 847000, volume: 1670, commandes: 76 },
];

const recentMovements = [
  { date: '12 Déc', entrees: 120, sorties: 85 },
  { date: '11 Déc', entrees: 95, sorties: 110 },
  { date: '10 Déc', entrees: 140, sorties: 95 },
  { date: '09 Déc', entrees: 105, sorties: 125 },
  { date: '08 Déc', entrees: 160, sorties: 90 },
  { date: '07 Déc', entrees: 130, sorties: 115 },
  { date: '06 Déc', entrees: 110, sorties: 100 },
];

export function StockChart() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Évolution du Stock</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="valeur" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="valeur">Valeur</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="mouvements">Mouvements</TabsTrigger>
          </TabsList>

          <TabsContent value="valeur" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockData}>
                  <defs>
                    <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()}FCFA`, 'Valeur']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="valeur"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorValeur)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [value, 'Articles']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="mouvements" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recentMovements}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="entrees" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="sorties" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}