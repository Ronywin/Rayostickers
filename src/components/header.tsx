'use client';

import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from './ui/input';

const Header = () => {
  const { cartItems, isCartLoaded } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/stickers?search=${searchTerm}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline">
          <Sparkles className="h-6 w-6 text-iridescent" />
          Rayo Stickers
        </Link>
        {pathname === '/stickers' && (
          <form onSubmit={handleSearch} className="flex-grow flex justify-center">
            <Input type="text" placeholder="Search stickers..." className="max-w-xs w-full px-3 py-2 border rounded-md text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </form>
        )}

        <nav className="flex items-center gap-1 sm:gap-2">

          <Button variant="ghost" asChild>
            <Link href="/stickers" className="font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Stickers
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact" className="font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </Button>
          <Button variant="ghost" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {isCartLoaded && itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
export default Header;
