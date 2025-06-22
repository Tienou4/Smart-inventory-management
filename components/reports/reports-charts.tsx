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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { month: 'Jan', ventes: 45000, commandes: 156, profit: 12000 },
  { month: 'Fév', ventes: 52000, commandes: 189, profit: 15600 },
  { month: 'Mar', ventes: 48000, commandes: 167, profit: 13200 },
  { month: 'Avr', ventes: 61000, commandes: 203, profit: 18300 },
  { month: 'Mai', ventes: 55000, commandes: 178, profit: 16500 },
  { month: 'Jun', ventes: 67000, commandes: 234, profit: 20100 },
  { month: 'Jul', ventes: 72000, commandes: 267, profit: 21600 },
  { month: 'Aoû', ventes: 69000, commandes: 245, profit: 20700 },
  { month: 'Sep', ventes: 78000, commandes: 289, profit: 23400 },
  { month: 'Oct', ventes: 84000, commandes: 312, profit: 25200 },
  { month: 'Nov', ventes: 91000, commandes: 345, profit: 27300 },
  { month: 'Déc', ventes: 89000, commandes: 334, profit: 26700 },
];

const categoryData = [
  { name: 'Smartphones', value: 35, color: '#3B82F6' },
  { name: 'Ordinateurs', value: 28, color: '#10B981' },
  { name: 'Audio', value: 18, color: '#F59E0B' },
  { name: 'Tablettes', value: 12, color: '#EF4444' },
  { name: 'Accessoires', value: 7, color: '#8B5CF6' },
];

const topProducts = [
  { name: 'iPhone 15 Pro', ventes: 245, revenue: 294000 },
  { name: 'MacBook Air M3', ventes: 89, revenue: 142400 },
  { name: 'AirPods Pro 2', ventes: 156, revenue: 39000 },
  { name: 'Samsung Galaxy S24', ventes: 134, revenue: 120600 },
  { name: 'iPad Pro 12.9"', ventes: 67, revenue: 80400 },
];

export function ReportsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-2">
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Évolution des Ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenue">Chiffre d&apos;affaires</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="profit">Profit</TabsTrigger>
              </TabsList>

              <TabsContent value="revenue">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `XAF${value / 1000}K`} />
                      <Tooltip
                        formatter={(value: number) => [`XAF${value.toLocaleString()}`, 'Ventes']}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="ventes"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="commandes" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="profit">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `€${value / 1000}K`} />
                      <Tooltip
                        formatter={(value: number) => [`€${value.toLocaleString()}`, 'Profit']}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Side Charts */}
      <div className="space-y-6">
        {/* Category Distribution */}
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="glass-morphism border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Top Produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.ventes} vendus</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">XAF{(product.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}