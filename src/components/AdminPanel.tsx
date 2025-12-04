import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

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

const API_URL = 'https://functions.poehali.dev/5c86afbd-07f6-4186-b72f-831232972ff2';

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    article: '',
    price: 0,
    unit: '',
    category: '',
    image_url: '',
    discount: 0,
    description: '',
    in_stock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      toast.error('Ошибка загрузки товаров');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        const response = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          toast.success('Товар обновлен');
          fetchProducts();
          resetForm();
        }
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          toast.success('Товар добавлен');
          fetchProducts();
          resetForm();
        }
      }
    } catch (error) {
      toast.error('Ошибка сохранения');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить товар?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Товар удален');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Ошибка удаления');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      article: '',
      price: 0,
      unit: '',
      category: '',
      image_url: '',
      discount: 0,
      description: '',
      in_stock: true
    });
    setEditingProduct(null);
    setDialogOpen(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      article: product.article,
      price: product.price,
      unit: product.unit,
      category: product.category,
      image_url: product.image_url,
      discount: product.discount,
      description: product.description || '',
      in_stock: product.in_stock
    });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-secondary mb-2 flex items-center gap-3">
            <Icon name="Settings" size={36} />
            Админ-панель
          </h1>
          <p className="text-muted-foreground">Управление каталогом товаров</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" onClick={resetForm}>
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Редактировать товар' : 'Новый товар'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Название *</Label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label>Артикул *</Label>
                  <Input
                    value={formData.article}
                    onChange={e => setFormData({...formData, article: e.target.value})}
                    required
                    disabled={!!editingProduct}
                  />
                </div>
                
                <div>
                  <Label>Цена (₽) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                
                <div>
                  <Label>Скидка (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={e => setFormData({...formData, discount: parseInt(e.target.value)})}
                  />
                </div>
                
                <div>
                  <Label>Единица измерения *</Label>
                  <Input
                    value={formData.unit}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                    placeholder="шт, кг, упаковка..."
                    required
                  />
                </div>
                
                <div>
                  <Label>Категория *</Label>
                  <Input
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div>
                <Label>URL изображения</Label>
                <Input
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="in_stock"
                  checked={formData.in_stock}
                  onChange={e => setFormData({...formData, in_stock: e.target.checked})}
                  className="w-4 h-4"
                />
                <Label htmlFor="in_stock" className="cursor-pointer">В наличии</Label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map(product => (
          <Card key={product.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="ImageOff" size={24} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                  <div>Артикул: <span className="font-medium text-foreground">{product.article}</span></div>
                  <div>Цена: <span className="font-medium text-foreground">{product.price} ₽</span></div>
                  <div>Категория: <span className="font-medium text-foreground">{product.category}</span></div>
                  <div>
                    {product.in_stock ? (
                      <span className="text-green-600 font-medium">✓ В наличии</span>
                    ) : (
                      <span className="text-red-600 font-medium">✗ Нет в наличии</span>
                    )}
                  </div>
                </div>
                
                {product.discount > 0 && (
                  <div className="mt-2 inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                    Скидка {product.discount}%
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
