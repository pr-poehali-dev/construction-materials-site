import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Телефон</h3>
                    <a href="tel:+79991234567" className="text-primary hover:underline text-xl font-semibold block mb-1">
                      +7 (999) 123-45-67
                    </a>
                    <p className="text-sm text-muted-foreground">Звонки принимаются 24/7</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a href="mailto:info@stroymaterials.ru" className="text-primary hover:underline text-lg font-semibold block mb-1">
                      info@stroymaterials.ru
                    </a>
                    <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Адрес склада</h3>
                    <p className="text-secondary font-semibold mb-1">г. Москва, ул. Строительная, д. 15</p>
                    <p className="text-sm text-muted-foreground">Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-18:00</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Мессенджеры</h3>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">WhatsApp</Button>
                      <Button size="sm" variant="outline">Telegram</Button>
                      <Button size="sm" variant="outline">Viber</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 animate-fade-in">
              <h3 className="text-2xl font-bold text-secondary mb-6">Напишите нам</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="contact">Телефон или Email</Label>
                  <Input id="contact" placeholder="+7 (999) 123-45-67" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Расскажите, чем мы можем помочь"
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-secondary to-primary/20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Приезжайте к нам на склад</h3>
              <p className="text-white/90 mb-6 max-w-2xl">
                Вы можете посмотреть товары вживую, проконсультироваться со специалистами 
                и забрать покупку самостоятельно. При самовывозе действуют дополнительные скидки!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-secondary hover:bg-white/90">
                  <Icon name="Navigation" size={20} className="mr-2" />
                  Построить маршрут
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Забронировать визит
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
