import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  unit: string;
  category: string;
  image_url: string;
  in_stock: boolean;
  discount: number;
  description?: string;
}

interface ProductCatalogProps {
  onAddToCart: (product: any) => void;
}

const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5c86afbd-07f6-4186-b72f-831232972ff2');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.article.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <section className="py-16 min-h-screen">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Загрузка товаров...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2">Каталог товаров</h1>
          <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={20} />
                Фильтры
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Цена: {priceRange[0]} - {priceRange[1]} ₽
                  </label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                <Button className="w-full" variant="outline" onClick={() => {
                  setCategory('all');
                  setPriceRange([0, 10000]);
                  setSearchQuery('');
                }}>
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Сбросить
                </Button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию или артикулу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="relative overflow-hidden h-48 bg-muted">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
                        -{product.discount}%
                      </Badge>
                    )}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="secondary">Нет в наличии</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Арт: {product.article}</p>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.unit}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discount > 0 ? (
                          <div>
                            <p className="text-xs text-muted-foreground line-through">{product.price} ₽</p>
                            <p className="text-2xl font-bold text-primary">
                              {Math.round(product.price * (1 - product.discount / 100))} ₽
                            </p>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-secondary">{product.price} ₽</p>
                        )}
                      </div>
                      
                      <Button 
                        size="icon"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.in_stock}
                        className="hover:scale-110 transition-transform"
                      >
                        <Icon name="ShoppingCart" size={20} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Icon name="PackageSearch" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold text-secondary mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;