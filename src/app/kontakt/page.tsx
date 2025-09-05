import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt oss',
  description: 'Kontakt FM-service for en gratis og uforpliktende befaring for ditt borettslag eller næringseiendom. Fyll ut vårt kontaktskjema, ring oss eller send en e-post.',
};

export default function ContactPage() {
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
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <a href="tel:+4795863224" className="text-muted-foreground hover:text-primary">
                    +47 95 86 32 24
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">E-post</h3>
                  <a href="mailto:kontakt@fm-service.no" className="text-muted-foreground hover:text-primary">
                    kontakt@fm-service.no
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">
                  FM-service AS<br/>
                  Lensmannslia 4, 1386 Asker
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
