'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { optimizeWebsiteContentForSEO } from '@/ai/flows/optimize-website-content-for-seo';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const docRef = await addDoc(collection(db, 'contact-submissions'), {
      ...result.data,
      submittedAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
    return { success: true };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, error: 'Failed to submit form.' };
  }
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
