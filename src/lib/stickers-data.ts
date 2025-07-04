import type { Sticker } from '@/types';

export const stickers: Sticker[] = [
  {
    id: '1',
    name: 'Sueño Cósmico',
    description: 'Un sticker holográfico de ensueño de un gato durmiendo en la luna.',
    price: 3.50,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'holographic cat'
  },
  {
    id: '2',
    name: 'Polilla de Cristal',
    description: 'Una polilla iridiscente con alas de cristal que brillan con la luz.',
    price: 4.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'iridescent moth'
  },
  {
    id: '3',
    name: 'Soda Galáctica',
    description: 'Un divertido sticker de una lata de refresco con una galaxia arremolinándose en su interior.',
    price: 3.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'galaxy soda'
  },
  {
    id: '4',
    name: 'Helecho de Aura',
    description: 'Una hermosa hoja de helecho con un aura brillante y colorida.',
    price: 3.25,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'aura leaf'
  },
  {
    id: '5',
    name: 'Poción de Prisma',
    description: 'Una botella de poción mágica que refleja un arcoíris de colores.',
    price: 4.50,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'prism potion'
  },
  {
    id: '6',
    name: 'Espada Brillante',
    description: 'Un sticker de una espada legendaria con una hoja iridiscente y encantadora.',
    price: 4.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'shimmering sword'
  },
];

export const featuredStickers: Sticker[] = stickers.slice(0, 3);
