import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer = ({ setActiveSection }: FooterProps) => {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary to-orange-600 p-2.5 rounded-xl">
                <Icon name="Building2" className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">СтройМатериалы</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Всё для строительства и ремонта. Качество, скорость, надёжность.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Icon name="Phone" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Icon name="Mail" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-300">
              {['home', 'catalog', 'calculator', 'delivery'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {section === 'home' ? 'Главная' :
                     section === 'catalog' ? 'Каталог' :
                     section === 'calculator' ? 'Калькулятор' :
                     'Доставка'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={() => setActiveSection('about')} className="hover:text-primary transition-colors text-sm">
                  О компании
                </button>
              </li>
              <li className="hover:text-primary transition-colors text-sm cursor-pointer">Оплата</li>
              <li className="hover:text-primary transition-colors text-sm cursor-pointer">Гарантии</li>
              <li className="hover:text-primary transition-colors text-sm cursor-pointer">Документы</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+79991234567" className="hover:text-primary transition-colors">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:info@stroymaterials.ru" className="hover:text-primary transition-colors">
                  info@stroymaterials.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <span>г. Москва, ул. Строительная, д. 15</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Пн-Пт: 8:00-20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 СтройМатериалы. Все права защищены.</p>
            <div className="flex gap-6">
              <button className="hover:text-primary transition-colors">Политика конфиденциальности</button>
              <button className="hover:text-primary transition-colors">Условия использования</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
