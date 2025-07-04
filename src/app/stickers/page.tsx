'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { stickers } from '@/lib/stickers-data';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';

export default function StickersPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');

  // Filter stickers based on search term
  const filteredStickers = searchTerm
    ? stickers.filter(
        (sticker) =>
          sticker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sticker.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : stickers;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">

          Nuestra Colección de Stickers
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Encuentra el sticker perfecto para expresarte. De alta calidad, duraderos y deslumbrantemente hermosos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {filteredStickers.map((sticker) => (
          <Card key={sticker.id} className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="p-0 border-b">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={sticker.imageUrl}
                  alt={sticker.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={sticker.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold font-headline">{sticker.name}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{sticker.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <p className="text-xl font-bold text-iridescent">${sticker.price.toFixed(2)}</p>
              <Button size="sm" onClick={() => addToCart(sticker)} className="font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90 transition-opacity">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
