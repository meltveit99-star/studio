'use client';

import * as React from 'react';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState({ href: '', display: '95 86 32 24' });

  React.useEffect(() => {
    // Obfuscate email and phone on client-side to make it harder for bots
    const user = 'kontakt';
    const domain = 'fm-service.no';
    setEmail(`${user}@${domain}`);

    setPhone(prev => ({ ...prev, href: '+4795863224' }));
  }, []);


  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Kontakt oss for en gratis befaring</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Har du spørsmål om vaktmestertjenester eller facility management? Ta kontakt med oss i dag for en uforpliktende prat.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Send oss en melding</CardTitle>
                <CardDescription>
                  Vi svarer vanligvis innen 24 timer på hverdager.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm withMessage />
              </CardContent>
            </Card>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-headline">Kontaktinformasjon</h2>
                <p className="mt-2 text-muted-foreground">
                  Du kan også nå oss direkte på telefon eller e-post.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  {phone.href ? (
                     <a href={`tel:${phone.href}`} className="text-muted-foreground hover:text-primary">
                      {phone.display}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Laster...</span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">E-post</h3>
                   {email ? (
                    <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">
                      {email}
                    </a>
                  ) : (
                     <span className="text-muted-foreground">Laster...</span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <address className="text-muted-foreground not-italic">
                    Lensmannslia 4,<br />1386 Asker
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
