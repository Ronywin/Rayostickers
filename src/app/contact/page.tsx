import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Mail, MessageCircle, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline">
          Ponte en Contacto
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          ¡Nos encantaría saber de ti! Si tienes una pregunta, una sugerencia o simplemente quieres saludar, aquí te decimos cómo puedes contactarnos.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="text-center shadow-lg transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-headline">Correo Electrónico</CardTitle>
            <p className="mt-2 text-muted-foreground">
              Para soporte, preguntas y colaboraciones.
            </p>
            <Button asChild variant="link" className="mt-4 text-lg text-iridescent">
              <a href="mailto:hola@rayostickers.com">hola@rayostickers.com</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg transition-transform duration-300 hover:scale-105">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-headline">WhatsApp</CardTitle>
            <p className="mt-2 text-muted-foreground">
              Para preguntas rápidas y actualizaciones de pedidos.
            </p>
            <Button asChild variant="link" className="mt-4 text-lg text-iridescent">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                Chatea con nosotros
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg transition-transform duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Instagram className="h-8 w-8 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-headline">Redes Sociales</CardTitle>
            <p className="mt-2 text-muted-foreground">
              ¡Síguenos para actualizaciones, novedades y más!
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Button asChild variant="outline" size="icon">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
