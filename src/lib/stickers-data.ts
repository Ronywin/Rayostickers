import type { Sticker } from '@/types';

export const stickers: Sticker[] = [
  {
    id: '1',
    name: 'Cosmic Dream',
    description: 'A dreamy, holographic sticker of a cat napping on the moon.',
    price: 3.50,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'holographic cat'
  },
  {
    id: '2',
    name: 'Crystal Moth',
    description: 'An iridescent moth with crystal-like wings that shimmer in the light.',
    price: 4.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'iridescent moth'
  },
  {
    id: '3',
    name: 'Galactic Soda',
    description: 'A fun sticker of a soda can with a swirling galaxy inside.',
    price: 3.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'galaxy soda'
  },
  {
    id: '4',
    name: 'Aura Fern',
    description: 'A beautiful fern leaf with a shimmering, colorful aura.',
    price: 3.25,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'aura leaf'
  },
  {
    id: '5',
    name: 'Prism Potion',
    description: 'A magical potion bottle that reflects a rainbow of colors.',
    price: 4.50,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'prism potion'
  },
  {
    id: '6',
    name: 'Shimmering Sword',
    description: 'A legendary sword sticker with an enchanting, iridescent blade.',
    price: 4.00,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'shimmering sword'
  },
];

export const featuredStickers: Sticker[] = stickers.slice(0, 3);
