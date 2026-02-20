'use server';

/**
 * @fileOverview Personalized product recommendations based on browsing history.
 *
 * - getPersonalizedRecommendations - A function that generates product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user\'s browsing history.'),
  productCatalog: z
    .array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      category: z.string(),
    }))
    .describe('The current product catalog.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of product IDs representing the personalized product recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert fashion consultant providing personalized product recommendations based on a user's browsing history and a product catalog.

  Given the following browsing history:
  {{#each browsingHistory}}
  - {{this}}
  {{/each}}

  And the following product catalog:
  {{#each productCatalog}}
  - ID: {{id}}, Name: {{name}}, Description: {{description}}, Category: {{category}}
  {{/each}}

  Recommend products (by ID) from the product catalog that the user might be interested in, based on their browsing history.  Return ONLY the array of product IDs.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

