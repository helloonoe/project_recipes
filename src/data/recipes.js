export const recipes = [
  {
    id: 'r1',
    title: 'Tostadas con aguacate',
    author: {
      name: 'Sofia',
      handle: '@sofia.brunch',
      bio: 'Brunch rapido y recetas con luz de manana.',
      avatar: '/media/avatar.jpg',
      followers: 824,
      following: 132
    },
    time: '10 min',
    difficulty: 'facil',
    mediaType: 'image',
    mediaSrc: '/media/food-1.jpg',
    gallery: ['/media/food-2.jpg', '/media/food-5.jpg'],
    summary: 'Desayuno rapido con grasas buenas y toque citrico.',
    ingredients: [
      { id: 'r1-i1', name: 'pan integral', amount: '2 rebanadas' },
      { id: 'r1-i2', name: 'aguacate', amount: '1 unidad' },
      { id: 'r1-i3', name: 'limon', amount: '1/2 unidad' },
      { id: 'r1-i4', name: 'aceite de oliva', amount: '1 cda' }
    ],
    steps: [
      'Tuesta el pan hasta que quede dorado.',
      'Machaca el aguacate con limon y una pizca de sal.',
      'Monta las tostadas y termina con aceite de oliva.'
    ],
    filters: {
      moment: 'desayuno',
      time: '10 min',
      diet: 'fitness',
      level: 'facil',
      main: 'huevo'
    }
  },
  {
    id: 'r2',
    title: 'Bowl mediterraneo',
    author: {
      name: 'Leo',
      handle: '@leo.med',
      bio: 'Cocina simple con sabor mediterraneo.',
      avatar: '/media/avatar.jpg',
      followers: 605,
      following: 88
    },
    time: '30 min',
    difficulty: 'medio',
    mediaType: 'image',
    mediaSrc: '/media/food-2.jpg',
    gallery: ['/media/food-1.jpg', '/media/food-4.jpg'],
    summary: 'Bowl fresco con quinoa, verduras y garbanzos.',
    ingredients: [
      { id: 'r2-i1', name: 'quinoa cocida', amount: '1 taza' },
      { id: 'r2-i2', name: 'tomates cherry', amount: '10 unidades' },
      { id: 'r2-i3', name: 'pepino', amount: '1/2 unidad' },
      { id: 'r2-i4', name: 'garbanzos', amount: '1/2 taza' }
    ],
    steps: [
      'Cocina la quinoa y deja templar.',
      'Corta el pepino y los tomates en mitades.',
      'Mezcla todo con garbanzos y un toque de aceite.'
    ],
    filters: {
      moment: 'comida',
      time: '30 min',
      diet: 'sin gluten',
      level: 'medio',
      main: 'legumbres'
    }
  },
  {
    id: 'r3',
    title: 'Pasta al limon',
    author: {
      name: 'Marta',
      handle: '@marta.pasta',
      bio: 'Pasta facil y noches tranquilas.',
      avatar: '/media/avatar.jpg',
      followers: 1120,
      following: 210
    },
    time: '30 min',
    difficulty: 'facil',
    mediaType: 'image',
    mediaSrc: '/media/food-3.jpg',
    gallery: ['/media/food-6.jpg', '/media/food-2.jpg'],
    summary: 'Pasta cremosa con limon y parmesano.',
    ingredients: [
      { id: 'r3-i1', name: 'pasta corta', amount: '200 g' },
      { id: 'r3-i2', name: 'limon', amount: '1 unidad' },
      { id: 'r3-i3', name: 'queso parmesano', amount: '40 g' },
      { id: 'r3-i4', name: 'mantequilla', amount: '1 cda' }
    ],
    steps: [
      'Cuece la pasta en agua con sal hasta al dente.',
      'Mezcla mantequilla, jugo de limon y parmesano.',
      'Incorpora la pasta y ajusta con un poco de agua de coccion.'
    ],
    filters: {
      moment: 'cena',
      time: '30 min',
      diet: 'low carb',
      level: 'facil',
      main: 'pasta'
    }
  },
  {
    id: 'r4',
    title: 'Ensalada fresca',
    author: {
      name: 'Ana',
      handle: '@ana.fresco',
      bio: 'Recetas verdes para todos los dias.',
      avatar: '/media/avatar.jpg',
      followers: 402,
      following: 64
    },
    time: '5 min',
    difficulty: 'facil',
    mediaType: 'video',
    mediaSrc: '/media/food-1.webm',
    poster: '/media/food-4.jpg',
    gallery: ['/media/food-5.jpg', '/media/food-2.jpg'],
    summary: 'Ensalada ligera con mix verde y aceite.',
    ingredients: [
      { id: 'r4-i1', name: 'mix verde', amount: '2 tazas' },
      { id: 'r4-i2', name: 'pepino', amount: '1/2 unidad' },
      { id: 'r4-i3', name: 'aceite de oliva', amount: '1 cda' },
      { id: 'r4-i4', name: 'sal marina', amount: '1 pizca' }
    ],
    steps: [
      'Lava y seca el mix verde.',
      'Corta el pepino en medias lunas.',
      'Mezcla con aceite y una pizca de sal.'
    ],
    filters: {
      moment: 'comida',
      time: '5 min',
      diet: 'vegano',
      level: 'facil',
      main: 'verduras'
    }
  },
  {
    id: 'r5',
    title: 'Wrap de pollo',
    author: {
      name: 'Diego',
      handle: '@diego.wraps',
      bio: 'Comida practica para semana movida.',
      avatar: '/media/avatar.jpg',
      followers: 910,
      following: 150
    },
    time: '30 min',
    difficulty: 'medio',
    mediaType: 'image',
    mediaSrc: '/media/food-4.jpg',
    gallery: ['/media/food-1.jpg', '/media/food-3.jpg'],
    summary: 'Wrap rapido con pollo asado y yogur griego.',
    ingredients: [
      { id: 'r5-i1', name: 'tortillas', amount: '2 unidades' },
      { id: 'r5-i2', name: 'pollo asado', amount: '150 g' },
      { id: 'r5-i3', name: 'lechuga', amount: '1 taza' },
      { id: 'r5-i4', name: 'yogur griego', amount: '2 cdas' }
    ],
    steps: [
      'Calienta las tortillas un minuto por lado.',
      'Mezcla pollo desmenuzado con yogur y sal.',
      'Rellena con lechuga y enrolla bien.'
    ],
    filters: {
      moment: 'cena',
      time: '30 min',
      diet: 'fitness',
      level: 'medio',
      main: 'pollo'
    }
  },
  {
    id: 'r6',
    title: 'Smoothie verde',
    author: {
      name: 'Nora',
      handle: '@nora.green',
      bio: 'Smoothies y snacks que suman.',
      avatar: '/media/avatar.jpg',
      followers: 734,
      following: 190
    },
    time: '5 min',
    difficulty: 'facil',
    mediaType: 'image',
    mediaSrc: '/media/food-5.jpg',
    gallery: ['/media/food-4.jpg', '/media/food-6.jpg'],
    summary: 'Batido energetico con espinaca y platano.',
    ingredients: [
      { id: 'r6-i1', name: 'espinaca', amount: '1 taza' },
      { id: 'r6-i2', name: 'platano', amount: '1 unidad' },
      { id: 'r6-i3', name: 'leche vegetal', amount: '200 ml' },
      { id: 'r6-i4', name: 'miel', amount: '1 cdita' }
    ],
    steps: [
      'Coloca todos los ingredientes en la licuadora.',
      'Procesa hasta lograr una textura suave.',
      'Sirve al momento y ajusta con hielo si quieres.'
    ],
    filters: {
      moment: 'snack',
      time: '5 min',
      diet: 'fitness',
      level: 'facil',
      main: 'verduras'
    }
  },
  {
    id: 'r7',
    title: 'Tortilla esponjosa',
    author: {
      name: 'Clara',
      handle: '@clara.huevos',
      bio: 'Desayunos suaves y cocina casera.',
      avatar: '/media/avatar.jpg',
      followers: 520,
      following: 98
    },
    time: '10 min',
    difficulty: 'facil',
    mediaType: 'video',
    mediaSrc: '/media/food-2.webm',
    poster: '/media/food-6.jpg',
    gallery: ['/media/food-2.jpg', '/media/food-5.jpg'],
    summary: 'Tortilla aireada con queso y leche.',
    ingredients: [
      { id: 'r7-i1', name: 'huevos', amount: '3 unidades' },
      { id: 'r7-i2', name: 'leche', amount: '2 cdas' },
      { id: 'r7-i3', name: 'queso rallado', amount: '30 g' },
      { id: 'r7-i4', name: 'sal', amount: '1 pizca' }
    ],
    steps: [
      'Bate huevos con leche, queso y sal.',
      'Cocina a fuego medio con tapa hasta cuajar.',
      'Dobla y sirve de inmediato.'
    ],
    filters: {
      moment: 'desayuno',
      time: '10 min',
      diet: 'sin gluten',
      level: 'facil',
      main: 'huevo'
    }
  },
  {
    id: 'r8',
    title: 'Mesa compartida',
    author: {
      name: 'Ravi',
      handle: '@ravi.cena',
      bio: 'Platos para compartir sin prisa.',
      avatar: '/media/avatar.jpg',
      followers: 388,
      following: 54
    },
    time: '1 h',
    difficulty: 'medio',
    mediaType: 'image',
    mediaSrc: '/media/food-6.jpg',
    gallery: ['/media/food-1.jpg', '/media/food-4.jpg'],
    summary: 'Mesa para compartir con verduras asadas.',
    ingredients: [
      { id: 'r8-i1', name: 'verduras asadas', amount: '2 tazas' },
      { id: 'r8-i2', name: 'pan rustico', amount: '1 unidad' },
      { id: 'r8-i3', name: 'aceite de oliva', amount: '2 cdas' },
      { id: 'r8-i4', name: 'hierbas frescas', amount: 'al gusto' }
    ],
    steps: [
      'Asa las verduras hasta que doren.',
      'Corta el pan rustico en rebanadas.',
      'Sirve todo con aceite y hierbas frescas.'
    ],
    filters: {
      moment: 'cena',
      time: '1 h',
      diet: 'sin gluten',
      level: 'medio',
      main: 'verduras'
    }
  },
  {
    id: 'r9',
    title: 'Cocina lenta',
    author: {
      name: 'Noelia',
      handle: '@noelia.cocina',
      bio: 'Cocina lenta, calma y sabor.',
      avatar: '/media/avatar.jpg',
      followers: 2140,
      following: 312
    },
    time: '2 h',
    difficulty: 'pro',
    mediaType: 'video',
    mediaSrc: '/media/food-3.webm',
    poster: '/media/food-3.jpg',
    gallery: ['/media/food-3.jpg', '/media/food-4.jpg'],
    summary: 'Caldo profundo para cocinar a fuego lento.',
    ingredients: [
      { id: 'r9-i1', name: 'caldo vegetal', amount: '1 l' },
      { id: 'r9-i2', name: 'zanahoria', amount: '2 unidades' },
      { id: 'r9-i3', name: 'apio', amount: '2 tallos' },
      { id: 'r9-i4', name: 'especias', amount: 'al gusto' }
    ],
    steps: [
      'Lleva el caldo a fuego suave con verduras.',
      'Cocina lento hasta que tome sabor.',
      'Ajusta con especias y sirve bien caliente.'
    ],
    filters: {
      moment: 'cena',
      time: '2 h',
      diet: 'sin gluten',
      level: 'pro',
      main: 'verduras'
    }
  }
]
