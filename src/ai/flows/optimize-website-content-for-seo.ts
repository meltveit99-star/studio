'use server';
/**
 * @fileOverview A flow that analyzes website content and provides SEO optimization suggestions.
 *
 * - optimizeWebsiteContentForSEO - A function that optimizes website content for SEO.
 * - OptimizeWebsiteContentForSEOInput - The input type for the optimizeWebsiteContentForSEO function.
 * - OptimizeWebsiteContentForSEOOutput - The return type for the optimizeWebsiteContentForSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeWebsiteContentForSEOInputSchema = z.object({
  websiteContent: z
    .string()
    .describe('The content of the website page to be optimized.'),
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords to optimize the content for. Example: facility management borettslag, vaktmestertjenester'
    ),
});
export type OptimizeWebsiteContentForSEOInput = z.infer<
  typeof OptimizeWebsiteContentForSEOInputSchema
>;

const OptimizeWebsiteContentForSEOOutputSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The optimized website content with improved SEO.'),
  suggestions: z
    .string()
    .describe(
      'A list of suggestions for improving the SEO of the website content.'
    ),
});
export type OptimizeWebsiteContentForSEOOutput = z.infer<
  typeof OptimizeWebsiteContentForSEOOutputSchema
>;

export async function optimizeWebsiteContentForSEO(
  input: OptimizeWebsiteContentForSEOInput
): Promise<OptimizeWebsiteContentForSEOOutput> {
  return optimizeWebsiteContentForSEOFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeWebsiteContentForSEOPrompt',
  input: {schema: OptimizeWebsiteContentForSEOInputSchema},
  output: {schema: OptimizeWebsiteContentForSEOOutputSchema},
  prompt: `You are an SEO expert. Please analyze the following website content and provide suggestions for improving its SEO for the given keywords.

Website Content: {{{websiteContent}}}
Keywords: {{{keywords}}}

Instructions:
1. Rewrite the website content to include the keywords naturally.
2. Provide a list of suggestions for improving the SEO of the website content, such as:
  - Adding more relevant keywords.
  - Improving the title and meta description.
  - Adding alt text to images.
  - Improving the website's structure.

Output:
{
  "optimizedContent": "The optimized website content.",
  "suggestions": "A list of suggestions for improving the SEO of the website content."
}`,
});

const optimizeWebsiteContentForSEOFlow = ai.defineFlow(
  {
    name: 'optimizeWebsiteContentForSEOFlow',
    inputSchema: OptimizeWebsiteContentForSEOInputSchema,
    outputSchema: OptimizeWebsiteContentForSEOOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
