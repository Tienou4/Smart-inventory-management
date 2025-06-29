"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Star, Package } from 'lucide-react';

const topProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro 128GB',
    category: 'Smartphones',
    sold: 245,
    revenue: 294000,
    stock: 45,
    trend: '+18%',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    category: 'Ordinateurs',
    sold: 89,
    revenue: 142400,
    stock: 12,
    trend: '+12%',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    category: 'Audio',
    sold: 156,
    revenue: 39000,
    stock: 78,
    trend: '+25%',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24',
    category: 'Smartphones',
    sold: 134,
    revenue: 120600,
    stock: 23,
    trend: '+8%',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    category: 'Tablettes',
    sold: 67,
    revenue: 80400,
    stock: 31,
    trend: '+15%',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

export function TopProducts() {
  return (
    <Card className="glass-morphism border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Produits les Plus Vendus</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{product.revenue.toLocaleString()}FCFA</p>
                    <Badge variant="secondary" className="text-xs">
                      {product.trend}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Package className="w-3 h-3" />
                      <span>{product.sold} vendus</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Performance</span>
                    <span>{Math.round((product.sold / 300) * 100)}%</span>
                  </div>
                  <Progress value={(product.sold / 300) * 100} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}