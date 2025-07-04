import { Instagram, Sparkles, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-muted/50 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
          <Sparkles className="h-6 w-6 text-iridescent" />
          Rayo Stickers
        </Link>
        <p className="text-sm text-muted-foreground order-last sm:order-none">
          © {new Date().getFullYear()} Rayo Stickers. All rights reserved.
        </p>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="icon">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
