'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Sparkles, ShoppingCart, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { createSticker } from '@/ai/flows/create-sticker-flow';
import { useCart } from '@/hooks/use-cart';

export default function CustomStickerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setGeneratedSticker(null);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSticker = async () => {
    if (!originalImage) return;
    setIsLoading(true);
    setGeneratedSticker(null);
    try {
      const result = await createSticker({ photoDataUri: originalImage });
      if (result && result.stickerDataUri) {
        setGeneratedSticker(result.stickerDataUri);
        toast({
          title: 'Sticker created!',
          description: 'Your custom sticker is ready.',
        });
      } else {
          throw new Error("The AI couldn't generate a sticker from that image. Please try another one.");
      }
    } catch (error) {
      console.error('Error creating sticker:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no!',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToCart = () => {
    if (!generatedSticker) return;
    const customSticker = {
      id: `custom-${Date.now()}`,
      name: 'Custom Designed Sticker',
      description: 'A sticker created with your own image.',
      price: 5.00,
      imageUrl: generatedSticker,
      aiHint: 'custom sticker',
    };
    addToCart(customSticker);
  }

  const resetState = () => {
    setOriginalImage(null);
    setGeneratedSticker(null);
    setIsLoading(false);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl font-headline">
          Create Your <span className="text-iridescent">Own Sticker</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Upload your image and let our AI turn it into a unique, high-quality sticker.
        </p>
      </section>

      <Card className="mx-auto mt-12 max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle>Sticker Generator</CardTitle>
          <CardDescription>Upload an image to start. For best results, use an image with a clear subject.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
            {!originalImage ? (
                <div 
                    className="flex flex-col items-center justify-center col-span-2 border-2 border-dashed border-muted rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">Click or drag to upload</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 4MB</p>
                    <Input 
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <>
                <div className="relative">
                    <h3 className="text-lg font-semibold text-center mb-2">Your Image</h3>
                    <div className="aspect-square w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <Image src={originalImage} alt="Your upload" width={400} height={400} className="object-contain max-h-full max-w-full" />
                    </div>
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-8 w-8 rounded-full z-10" onClick={resetState}>
                      <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="relative">
                    <h3 className="text-lg font-semibold text-center mb-2">AI Generated Sticker</h3>
                    <div className="aspect-square w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        {isLoading && (
                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                <Sparkles className="h-12 w-12 animate-spin"/>
                                <p>Conjuring your sticker...</p>
                            </div>
                        )}
                        {!isLoading && generatedSticker && (
                            <Image src={generatedSticker} alt="Generated Sticker" width={400} height={400} className="object-contain max-h-full max-w-full" />
                        )}
                        {!isLoading && !generatedSticker && (
                            <div className="text-center text-muted-foreground p-4">
                                <ImageIcon className="h-12 w-12 mx-auto"/>
                                <p className="mt-2">Your sticker will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
                </>
            )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-4">
            {originalImage && (
                isLoading ? (
                    <Button disabled size="lg" className="w-full sm:w-auto">
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                    </Button>
                ) : generatedSticker ? (
                  <>
                    <Button variant="outline" onClick={handleCreateSticker} className="w-full sm:w-auto">Redo</Button>
                    <Button size="lg" onClick={handleAddToCart} className="font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart ($5.00)
                    </Button>
                  </>
                ) : (
                    <Button onClick={handleCreateSticker} size="lg" className="font-semibold w-full sm:w-auto">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Create Sticker
                    </Button>
                )
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
