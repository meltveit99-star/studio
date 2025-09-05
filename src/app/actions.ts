'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { optimizeWebsiteContentForSEO } from '@/ai/flows/optimize-website-content-for-seo';

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  // Here you would typically send the data to a database like Firestore
  // For this example, we'll just log it to the console.
  console.log('New contact form submission:', result.data);

  return { success: true };
}


export async function handleSeoOptimization(prevState: any, formData: FormData) {
  const websiteContent = formData.get('websiteContent') as string;
  const keywords = formData.get('keywords') as string;

  if (!websiteContent || !keywords) {
    return {
      message: 'Vennligst fyll ut begge feltene.',
      data: null,
    };
  }
  
  try {
    const result = await optimizeWebsiteContentForSEO({ websiteContent, keywords });
    return {
      message: 'Optimalisering fullført.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'En feil oppstod under optimalisering.',
      data: null,
    };
  }
}
