'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
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
