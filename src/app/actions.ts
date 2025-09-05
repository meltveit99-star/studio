'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.NEXT_PUBLIC_CONTACT_FORM_SEND_TO;
// Using a default 'from' email provided by Resend for deliverability.
const fromEmail = 'onboarding@resend.dev';

let resend: Resend | undefined;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    // 1. Save to Firestore
    const docRef = await addDoc(collection(db, 'contact-submissions'), {
      ...result.data,
      submittedAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);

    // 2. Send email notification if configured
    if (resend && toEmail && fromEmail) {
      const { error } = await resend.emails.send({
        from: `FM-service Kontaktskjema <${fromEmail}>`,
        to: toEmail,
        subject: `Ny henvendelse fra ${result.data.name}`,
        react: ContactFormEmail({ ...result.data }),
      });

      if (error) {
        console.error('Resend error:', error);
        // Throw an error to be caught by the client-side try/catch block
        throw new Error('Failed to send email.');
      }
      
      console.log('Contact form email sent successfully.');
    } else {
      console.warn('Email sending skipped: RESEND_API_KEY or NEXT_PUBLIC_CONTACT_FORM_SEND_TO is not configured.');
    }

    return { success: true };
  } catch (error) {
    console.error('Error in handleContactForm: ', error);
    return { success: false, error: 'Failed to submit form.' };
  }
}
