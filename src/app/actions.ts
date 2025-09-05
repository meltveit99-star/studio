'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.NEXT_PUBLIC_CONTACT_FORM_SEND_TO;
const fromEmail = 'onboarding@resend.dev';

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid data' };
  }

  if (!resendApiKey || !toEmail) {
    console.error('Server configuration error: RESEND_API_KEY or NEXT_PUBLIC_CONTACT_FORM_SEND_TO is not set.');
    throw new Error('Server configuration error preventing email submission.');
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Ny henvendelse fra ${result.data.name}`,
      react: ContactFormEmail({ ...result.data }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
    
    console.log('Contact form email sent successfully.');
    return { success: true };

  } catch (error) {
    console.error('Error in handleContactForm:', error);
    // Re-throw the error to be caught by the client-side form logic
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while submitting the form.');
  }
}
