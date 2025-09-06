'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schema';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    [key in keyof z.infer<typeof ContactFormSchema>]?: string[];
  };
};

export async function handleContactForm(data: z.infer<typeof ContactFormSchema>): Promise<ContactFormState> {
  const result = ContactFormSchema.safeParse(data);
  
  if (!result.success) {
    return { 
      success: false, 
      message: 'Invalid data provided.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFormSendTo = process.env.CONTACT_FORM_SEND_TO;
  const contactFormSendFrom = process.env.CONTACT_FORM_SEND_FROM;

  if (!resendApiKey) {
    console.error('Server Configuration Error: RESEND_API_KEY is not set.');
    return { success: false, message: 'Serverfeil: RESEND_API_KEY mangler.' };
  }
  if (!contactFormSendTo) {
    console.error('Server Configuration Error: CONTACT_FORM_SEND_TO is not set.');
    return { success: false, message: 'Serverfeil: CONTACT_FORM_SEND_TO mangler.' };
  }
  if (!contactFormSendFrom) {
    console.error('Server Configuration Error: CONTACT_FORM_SEND_FROM is not set.');
    return { success: false, message: 'Serverfeil: CONTACT_FORM_SEND_FROM mangler.' };
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
      return { success: false, message: `Failed to send email: ${error.message}` };
    }
    
    return { success: true, message: 'Email sent successfully!' };

  } catch (error) {
    console.error('Error in handleContactForm:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `An unknown error occurred while submitting the form: ${errorMessage}` };
  }
}
