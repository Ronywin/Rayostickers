export interface Sticker {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  aiHint: string;
}

export interface CartItem extends Sticker {
  quantity: number;
}
