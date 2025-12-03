import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) => {
  const subtotal = items.reduce((sum, item) => {
    const price = item.discount 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const deliveryCost = subtotal > 5000 ? 0 : 500;
  const total = subtotal + deliveryCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Icon name="ShoppingCart" size={24} />
            Корзина
            {items.length > 0 && (
              <Badge className="ml-2">{items.length}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
            <Button onClick={onClose}>
              <Icon name="Package" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => {
                const price = item.discount 
                  ? item.price * (1 - item.discount / 100)
                  : item.price;

                return (
                  <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.unit}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-background rounded-lg">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                        
                        <div className="flex-1 text-right">
                          <p className="font-bold text-lg">{Math.round(price * item.quantity)} ₽</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onRemove(item.id)}
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span className="font-semibold">{Math.round(subtotal)} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="font-semibold">
                    {deliveryCost === 0 ? (
                      <span className="text-green-600">Бесплатно</span>
                    ) : (
                      `${deliveryCost} ₽`
                    )}
                  </span>
                </div>
                {deliveryCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    До бесплатной доставки: {5000 - subtotal} ₽
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Итого</span>
                <span className="text-2xl font-bold text-primary">{Math.round(total)} ₽</span>
              </div>

              <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
