import { Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository';
import { Product, CategoryName } from '../shared/types';

@Injectable()
export class MockProductRepository implements IProductRepository {
  private products: Product[] = [
    {
      id: '1',
      sku: 'COLLAR-SEA-001',
      name: 'Ексклюзивний нашийник "Морський бриз"',
      description:
        'Пориньте у світ свіжості та елегантності з нашийником "Морський бриз". Цей аксесуар створений для котів, що люблять комфорт та вишуканий стиль. Виготовлений з посиленої нейлонової стропи преміум-класу, яка відштовхує вологу та бруд, зберігаючи насичений колір навіть після найактивніших ігор у саду чи на прогулянці. Особлива анатомічна форма запобігає натисканню на шкіру, забезпечуючи повну свободу рухів, а витончена декоративна стрічка додає образу легкості та розкоші.',
      category: 'Collars',
      basePrice: 230,
      images: ['https://placehold.co/400', 'https://placehold.co/400'],
      isSale: true,
      salePrice: 190,
      isNew: true,
      features: [
        {
          title: 'Ручна робота',
          description: 'Кожен стібок зроблений з любовю до ваших улюбленців.',
          icon: 'heart',
        },
        {
          title: 'Преміум фурнітура',
          description:
            'Лита металева фурнітура, що не іржавіє та не ламається.',
          icon: 'shield',
        },
        {
          title: 'Ідеальна посадка',
          description:
            'Регульований розмір дозволяє підібрати ідеальний обхват шиї.',
          icon: 'adjust',
        },
      ],
      variations: [
        {
          id: 'v1',
          width: '1.5 см',
          length: '15-25 см',
          hardware: 'Classic',
          neoprenePadding: false,
          price: 230,
          stock: 10,
        },
        {
          id: 'v2',
          width: '2.0 см',
          length: '20-30 см',
          hardware: 'Total Black',
          neoprenePadding: true,
          price: 280,
          stock: 5,
        },
      ],
    },
    {
      id: '2',
      sku: 'HARNESS-WOOD-001',
      name: 'Преміум-шлейка "Лісова казка"',
      description:
        'Відкрийте для вашого улюбленця магію природи з професійною H-подібною шлейкою "Лісова казка". Спеціально розроблена анатомічна форма рівномірно розподіляє навантаження по грудях та плечах, повністю виключаючи тиск на трахею та забезпечуючи максимальну безпеку. М\'яка підкладка з високоякісного неопрену діє як захисний бар\'єр, запобігаючи натиранню шерсті навіть під час найдовших та найактивніших дослідницьких прогулянок лісом.',
      category: 'Harnesses',
      basePrice: 450,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: false,
      features: [
        {
          title: 'Анатомічний дизайн',
          description:
            'Створено з урахуванням особливостей будови котячого тіла.',
          icon: 'lock',
        },
        {
          title: 'Максимальний комфорт',
          description: 'Не обмежує рухи лап та не створює тиску.',
          icon: 'style',
        },
        {
          title: 'Надійна фіксація',
          description:
            'Посилені шви гарантують, що ваш улюбленець не вислизне.',
          icon: 'shield',
        },
      ],
      variations: [
        {
          id: 'v3',
          width: '1.5 см',
          length: '20-30 см',
          hardware: 'Metallic',
          neoprenePadding: true,
          price: 450,
          stock: 8,
        },
        {
          id: 'v4',
          width: '2.0 см',
          length: '30-45 см',
          hardware: 'Rose Gold',
          neoprenePadding: true,
          price: 520,
          stock: 3,
        },
      ],
    },
    {
      id: '3',
      sku: 'LEASH-NIGHT-001',
      name: 'Світловідбиваючий повідок "Місячне світло"',
      description:
        'Безпека вашого кота — наш пріоритет. Повідок "Місячне світло" оснащений інтегрованими світловідбиваючими елементами нового покоління, які роблять тварину помітною для водіїв та пішоходів у темну пору доби. Виконаний з надміцного матеріалу, що стійкий до розривів. Ергономічна ручка-петля забезпечує комфортний та надійний хват для власника, що дозволяє впевнено контролювати ситуацію навіть при різких рухах активного улюбленця.',
      category: 'Leashes',
      basePrice: 300,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: true,
      features: [
        {
          title: 'Безпека 24/7',
          description: 'Світловідбивна стрічка для прогулянок у вечірній час.',
          icon: 'leaf',
        },
        {
          title: 'Зносостійкість',
          description: 'Матеріал стійкий до розривів та забруднень.',
          icon: 'shield',
        },
        {
          title: 'Екологічний підхід',
          description: 'Використання гіпоалергенних матеріалів.',
          icon: 'heart',
        },
      ],
      variations: [
        {
          id: 'v5',
          width: '1.5 см',
          length: '150 см',
          hardware: 'Total Black',
          neoprenePadding: false,
          price: 300,
          stock: 15,
        },
      ],
    },
    {
      id: '4',
      sku: 'COLLAR-GOLD-002',
      name: 'Аристократичний нашийник "Королівське золото"',
      description:
        "Створений для справжніх королів домашнього затишку. Поєднання глибокого золотого відтінку та преміального нейлону створює образ бездоганного стилю та статусу. Цей аксесуар не лише підкреслює благородство вашого кота, а й забезпечує абсолютний комфорт завдяки м'якій внутрішній підкладці з натурального велюру, що ніжньо торкається шкіри, не викликаючи подразнень.",
      category: 'Collars',
      basePrice: 280,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: true,
      features: [
        {
          title: 'Елітний стиль',
          description: 'Золота фурнітура, що не тьмяніє з часом.',
          icon: 'style',
        },
        {
          title: "М'якість",
          description: 'Внутрішній шар з велюру для найніжнішої шкіри.',
          icon: 'heart',
        },
      ],
      variations: [
        {
          id: 'v6',
          width: '1.0 см',
          length: '15-25 см',
          hardware: 'Gold',
          neoprenePadding: true,
          price: 280,
          stock: 12,
        },
      ],
    },
    {
      id: '5',
      sku: 'HARNESS-PINK-002',
      name: 'Елегантна шлейка "Рожевий кварц"',
      description:
        'Справжня ніжність у кожній деталі. Ідеальний вибір для витончених та граціозних котів. Поєднання пастельних відтінків рожевого кварцу та надміцних сучасних матеріалів робить цю шлейку одночасно естетичною та максимально функціональною. Вона ідеально підходить як для святкових виходів, так і для щоденних прогулянок, забезпечуючи надійну фіксацію без обмеження природних рухів.',
      category: 'Harnesses',
      basePrice: 480,
      images: ['https://placehold.co/400'],
      isSale: true,
      salePrice: 420,
      isNew: false,
      features: [
        {
          title: 'Ніжний колір',
          description:
            'Спеціальний відтінок, що підходить під будь-яку шерсть.',
          icon: 'style',
        },
        {
          title: 'Безпечний замок',
          description: 'Надійна застібка, що не відкривається випадково.',
          icon: 'lock',
        },
      ],
      variations: [
        {
          id: 'v7',
          width: '1.0 см',
          length: '20-30 см',
          hardware: 'Silver',
          neoprenePadding: true,
          price: 480,
          stock: 7,
        },
      ],
    },
    {
      id: '6',
      sku: 'LEASH-RED-002',
      name: 'Спортивний повідок "Червона пристрасть"',
      description:
        'Яскравий та енергійний акцент для сміливих особистостей. Повідок виготовлений з посиленого багатошарового плетеного нейлону, який витримує значні динамічні навантаження, що робить його незамінним для активних котів, що люблять бігати та досліджувати світ. Насичений червоний колір стійкий до вигорання на сонці, а ергономічний дизайн гарантує комфорт як для тварини, так і для власника.',
      category: 'Leashes',
      basePrice: 320,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: false,
      features: [
        {
          title: 'Міцність',
          description: 'Подвійне плетіння для максимальної надійності.',
          icon: 'shield',
        },
        {
          title: 'Яскравий дизайн',
          description: 'Насичений колір, що не вигорає на сонці.',
          icon: 'style',
        },
      ],
      variations: [
        {
          id: 'v8',
          width: '1.0 см',
          length: '200 см',
          hardware: 'Total Black',
          neoprenePadding: false,
          price: 320,
          stock: 20,
        },
      ],
    },
    {
      id: '7',
      sku: 'SET-LUXE-001',
      name: 'Люксовий комплект "Елітний чорний"',
      description:
        'Повний набір аксесуарів для справжнього джентльмена: нашийник, шлейка та повідок, виконані в ідеальній гармонії. Глибокий чорний колір у поєднанні з преміальною матовою фурнітурою створює образ стриманої розкоші та бездоганного смаку. Використання гіпоалергенних матеріалів високої щільності гарантує довговічність та комфорт, роблячи цей комплект найкращим вибором для тих, хто цінує якість у кожній деталі.',
      category: 'Sets',
      basePrice: 950,
      images: ['https://placehold.co/400'],
      isSale: true,
      salePrice: 850,
      isNew: true,
      features: [
        {
          title: 'Повний набір',
          description: 'Все необхідне для прогулянок в одному комплекті.',
          icon: 'gift',
        },
        {
          title: 'Матова фурнітура',
          description: 'Сучасний дизайн та висока стійкість до подряпин.',
          icon: 'style',
        },
      ],
      variations: [
        {
          id: 'v9',
          width: '1.5 см',
          length: 'M',
          hardware: 'Matte Black',
          neoprenePadding: true,
          price: 950,
          stock: 5,
        },
      ],
    },
    {
      id: '8',
      sku: 'COLLAR-BLUE-003',
      name: 'Витончений нашийник "Сапфірове небо"',
      description:
        'Глибокий, насичений синій колір, що символізує спокій, впевненість та благородство. Нашийник виготовлений з інноваційних гіпоалергенних матеріалів, які не викликають подразнень навіть на найчутливішій шкірі кота. Завдяки поєднанню легкості та міцності, цей аксесуар стає ідеальним вибором для щоденного носіння, додаючи образу вашого улюбленця особливої вишуканості.',
      category: 'Collars',
      basePrice: 240,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: false,
      features: [
        {
          title: 'Гіпоалергенність',
          description: 'Безпечні матеріали для чутливої шкіри.',
          icon: 'leaf',
        },
        {
          title: 'Стильний відтінок',
          description:
            'Насичений синій колір, що пасує котам будь-якого кольору.',
          icon: 'style',
        },
      ],
      variations: [
        {
          id: 'v10',
          width: '1.5 см',
          length: '15-25 см',
          hardware: 'Silver',
          neoprenePadding: false,
          price: 240,
          stock: 15,
        },
      ],
    },
    {
      id: '9',
      sku: 'HARNESS-GREY-003',
      name: 'Мінімалістична шлейка "Міський туман"',
      description:
        'Втілення сучасного міського стилю та функціональності. Стриманий сірий колір ідеально гармоніює з будь-яким міським ландшафтом та кольором шерсті. Шлейка спроектована так, щоб забезпечити максимальний контроль над твариною під час прогулянок у багатолюдних місцях, при цьому повністю зберігаючи природну свободу рухів та комфорт вашого кота.',
      category: 'Harnesses',
      basePrice: 460,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: true,
      features: [
        {
          title: 'Універсальність',
          description: 'Пасує до будь-якого повідка та аксесуара.',
          icon: 'adjust',
        },
        {
          title: 'Легкість',
          description: 'Мінімальна вага при максимальній міцності.',
          icon: 'shield',
        },
      ],
      variations: [
        {
          id: 'v11',
          width: '1.5 см',
          length: '20-30 см',
          hardware: 'Total Black',
          neoprenePadding: true,
          price: 460,
          stock: 10,
        },
      ],
    },
    {
      id: '10',
      sku: 'LEASH-GREEN-003',
      name: 'Натуральний повідок "Смарагдовий ліс"',
      description:
        'Повернення до гармонії з природою. Насичений смарагдово-зелений колір та надміцна основа роблять цей повідок ідеальним супутником для активних подорожей парками та лісами. Спеціальне плетіння матеріалу запобігає розтягуванню та забезпечує максимальну надійність, щоб ви могли насолоджуватися кожною хвилиною прогулянки, знаючи, що ваш улюбленець у безпеці.',
      category: 'Leashes',
      basePrice: 310,
      images: ['https://placehold.co/400'],
      isSale: true,
      salePrice: 270,
      isNew: false,
      features: [
        {
          title: 'Природний стиль',
          description: 'Гармонійний колір для прогулянок на природі.',
          icon: 'leaf',
        },
        {
          title: 'Посилена основа',
          description: 'Спеціальне плетіння, що запобігає розтягуванню.',
          icon: 'shield',
        },
      ],
      variations: [
        {
          id: 'v12',
          width: '1.5 см',
          length: '150 см',
          hardware: 'Metallic',
          neoprenePadding: false,
          price: 310,
          stock: 12,
        },
      ],
    },
    {
      id: '11',
      sku: 'COLLAR-PURP-004',
      name: 'Загадковий нашийник "Аметистове сяйво"',
      description:
        'Поєднання містики та розкоші у глибоких фіолетових тонах. Цей нашийник створений для котів з особливим характером та витонченим смаком. Використання інноваційних брудовідштовхувальних тканин дозволяє аксесуару зберігати свій первісний вигляд та насичений колір набагато довше, навіть при активному використанні, що робить його ідеальним поєднанням краси та практичності.',
      category: 'Collars',
      basePrice: 260,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: true,
      features: [
        {
          title: 'Брудовідштовхувальна тканина',
          description: 'Легко чиститься та довго зберігає вигляд.',
          icon: 'shield',
        },
        {
          title: 'Унікальний колір',
          description: 'Глибокий фіолетовий відтінок.',
          icon: 'style',
        },
      ],
      variations: [
        {
          id: 'v13',
          width: '1.0 см',
          length: '15-25 см',
          hardware: 'Silver',
          neoprenePadding: false,
          price: 260,
          stock: 8,
        },
      ],
    },
    {
      id: '12',
      sku: 'HARNESS-ORNG-004',
      name: 'Яскрава шлейка "Сонячний цитрус"',
      description:
        "Енергія, радість та безпека у кожному русі. Соковитий помаранчевий колір забезпечує максимальну видимість кота в будь-яких умовах, що є критично важливим фактором безпеки під час прогулянок у місті. Продумана анатомічна форма з м'якими підкладками запобігає натисканню на пахви, дозволяючи вашому улюбленцю почуватися вільно та комфортно протягом усього дня.",
      category: 'Harnesses',
      basePrice: 470,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: false,
      features: [
        {
          title: 'Висока видимість',
          description: 'Яскравий колір для безпеки на дорозі.',
          icon: 'lock',
        },
        {
          title: 'Комфортний крій',
          description: 'Спеціальний вигин для свободи рухів.',
          icon: 'adjust',
        },
      ],
      variations: [
        {
          id: 'v14',
          width: '1.5 см',
          length: '20-30 см',
          hardware: 'Total Black',
          neoprenePadding: true,
          price: 470,
          stock: 6,
        },
      ],
    },
    {
      id: '13',
      sku: 'LEASH-WHITE-004',
      name: 'Чистий повідок "Сніжний пік"',
      description:
        'Символ чистоти, легкості та бездоганної елегантності. Сніжно-білий повідок з посиленою основою створює цілісний та вишуканий образ, особливо в поєднанні зі світлими порід котів. Використання преміальних матеріалів гарантує високу зносостійкість, а лаконічний дизайн підкреслює природну красу вашого улюбленця, роблячи кожну прогулянку особливою подією.',
      category: 'Leashes',
      basePrice: 330,
      images: ['https://placehold.co/400'],
      isSale: true,
      salePrice: 290,
      isNew: true,
      features: [
        {
          title: 'Елегантний вигляд',
          description: 'Сніжно-білий колір для особливих образів.',
          icon: 'style',
        },
        {
          title: 'Міцна основа',
          description: 'Витримує навіть найактивніших стрибків.',
          icon: 'shield',
        },
      ],
      variations: [
        {
          id: 'v15',
          width: '1.5 см',
          length: '150 см',
          hardware: 'Silver',
          neoprenePadding: false,
          price: 330,
          stock: 11,
        },
      ],
    },
    {
      id: '14',
      sku: 'SET-COZY-002',
      name: 'Затишний комплект "Вечірній релакс"',
      description:
        "Ідеальне поєднання м'якості, тепла та безкомпромісної надійності. Комплект у ніжних бежевих тонах створює атмосферу затишку та спокою. Це найкращий вибір для повільних та розслаблених прогулянок у прохолодну погоду, коли важливо забезпечити коту максимальний комфорт. Висока якість пошиття та увага до деталей роблять цей набір улюбленим як для власника, так і для кота.",
      category: 'Sets',
      basePrice: 880,
      images: ['https://placehold.co/400'],
      isSale: false,
      isNew: false,
      features: [
        {
          title: 'Тепла палітра',
          description: 'Бежеві відтінки для створення затишку.',
          icon: 'heart',
        },
        {
          title: 'Повний комплект',
          description: 'Нашийник, шлейка та повідок у єдиному стилі.',
          icon: 'gift',
        },
      ],
      variations: [
        {
          id: 'v16',
          width: '1.5 см',
          length: 'S',
          hardware: 'Classic',
          neoprenePadding: true,
          price: 880,
          stock: 4,
        },
      ],
    },
    {
      id: '15',
      sku: 'COLLAR-VIO-005',
      name: 'Ніжний нашийник "Квітковий сад"',
      description:
        'Відчуйте подих весни в кожній деталі з нашийником "Квітковий сад". Ніжний квітковий принт додає образу жіночності, легкості та романтизму. Виготовлений з гіпоалергенного нейлону преміум-класу з м\'якою внутрішньою підкладкою, що гарантує відсутність подразнень. Цей аксесуар перетворює звичайну прогулянку на справжній парад краси та витонченості.',
      category: 'Collars',
      basePrice: 250,
      images: ['https://placehold.co/400'],
      isSale: true,
      salePrice: 210,
      isNew: true,
      features: [
        {
          title: 'Унікальний принт',
          description: 'Ексклюзивний квітковий дизайн.',
          icon: 'style',
        },
        {
          title: 'Комфорт',
          description: "М'яка внутрішня частина не дряпає шкіру.",
          icon: 'heart',
        },
      ],
      variations: [
        {
          id: 'v17',
          width: '1.0 см',
          length: '15-25 см',
          hardware: 'Silver',
          neoprenePadding: false,
          price: 250,
          stock: 13,
        },
      ],
    },
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async findByCategory(category: CategoryName): Promise<Product[]> {
    return this.products.filter((p) => p.category === category);
  }

  async search(query: string): Promise<Product[]> {
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
 
  async create(product: Partial<Product>): Promise<Product> {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      sku: product.sku || `PROD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      name: product.name || 'New Product',
      description: product.description || '',
      category: product.category || 'Collars',
      basePrice: product.basePrice || 0,
      images: product.images || [],
      isSale: product.isSale || false,
      salePrice: product.salePrice || 0,
      isNew: product.isNew || false,
      features: product.features || [],
      variations: product.variations || [],
      material: product.material || '',
      countryOfOrigin: product.countryOfOrigin || '',
      sizeChart: product.sizeChart || '',
      additionalInfo: product.additionalInfo || '',
    };
    this.products.push(newProduct);
    return newProduct;
  }
 
  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }
 
  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
