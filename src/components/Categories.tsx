import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CategoriesProps {
  onCategoryClick: () => void;
}

const Categories = ({ onCategoryClick }: CategoriesProps) => {
  const categories = [
    { icon: 'Box', name: 'Сухие смеси', count: '250+ товаров', color: 'from-orange-500 to-red-500' },
    { icon: 'Hammer', name: 'Цемент', count: '120+ товаров', color: 'from-blue-500 to-cyan-500' },
    { icon: 'Layers', name: 'Гипсокартон', count: '180+ товаров', color: 'from-green-500 to-emerald-500' },
    { icon: 'Wind', name: 'Утеплитель', count: '90+ товаров', color: 'from-purple-500 to-pink-500' },
    { icon: 'Wrench', name: 'Металлопрокат', count: '300+ товаров', color: 'from-yellow-500 to-orange-500' },
    { icon: 'PaintBucket', name: 'Краски и лаки', count: '200+ товаров', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Популярные категории
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 5000 наименований строительных материалов всегда в наличии на складе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={onCategoryClick}
            >
              <div className="p-8 relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={category.icon as any} size={32} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground">{category.count}</p>
                
                <div className="mt-4 flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Смотреть</span>
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
