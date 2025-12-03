import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ activeSection, setActiveSection, cartItemsCount, onCartClick }: HeaderProps) => {
  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'calculator', label: 'Калькулятор' },
    { id: 'delivery', label: 'Доставка' },
    { id: 'about', label: 'О компании' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveSection('home')}
          >
            <div className="bg-gradient-to-br from-primary to-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Icon name="Building2" className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary">СтройМатериалы</h1>
              <p className="text-sm text-muted-foreground">Всё для строительства</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                className="font-medium"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Icon name="Search" size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button className="hidden md:flex bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
