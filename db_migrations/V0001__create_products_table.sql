-- Создание таблицы товаров для интернет-магазина стройматериалов
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount INTEGER DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    article VARCHAR(50) UNIQUE NOT NULL,
    unit VARCHAR(50) NOT NULL,
    image_url TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_article ON products(article);
CREATE INDEX idx_products_in_stock ON products(in_stock);

-- Заполнение начальными данными
INSERT INTO products (name, description, price, discount, category, article, unit, image_url) VALUES
('Цемент М500', 'Портландцемент высшего качества для всех видов строительных работ', 450, 15, 'Цемент и смеси', 'CEM-500-50', '50 кг', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/b4bc2b5f-ad7a-4ca6-b0b2-fe73f6bc4be3.jpg'),
('Гипсокартон Кнауф 2500×1200×12.5мм', 'Стандартный гипсокартонный лист для внутренних работ', 320, 0, 'Гипсокартон', 'GKL-2500-125', 'лист', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/19fef83d-31ac-4c99-bbde-e0d43e0d2eb0.jpg'),
('Утеплитель Роквул 1000×600×50мм', 'Базальтовая теплоизоляция с высокими показателями', 680, 10, 'Утеплители', 'ROC-1000-50', 'упаковка', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/fbef52c9-a0d6-4f94-83f1-3e8d4a2c62c0.jpg'),
('Кирпич керамический М150', 'Полнотелый красный кирпич для несущих конструкций', 18, 0, 'Кирпич', 'KIR-M150-RD', 'шт', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/09a0ba73-33bf-462c-97d9-dcbecbe9e85c.jpg'),
('Профиль потолочный 60×27×3000мм', 'Оцинкованный профиль для монтажа подвесных потолков', 145, 0, 'Металлопрокат', 'PROF-60-3000', 'шт', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/94154de3-9e7f-48ff-95d9-3a4c18f48f28.jpg'),
('Краска акриловая белая 10л', 'Водно-дисперсионная краска для внутренних работ', 1450, 20, 'Краски и лаки', 'PAINT-ACR-10L', '10 литров', 'https://cdn.poehali.dev/projects/fec1f740-834b-426a-a00d-39e45304fd36/files/1b05f06a-af6d-445b-9c82-83581301a086.jpg');

-- Комментарии к таблице и столбцам
COMMENT ON TABLE products IS 'Каталог товаров интернет-магазина стройматериалов';
COMMENT ON COLUMN products.discount IS 'Процент скидки (0-100)';
COMMENT ON COLUMN products.article IS 'Уникальный артикул товара';
COMMENT ON COLUMN products.in_stock IS 'Наличие товара на складе';
