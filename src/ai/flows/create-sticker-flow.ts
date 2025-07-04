'use server';
/**
 * @fileOverview A flow to create a sticker from an uploaded image.
 *
 * - createSticker - A function that takes an image and turns it into a sticker.
 * - CreateStickerInput - The input type for the createSticker function.
 * - CreateStickerOutput - The return type for the createSticker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CreateStickerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be turned into a sticker, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CreateStickerInput = z.infer<typeof CreateStickerInputSchema>;

const CreateStickerOutputSchema = z.object({
  stickerDataUri: z
    .string()
    .describe('The generated sticker image as a data URI.'),
});
export type CreateStickerOutput = z.infer<typeof CreateStickerOutputSchema>;

// Exported wrapper function
export async function createSticker(input: CreateStickerInput): Promise<CreateStickerOutput> {
    return createStickerFlow(input);
}

const createStickerFlow = ai.defineFlow(
    {
        name: 'createStickerFlow',
        inputSchema: CreateStickerInputSchema,
        outputSchema: CreateStickerOutputSchema,
    },
    async (input) => {
        const {media} = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: [
                {media: {url: input.photoDataUri}},
                {text: 'You are a sticker designer. Take the provided image, identify and isolate the main subject, and remove the background so it is fully transparent. Add a thick, solid, plain white border around the isolated subject to create a classic die-cut sticker effect. The final image should be a PNG with a transparent background.'},
            ],
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (!media || !media.url) {
            throw new Error("AI failed to generate the sticker image. Please try a different image.");
        }

        return { stickerDataUri: media.url };
    }
);
