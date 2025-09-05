import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Droplets, Leaf, Settings, Snowflake, Sparkles, Wrench, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tjenester',
  description: 'Oppdag våre facility management-tjenester for borettslag og næringseiendom. Vi tilbyr alt fra vaktmestertjenester til teknisk drift og renhold, alt gjennom én kontakt.',
};

export default function ServicesPage() {
  const additionalServices = [
    { icon: <Wrench className="h-8 w-8 text-primary" />, name: 'Vaktmester' },
    { icon: <Zap className="h-8 w-8 text-primary" />, name: 'Elektriker' },
    { icon: <Droplets className="h-8 w-8 text-primary" />, name: 'Rørlegger' },
    { icon: <div className="flex gap-2"><Snowflake className="h-8 w-8 text-primary" /><Leaf className="h-8 w-8 text-primary" /></div>, name: 'Snømåking/Plenklipping' },
    { icon: <Sparkles className="h-8 w-8 text-primary" />, name: 'Renhold' },
    { icon: <Settings className="h-8 w-8 text-primary" />, name: 'Teknisk drift' },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Våre Tjenester innen Facility Management</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Vi koordinerer et bredt spekter av håndverkere og spesialister for å dekke alle dine behov for eiendomsdrift.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Alle tjenester, én kontakt</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Fra teknisk drift til daglig vedlikehold – vi tilbyr en komplett løsning for ditt borettslag eller næringsbygg.
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {additionalServices.map((service) => (
              <div key={service.name} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-muted-foreground bg-background p-6 rounded-lg">
            <p className="italic">Alle håndverkertjenester koordineres gjennom oss og faktureres transparent i én samlet faktura.</p>
          </div>
          <div className="mt-12 text-center">
             <Button asChild size="lg">
                <Link href="/kontakt">Få et tilbud tilpasset ditt borettslag eller eiendom</Link>
             </Button>
          </div>
        </div>
      </section>
    </>
  );
}
