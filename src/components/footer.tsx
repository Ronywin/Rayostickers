import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-muted/50 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
          <Sparkles className="h-6 w-6 text-iridescent" />
          Rayo Stickers
        </Link>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rayo Stickers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
