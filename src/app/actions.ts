'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.NEXT_PUBLIC_CONTACT_FORM_SEND_TO;
const fromEmail = 'kunde@resend.dev';

let resend: Resend | undefined;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>) {
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  if (!resend || !toEmail || !fromEmail) {
    console.warn('Email sending skipped: RESEND_API_KEY, NEXT_PUBLIC_CONTACT_FORM_SEND_TO, or fromEmail is not configured.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Ny henvendelse fra ${result.data.name}`,
      react: ContactFormEmail({ ...result.data }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email.' };
    }
    
    console.log('Contact form email sent successfully.');
    return { success: true };

  } catch (error) {
    console.error('Error in handleContactForm: ', error);
    return { success: false, error: 'Failed to submit form.' };
  }
}
