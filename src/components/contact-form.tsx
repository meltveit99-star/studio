'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleContactForm } from '@/app/actions';
import { ContactFormSchema, type ContactFormValues } from '@/lib/schema';
import { Loader2 } from 'lucide-react';
import * as React from 'react';


type ContactFormProps = {
  withMessage?: boolean;
};

export function ContactForm({ withMessage = false }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      propertyName: '',
      propertySize: undefined,
      propertyType: undefined,
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await handleContactForm(data);
      if (result.success) {
        toast({
          title: 'Melding sendt!',
          description: 'Takk for din henvendelse. Vi kontakter deg snart.',
        });
        form.reset();
      } else {
        // Handle validation errors specifically
        if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join(' ');
            toast({
                title: 'Valideringsfeil',
                description: errorMessages || 'Vennligst sjekk feltene og prøv igjen.',
                variant: 'destructive',
            });
        } else {
            throw new Error(result.message || 'Form submission failed');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Kunne ikke sende meldingen. Prøv igjen senere.';
      toast({
        title: 'En feil oppstod',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt navn" {...field} name="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input placeholder="din@epost.no" {...field} name="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input placeholder="Ditt telefonnummer" {...field} name="phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Borettslag/Eiendom</FormLabel>
              <FormControl>
                <Input placeholder="Navn på eiendom" {...field} name="propertyName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Størrelse (kvm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="f.eks. 4000" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.valueAsNumber || undefined)} name="propertySize" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type eiendom</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ''} name="propertyType">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="borettslag">Borettslag/Sameie</SelectItem>
                  <SelectItem value="naeringseiendom">Næringseiendom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {withMessage && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melding</FormLabel>
                <FormControl>
                  <Textarea placeholder="Fortell oss litt om hva du trenger hjelp med..." className="min-h-[100px]" {...field} name="message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
           {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sender...
            </>
          ) : (
            'Send melding'
          )}
        </Button>
      </form>
    </Form>
  );
}
