'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const fromEmail = 'onboarding@resend.dev';

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFormSendTo = process.env.NEXT_PUBLIC_CONTACT_FORM_SEND_TO;

  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid data' };
  }

  if (!resendApiKey || !contactFormSendTo) {
    console.error('Server Configuration Error: Environment variables RESEND_API_KEY or NEXT_PUBLIC_CONTACT_FORM_SEND_TO are not set.');
    console.error(`- Has RESEND_API_KEY: ${!!resendApiKey}`);
    console.error(`- Has NEXT_PUBLIC_CONTACT_FORM_SEND_TO: ${!!contactFormSendTo}`);
    return { success: false, error: 'Server configuration error preventing email submission.' };
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactFormSendTo,
      subject: `Ny henvendelse fra ${result.data.name}`,
      react: ContactFormEmail({ ...result.data }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: `Failed to send email: ${error.message}` };
    }
    
    console.log('Contact form email sent successfully.');
    return { success: true };

  } catch (error) {
    console.error('Error in handleContactForm:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `An unknown error occurred while submitting the form: ${errorMessage}` };
  }
}
