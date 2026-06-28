import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { ProductDocument, ProductSchema } from './schemas/product.schema';
import { OrderDocument, OrderSchema } from './schemas/order.schema';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB for seeding...');

    const User = mongoose.model(UserDocument.name, UserSchema);
    const Product = mongoose.model(ProductDocument.name, ProductSchema);
    const Order = mongoose.model(OrderDocument.name, OrderSchema);

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data...');

    // Seed Users
    const users = [
      {
        email: 'admin@whiskersbows.ua',
        password: 'adminpassword',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+380000000000',
        role: 'ADMIN',
        address: { city: 'Kyiv', novaPoshtaBranch: '1' },
      },
      {
        email: 'user@example.com',
        password: 'password123',
        firstName: 'Regular',
        lastName: 'User',
        phone: '+380111111111',
        role: 'CUSTOMER',
        address: { city: 'Lviv', novaPoshtaBranch: '2' },
      },
    ];
    await User.insertMany(users);
    console.log('Users seeded...');

    // Seed Products (extracted from MockProductRepository)
    const products = [
      {
        sku: 'COLLAR-SEA-001',
        name: 'Ексклюзивний нашийник "Морський бриз"',
        description: 'Пориньте у світ свіжості та елегантності з нашийником "Морський бриз"...',
        category: 'Collars',
        basePrice: 230,
        images: ['https://placehold.co/400', 'https://placehold.co/400'],
        isSale: true,
        salePrice: 190,
        isNew: true,
        features: [
          { title: 'Ручна робота', description: 'Кожен стібок зроблений з любовю до ваших улюбленців.', icon: 'heart' },
          { title: 'Преміум фурнітура', description: 'Лита металева фурнітура, що не іржавіє та не ламається.', icon: 'shield' },
          { title: 'Ідеальна посадка', description: 'Регульований розмір дозволяє підібрати ідеальний обхват шиї.', icon: 'adjust' },
        ],
        variations: [
          { id: 'v1', width: '1.5 см', length: '15-25 см', hardware: 'Classic', neoprenePadding: false, price: 230, stock: 10 },
          { id: 'v2', width: '2.0 см', length: '20-30 см', hardware: 'Total Black', neoprenePadding: true, price: 280, stock: 5 },
        ],
      },
      {
        sku: 'HARNESS-WOOD-001',
        name: 'Преміум-шлейка "Лісова казка"',
        description: 'Відкрийте для вашого улюбленця магію природи з професійною H-подібною шлейкою "Лісова казка"...',
        category: 'Harnesses',
        basePrice: 450,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: false,
        features: [
          { title: 'Анатомічний дизайн', description: 'Створено з урахуванням особливостей будови котячого тіла.', icon: 'lock' },
          { title: 'Максимальний комфорт', description: 'Не обмежує рухи лап та не створює тиску.', icon: 'style' },
          { title: 'Надійна фіксація', description: 'Посилені шви гарантують, що ваш улюбленець не вислизне.', icon: 'shield' },
        ],
        variations: [
          { id: 'v3', width: '1.5 см', length: '20-30 см', hardware: 'Metallic', neoprenePadding: true, price: 450, stock: 8 },
          { id: 'v4', width: '2.0 см', length: '30-45 см', hardware: 'Rose Gold', neoprenePadding: true, price: 520, stock: 3 },
        ],
      },
      {
        sku: 'LEASH-NIGHT-001',
        name: 'Світловідбиваючий повідок "Місячне світло"',
        description: 'Безпека вашого кота — наш пріоритет...',
        category: 'Leashes',
        basePrice: 300,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: true,
        features: [
          { title: 'Безпека 24/7', description: 'Світловідбивна стрічка для прогулянок у вечірній час.', icon: 'leaf' },
          { title: 'Зносостійкість', description: 'Матеріал стійкий до розривів та забруднень.', icon: 'shield' },
          { title: 'Екологічний підхід', description: 'Використання гіпоалергенних матеріалів.', icon: 'heart' },
        ],
        variations: [
          { id: 'v5', width: '1.5 см', length: '150 см', hardware: 'Total Black', neoprenePadding: false, price: 300, stock: 15 },
        ],
      },
      {
        sku: 'COLLAR-GOLD-002',
        name: 'Аристократичний нашийник "Королівське золото"',
        description: 'Створений для справжніх королів...',
        category: 'Collars',
        basePrice: 280,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: true,
        features: [
          { title: 'Елітний стиль', description: 'Золота фурнітура, що не тьмяніє з часом.', icon: 'style' },
          { title: 'М\'якість', description: 'Внутрішній шар з велюру для найніжнішої шкіри.', icon: 'heart' },
        ],
        variations: [
          { id: 'v6', width: '1.0 см', length: '15-25 см', hardware: 'Gold', neoprenePadding: true, price: 280, stock: 12 },
        ],
      },
      {
        sku: 'HARNESS-PINK-002',
        name: 'Елегантна шлейка "Рожевий кварц"',
        description: 'Справжня ніжність у кожній деталі...',
        category: 'Harnesses',
        basePrice: 480,
        images: ['https://placehold.co/400'],
        isSale: true,
        salePrice: 420,
        isNew: false,
        features: [
          { title: 'Ніжний колір', description: 'Спеціальний відтінок, що підходить під будь-яку шерсть.', icon: 'style' },
          { title: 'Безпечний замок', description: 'Надійна застібка, що не відкривається випадково.', icon: 'lock' },
        ],
        variations: [
          { id: 'v7', width: '1.0 см', length: '20-30 см', hardware: 'Silver', neoprenePadding: true, price: 480, stock: 7 },
        ],
      },
      {
        sku: 'LEASH-RED-002',
        name: 'Спортивний повідок "Червона пристрасть"',
        description: 'Яскравий та енергійний акцент для сміливих особистостей...',
        category: 'Leashes',
        basePrice: 320,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: false,
        features: [
          { title: 'Міцність', description: 'Подвійне плетіння для максимальної надійності.', icon: 'shield' },
          { title: 'Яскравий дизайн', description: 'Насичений червоний колір, що не вигорає на сонці.', icon: 'style' },
        ],
        variations: [
          { id: 'v8', width: '1.0 см', length: '200 см', hardware: 'Total Black', neoprenePadding: false, price: 320, stock: 20 },
        ],
      },
      {
        sku: 'SET-LUXE-001',
        name: 'Люксовий комплект "Елітний чорний"',
        description: 'Повний набір аксесуарів для справжнього джентльмена...',
        category: 'Sets',
        basePrice: 950,
        images: ['https://placehold.co/400'],
        isSale: true,
        salePrice: 850,
        isNew: true,
        features: [
          { title: 'Повний набір', description: 'Все необхідне для прогулянок в одному комплекті.', icon: 'gift' },
          { title: 'Матова фурнітура', description: 'Сучасний дизайн та висока стійкість до подряпин.', icon: 'style' },
        ],
        variations: [
          { id: 'v9', width: '1.5 см', length: 'M', hardware: 'Matte Black', neoprenePadding: true, price: 950, stock: 5 },
        ],
      },
      {
        sku: 'COLLAR-BLUE-003',
        name: 'Витончений нашийник "Сапфірове небо"',
        description: 'Глибокий, насичений синій колір...',
        category: 'Collars',
        basePrice: 240,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: false,
        features: [
          { title: 'Гіпоалергенність', description: 'Безпечні матеріали для чутливої шкіри.', icon: 'leaf' },
          { title: 'Стильний відтінок', description: 'Насичений синій колір, що пасує котам будь-якого кольору.', icon: 'style' },
        ],
        variations: [
          { id: 'v10', width: '1.5 см', length: '15-25 см', hardware: 'Silver', neoprenePadding: false, price: 240, stock: 15 },
        ],
      },
      {
        sku: 'HARNESS-GREY-003',
        name: 'Мінімалістична шлейка "Міський туман"',
        description: 'Втілення сучасного міського стилю та функціональності...',
        category: 'Harnesses',
        basePrice: 460,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: true,
        features: [
          { title: 'Універсальність', description: 'Пасує до будь-якого повідка та аксесуара.', icon: 'adjust' },
          { title: 'Легкість', description: 'Мінімальна вага при максимальній міцності.', icon: 'shield' },
        ],
        variations: [
          { id: 'v11', width: '1.5 см', length: '20-30 см', hardware: 'Total Black', neoprenePadding: true, price: 460, stock: 10 },
        ],
      },
      {
        sku: 'LEASH-GREEN-003',
        name: 'Натуральний повідок "Смарагдовий ліс"',
        description: 'Повернення до гармонії з природою...',
        category: 'Leashes',
        basePrice: 310,
        images: ['https://placehold.co/400'],
        isSale: true,
        salePrice: 270,
        isNew: false,
        features: [
          { title: 'Природний стиль', description: 'Гармонійний колір для прогулянок на природі.', icon: 'leaf' },
          { title: 'Посилена основа', description: 'Спеціальне плетіння, що запобігає розтягуванню.', icon: 'shield' },
        ],
        variations: [
          { id: 'v12', width: '1.5 см', length: '150 см', hardware: 'Metallic', neoprenePadding: false, price: 310, stock: 12 },
        ],
      },
      {
        sku: 'COLLAR-PURP-004',
        name: 'Загадковий нашийник "Аметистове сяйво"',
        description: 'Поєднання містики та розкоші у глибоких фіолетових тонах...',
        category: 'Collars',
        basePrice: 260,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: true,
        features: [
          { title: 'Брудовідштовхувальна тканина', description: 'Легко чиститься та довго зберігає вигляд.', icon: 'shield' },
          { title: 'Унікальний колір', description: 'Глибокий фіолетовий відтінок.', icon: 'style' },
        ],
        variations: [
          { id: 'v13', width: '1.0 см', length: '15-25 см', hardware: 'Silver', neoprenePadding: false, price: 260, stock: 8 },
        ],
      },
      {
        sku: 'HARNESS-ORNG-004',
        name: 'Яскрава шлейка "Сонячний цитрус"',
        description: 'Енергія, радість та безпека у кожному русі...',
        category: 'Harnesses',
        basePrice: 470,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: false,
        features: [
          { title: 'Висока видимість', description: 'Яскравий колір для безпеки на дорозі.', icon: 'lock' },
          { title: 'Комфортний крій', description: 'Спеціальний вигин для свободи рухів.', icon: 'adjust' },
        ],
        variations: [
          { id: 'v14', width: '1.5 см', length: '20-30 см', hardware: 'Total Black', neoprenePadding: true, price: 470, stock: 6 },
        ],
      },
      {
        sku: 'LEASH-WHITE-004',
        name: 'Чистий повідок "Сніжний пік"',
        description: 'Символ чистоти, легкості та бездоганної елегантності...',
        category: 'Leashes',
        basePrice: 330,
        images: ['https://placehold.co/400'],
        isSale: true,
        salePrice: 290,
        isNew: true,
        features: [
          { title: 'Елегантний вигляд', description: 'Сніжно-білий колір для особливих образів.', icon: 'style' },
          { title: 'Міцна основа', description: 'Витримує навіть найактивніших стрибків.', icon: 'shield' },
        ],
        variations: [
          { id: 'v15', width: '1.5 см', length: '150 см', hardware: 'Silver', neoprenePadding: false, price: 330, stock: 11 },
        ],
      },
      {
        sku: 'SET-COZY-002',
        name: 'Затишний комплект "Вечірній релакс"',
        description: 'Ідеальне поєднання м\'якості, тепла та безкомпромісної надійності...',
        category: 'Sets',
        basePrice: 880,
        images: ['https://placehold.co/400'],
        isSale: false,
        isNew: false,
        features: [
          { title: 'Тепла палітра', description: 'Бежеві відтінки для створення затишку.', icon: 'heart' },
          { title: 'Повний комплект', description: 'Нашийник, шлейка та повідок у єдиному стилі.', icon: 'gift' },
        ],
        variations: [
          { id: 'v16', width: '1.5 см', length: 'S', hardware: 'Classic', neoprenePadding: true, price: 880, stock: 4 },
        ],
      },
      {
        sku: 'COLLAR-VIO-005',
        name: 'Ніжний нашийник "Квітковий сад"',
        description: 'Відчуйте подих весни в кожній деталі...',
        category: 'Collars',
        basePrice: 250,
        images: ['https://placehold.co/400'],
        isSale: true,
        salePrice: 210,
        isNew: true,
        features: [
          { title: 'Унікальний принт', description: 'Ексклюзивний квітковий дизайн.', icon: 'style' },
          { title: 'Комфорт', description: 'М\'яка внутрішня частина не дряпає шкіру.', icon: 'heart' },
        ],
        variations: [
          { id: 'v17', width: '1.0 см', length: '15-25 см', hardware: 'Silver', neoprenePadding: false, price: 250, stock: 13 },
        ],
      },
    ];
    await Product.insertMany(products);
    console.log('Products seeded...');

    await mongoose.disconnect();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
