'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const fromEmail = 'onboarding@resend.dev';

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid data' };
  }

  const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  const toEmail = process.env.NEXT_PUBLIC_CONTACT_FORM_SEND_TO;

  if (!resendApiKey || !toEmail) {
    const errorMessage = 'Server configuration error: API key or recipient email is missing.';
    console.error(errorMessage);
    return { success: false, error: 'Server configuration error preventing email submission.' };
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
