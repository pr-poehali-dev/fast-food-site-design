import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import Cart from '@/components/Cart';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const menuItems = [
    {
      id: 1,
      name: 'Бургер "Жара"',
      category: 'Бургеры',
      price: 350,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/667a4437-68dc-4a80-b220-d51d88a11686.jpg',
      description: 'Сочная говядина, сыр, свежие овощи'
    },
    {
      id: 2,
      name: 'Картофель фри',
      category: 'Закуски',
      price: 150,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/d5154810-cf7e-4e97-9fe7-b56a2e6a87b3.jpg',
      description: 'Хрустящий золотистый картофель'
    },
    {
      id: 3,
      name: 'Острые крылышки',
      category: 'Закуски',
      price: 280,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/10682004-037a-4aca-97f6-b2a0527ac799.jpg',
      description: 'Куриные крылья в остром соусе'
    },
    {
      id: 4,
      name: 'Чизбургер Делюкс',
      category: 'Бургеры',
      price: 380,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/667a4437-68dc-4a80-b220-d51d88a11686.jpg',
      description: 'Двойная котлета, двойной сыр'
    },
    {
      id: 5,
      name: 'Кола 0.5л',
      category: 'Напитки',
      price: 100,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/d5154810-cf7e-4e97-9fe7-b56a2e6a87b3.jpg',
      description: 'Освежающий напиток'
    },
    {
      id: 6,
      name: 'Милкшейк',
      category: 'Напитки',
      price: 180,
      image: 'https://cdn.poehali.dev/projects/97145e64-0cca-4918-8aaa-e6976a690233/files/d5154810-cf7e-4e97-9fe7-b56a2e6a87b3.jpg',
      description: 'Ванильный, клубничный, шоколадный'
    }
  ];

  const locations = [
    { id: 1, name: 'Жара Центр', address: 'ул. Ленина, 45', phone: '+7 (495) 123-45-67', hours: '8:00 - 23:00' },
    { id: 2, name: 'Жара Юг', address: 'пр-т Победы, 12', phone: '+7 (495) 123-45-68', hours: '9:00 - 22:00' },
    { id: 3, name: 'Жара Север', address: 'ул. Мира, 78', phone: '+7 (495) 123-45-69', hours: '8:00 - 00:00' }
  ];

  const reviews = [
    { id: 1, name: 'Анна К.', rating: 5, text: 'Лучший фастфуд в городе! Всегда свежее и вкусное', date: '2 дня назад' },
    { id: 2, name: 'Михаил П.', rating: 5, text: 'Быстрая доставка, горячая еда. Рекомендую!', date: '5 дней назад' },
    { id: 3, name: 'Елена С.', rating: 4, text: 'Отличное соотношение цены и качества', date: 'неделю назад' }
  ];

  const categories = ['Все', 'Бургеры', 'Закуски', 'Напитки'];

  const filteredMenu = selectedCategory === 'Все'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: typeof menuItems[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({
      title: 'Добавлено в корзину',
      description: `${item.name} добавлен в ваш заказ`,
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: 'Корзина очищена',
      description: 'Все товары удалены из корзины',
    });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold text-primary">🔥 ЖАРА</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#menu" className="font-medium hover:text-primary transition-colors">Меню</a>
            <a href="#about" className="font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#locations" className="font-medium hover:text-primary transition-colors">Филиалы</a>
            <a href="#reviews" className="font-medium hover:text-primary transition-colors">Отзывы</a>
            <a href="#delivery" className="font-medium hover:text-primary transition-colors">Доставка</a>
            <a href="#contacts" className="font-medium hover:text-primary transition-colors">Контакты</a>
          </div>
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClear={clearCart}
          />
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary via-secondary to-primary animate-fade-in">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-scale-in">
            ЖАРА
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-medium">
            Настоящий вкус. Настоящий огонь! 🔥
          </p>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Сеть ресторанов быстрого питания с доставкой по всему городу
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <Icon name="ShoppingBag" className="mr-2" size={24} />
              Смотреть меню
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
              <Icon name="Truck" className="mr-2" size={24} />
              Заказать доставку
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Наше меню</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Только свежие продукты и проверенные рецепты</p>
          
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="lg"
                className="font-medium"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="h-64 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-primary">{item.price} ₽</span>
                  <Button
                    className="bg-secondary hover:bg-secondary/90"
                    onClick={() => addToCart(item)}
                  >
                    <Icon name="Plus" size={20} className="mr-1" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-12">О нас</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Быстро</h3>
              <p className="text-muted-foreground">Готовим ваш заказ за 10-15 минут</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-3">Вкусно</h3>
              <p className="text-muted-foreground">Авторские рецепты от шеф-повара</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Качество</h3>
              <p className="text-muted-foreground">Только свежие ингредиенты</p>
            </Card>
          </div>
          <p className="text-lg text-center leading-relaxed">
            "Жара" — это сеть ресторанов быстрого питания, которая открылась в 2020 году. 
            Мы гордимся тем, что используем только качественные продукты и готовим с душой. 
            Наша миссия — дарить людям радость вкусной еды каждый день!
          </p>
        </div>
      </section>

      <section id="locations" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Наши филиалы</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите ближайший к вам ресторан</p>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map(loc => (
              <Card key={loc.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" size={28} />
                    {loc.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Home" className="text-muted-foreground mt-1" size={20} />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" className="text-muted-foreground" size={20} />
                    <span className="font-medium">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="text-muted-foreground" size={20} />
                    <span>{loc.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Отзывы</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Что говорят наши клиенты</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-accent fill-accent" size={18} />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-sm">{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Icon name="Truck" size={64} className="mx-auto mb-6" />
          <h2 className="text-5xl font-bold mb-6">Доставка</h2>
          <p className="text-xl mb-8">Быстрая доставка горячей еды прямо к вашей двери</p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="Clock" size={28} />
                  Время доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg">
                <p>В пределах города: 30-40 минут</p>
                <p>За городом: до 60 минут</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="Wallet" size={28} />
                  Стоимость
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg">
                <p>При заказе от 500₽ — бесплатно</p>
                <p>До 500₽ — 150₽</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl font-bold text-center mb-4">Свяжитесь с нами</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Есть вопросы? Напишите нам!</p>
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Ваше имя</label>
                  <Input placeholder="Введите имя" className="text-base py-6" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Email или телефон</label>
                  <Input placeholder="example@mail.ru или +7 (900) 000-00-00" className="text-base py-6" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение" rows={5} className="text-base" />
                </div>
                <Button size="lg" className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-6 mt-12">
            <a href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl">📱</div>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white text-2xl">💬</div>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-2xl">📧</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-4xl font-bold mb-4">🔥 ЖАРА</div>
          <p className="text-lg mb-6">Сеть ресторанов быстрого питания</p>
          <div className="flex justify-center gap-8 mb-6 flex-wrap">
            <a href="#menu" className="hover:text-primary transition-colors">Меню</a>
            <a href="#about" className="hover:text-primary transition-colors">О нас</a>
            <a href="#locations" className="hover:text-primary transition-colors">Филиалы</a>
            <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Жара. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;