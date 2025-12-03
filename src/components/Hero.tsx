import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20">
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/24895852-c667-4b4c-bd27-6b4b42899587.jpg')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Icon name="TrendingUp" size={18} className="text-primary" />
            <span className="text-sm font-medium text-secondary">Скидки до 25% на популярные позиции</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Строительные материалы <span className="text-accent">премиум качества</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Цемент, гипсокартон, утеплители, металлопрокат и более 5000 товаров со склада. 
            Доставка по городу за 2 часа.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Icon name="Package" size={22} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-8 py-6"
            >
              <Icon name="Calculator" size={22} className="mr-2" />
              Калькулятор расхода
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            {[
              { icon: 'Truck', label: 'Доставка 2 часа', value: 'По городу' },
              { icon: 'ShieldCheck', label: 'Гарантия качества', value: 'Сертификаты' },
              { icon: 'Percent', label: 'Скидки', value: 'До 25%' },
            ].map((item, index) => (
              <div key={index} className="text-white animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <Icon name={item.icon as any} size={32} className="mb-3 text-accent" />
                <p className="text-sm text-gray-300">{item.label}</p>
                <p className="font-bold text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
