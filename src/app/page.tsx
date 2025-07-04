import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { featuredStickers } from '@/lib/stickers-data';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-iridescent" />
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline">
            Welcome to <span className="text-iridescent">Rayo Stickers</span>
          </h1>
          <Sparkles className="h-8 w-8 text-iridescent" />
        </div>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Brighten up your life with our unique collection of iridescent and holographic stickers. Perfect for laptops, water bottles, and anything else that needs a touch of magic.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Link href="/stickers">
              Shop All Stickers <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link href="#featured">
              Featured Designs
            </Link>
          </Button>
        </div>
      </section>

      <section id="featured" className="mt-24">
        <h2 className="mb-8 text-center text-3xl font-bold font-headline">Featured Stickers</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredStickers.map((sticker) => (
            <Card key={sticker.id} className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <CardHeader className="p-0">
                <Image
                  src={sticker.imageUrl}
                  alt={sticker.name}
                  width={400}
                  height={400}
                  className="h-64 w-full object-cover"
                  data-ai-hint={sticker.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl font-headline">{sticker.name}</CardTitle>
                <p className="text-muted-foreground">{sticker.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-6 pt-0">
                <p className="text-2xl font-bold text-iridescent">${sticker.price.toFixed(2)}</p>
                <Button asChild variant="outline">
                  <Link href={`/stickers`}>View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
