import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">О компании</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Надёжный поставщик строительных материалов с 2010 года
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: 'Calendar', value: '14 лет', label: 'На рынке' },
              { icon: 'Users', value: '12 000+', label: 'Клиентов' },
              { icon: 'Package', value: '5 000+', label: 'Товаров' },
            ].map((stat, index) => (
              <Card key={index} className="p-8 text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} size={32} className="text-white" />
                </div>
                <p className="text-4xl font-bold text-secondary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-background to-muted/30 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Почему выбирают нас</h2>
                <div className="space-y-4">
                  {[
                    { icon: 'ShieldCheck', title: 'Гарантия качества', text: 'Все товары сертифицированы, работаем только с проверенными производителями' },
                    { icon: 'Truck', title: 'Быстрая доставка', text: 'Доставка по городу за 2 часа, собственный автопарк' },
                    { icon: 'Headphones', title: 'Поддержка 24/7', text: 'Консультации специалистов в любое время' },
                    { icon: 'Percent', title: 'Выгодные цены', text: 'Прямые поставки от производителей, регулярные акции' },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/1b05f06a-af6d-445b-9c82-83581301a086.jpg"
                  alt="Наша команда"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-r from-primary to-orange-600 text-white">
            <div className="text-center">
              <Icon name="Award" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Сертификаты качества</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Вся продукция имеет необходимые сертификаты соответствия и паспорта качества. 
                Документы предоставляются по запросу.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">ISO 9001</div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">ГОСТ</div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">СНиП</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
