import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClear: () => void;
}

const Cart = ({ items, onRemove, onUpdateQuantity, onClear }: CartProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90 relative">
          <Icon name="ShoppingCart" className="mr-2" size={20} />
          Корзина
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-accent text-foreground px-2">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl flex items-center gap-2">
            <Icon name="ShoppingCart" size={28} />
            Ваш заказ
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Корзина пуста</p>
            <p className="text-sm text-muted-foreground mt-2">Добавьте вкусные блюда из меню!</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-muted/50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                    <p className="text-primary font-bold text-lg">{item.price} ₽</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Товаров:</span>
                <span className="font-medium">{totalItems} шт</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Доставка:</span>
                <span className="font-medium">{totalPrice >= 500 ? 'Бесплатно' : '150 ₽'}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-2xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">
                  {totalPrice >= 500 ? totalPrice : totalPrice + 150} ₽
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90">
                <Icon name="CreditCard" className="mr-2" size={22} />
                Оформить заказ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={onClear}
              >
                <Icon name="Trash2" className="mr-2" size={18} />
                Очистить корзину
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
