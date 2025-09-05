'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFormSendTo = process.env.CONTACT_FORM_SEND_TO;
  const contactFormSendFrom = process.env.CONTACT_FORM_SEND_FROM;
  
  console.log('Attempting to send email with the following configuration:');
  console.log(`- RESEND_API_KEY loaded: ${!!resendApiKey}`);
  console.log(`- CONTACT_FORM_SEND_TO: ${contactFormSendTo}`);
  console.log(`- CONTACT_FORM_SEND_FROM: ${contactFormSendFrom}`);
  
  const result = ContactFormSchema.safeParse(data);
  
  if (!result.success) {
    return { success: false, error: 'Invalid data' };
  }

  if (!resendApiKey || !contactFormSendTo || !contactFormSendFrom) {
    console.error('Server Configuration Error: One or more environment variables are not set.');
    return { success: false, error: 'Server configuration error preventing email submission.' };
  }

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: `FM-service <${contactFormSendFrom}>`,
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
