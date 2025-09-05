import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Navn må være minst 2 tegn." }),
  email: z.string().email({ message: "Ugyldig e-postadresse." }),
  phone: z.string().min(8, { message: "Telefonnummer må være minst 8 siffer." }),
  propertyName: z.string().min(2, { message: "Navn på eiendom må fylles ut." }),
  propertySize: z.coerce.number({invalid_type_error: "Oppgi et tall."}).positive({ message: "Størrelse må være et positivt tall." }),
  propertyType: z.enum(['borettslag', 'naeringseiendom'], { required_error: "Du må velge en type." }),
  message: z.string().min(10, {message: "Meldingen må være minst 10 tegn."}).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
