import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Calculator = () => {
  const [material, setMaterial] = useState('cement');
  const [area, setArea] = useState('');
  const [thickness, setThickness] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateMaterial = () => {
    const areaNum = parseFloat(area);
    const thicknessNum = parseFloat(thickness);

    if (!areaNum || !thicknessNum) return;

    let consumption = 0;
    let unit = '';
    let price = 0;

    switch (material) {
      case 'cement':
        consumption = (areaNum * thicknessNum * 1.5).toFixed(2);
        unit = 'кг цемента';
        price = Math.round(parseFloat(consumption) * 8.5);
        break;
      case 'drywall':
        consumption = Math.ceil(areaNum / 3);
        unit = 'листов гипсокартона';
        price = consumption * 320;
        break;
      case 'insulation':
        consumption = Math.ceil(areaNum / 5);
        unit = 'упаковок утеплителя';
        price = consumption * 890;
        break;
      case 'plaster':
        consumption = (areaNum * thicknessNum * 10).toFixed(2);
        unit = 'кг штукатурки';
        price = Math.round(parseFloat(consumption) * 12);
        break;
    }

    setResult({ consumption, unit, price });
  };

  return (
    <section className="py-16 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl mb-4">
              <Icon name="Calculator" size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Калькулятор расхода материалов
            </h1>
            <p className="text-lg text-muted-foreground">
              Точный расчёт необходимого количества материалов для вашего проекта
            </p>
          </div>

          <Card className="p-8 shadow-xl animate-scale-in">
            <Tabs defaultValue="cement" value={material} onValueChange={setMaterial}>
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cement">Цемент</TabsTrigger>
                <TabsTrigger value="drywall">Гипсокартон</TabsTrigger>
                <TabsTrigger value="insulation">Утеплитель</TabsTrigger>
                <TabsTrigger value="plaster">Штукатурка</TabsTrigger>
              </TabsList>

              <TabsContent value={material} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="area" className="text-base mb-2 flex items-center gap-2">
                      <Icon name="Maximize" size={18} />
                      Площадь (м²)
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Введите площадь"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="thickness" className="text-base mb-2 flex items-center gap-2">
                      <Icon name="Layers" size={18} />
                      {material === 'drywall' || material === 'insulation' ? 'Толщина (см)' : 'Толщина слоя (см)'}
                    </Label>
                    <Input
                      id="thickness"
                      type="number"
                      placeholder="Введите толщину"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateMaterial}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary"
                  size="lg"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  Рассчитать
                </Button>

                {result && (
                  <Card className="p-6 bg-gradient-to-br from-accent to-accent/50 border-primary/20 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckCircle" size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-secondary mb-3">Результат расчёта</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Необходимо:</span>
                            <span className="font-bold text-lg text-secondary">
                              {result.consumption} {result.unit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                            <span className="text-muted-foreground">Примерная стоимость:</span>
                            <span className="font-bold text-2xl text-primary">
                              {result.price.toLocaleString()} ₽
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          * Цена указана ориентировочно, точную стоимость уточняйте у менеджера
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-6 bg-muted/50">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Рекомендации по расчёту</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Добавьте 10-15% к результату для запаса материала</li>
                        <li>• Учитывайте особенности поверхности и способ нанесения</li>
                        <li>• При больших объёмах работ консультируйтесь со специалистом</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
