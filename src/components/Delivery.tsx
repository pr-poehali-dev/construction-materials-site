import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Delivery = () => {
  return (
    <section className="py-16 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl mb-4">
              <Icon name="Truck" size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Доставка и оплата</h1>
            <p className="text-lg text-muted-foreground">
              Доставим ваш заказ быстро и в сохранности
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 animate-scale-in">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Zap" size={28} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Экспресс-доставка</h3>
              <Badge className="mb-4 bg-green-600">2 часа</Badge>
              <p className="text-muted-foreground mb-4">
                Срочная доставка по городу в течение 2 часов после оформления заказа
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">До 500 кг</span>
                  <span className="font-semibold">1 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">От 500 кг</span>
                  <span className="font-semibold">1 500 ₽</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Calendar" size={28} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Плановая доставка</h3>
              <Badge className="mb-4 bg-blue-600">На выбор</Badge>
              <p className="text-muted-foreground mb-4">
                Доставка в удобное для вас время на следующий день или позже
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">До 1000 кг</span>
                  <span className="font-semibold">500 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">От 1000 кг</span>
                  <span className="font-semibold text-green-600">Бесплатно</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-accent/50 to-accent/20 border-primary/20 animate-fade-in">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <Icon name="MapPin" size={28} className="text-primary" />
              Зоны доставки
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">Зона 1</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">В пределах МКАД</p>
                <p className="text-primary font-bold">От 500 ₽</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold">Зона 2</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">До 30 км от МКАД</p>
                <p className="text-primary font-bold">От 1 000 ₽</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-semibold">Зона 3</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Свыше 30 км от МКАД</p>
                <p className="text-primary font-bold">По договорённости</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 animate-fade-in">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <Icon name="CreditCard" size={28} className="text-primary" />
              Способы оплаты
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'Banknote', title: 'Наличными', text: 'Оплата курьеру при получении заказа' },
                { icon: 'CreditCard', title: 'Картой онлайн', text: 'Visa, MasterCard, МИР на сайте' },
                { icon: 'Building2', title: 'Безналичный расчёт', text: 'Для юридических лиц по договору' },
                { icon: 'Smartphone', title: 'СБП', text: 'Система быстрых платежей' },
              ].map((method, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={method.icon as any} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{method.title}</h4>
                    <p className="text-sm text-muted-foreground">{method.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200 mt-12">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={24} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Важная информация</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Бесплатная доставка при заказе от 5 000 ₽</li>
                  <li>• Разгрузка материалов входит в стоимость доставки</li>
                  <li>• Подъём на этаж оплачивается отдельно</li>
                  <li>• Возможна доставка в выходные и праздничные дни</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
