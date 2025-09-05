'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CheckCircle, Clock, Phone, ShieldCheck, Users } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function Home() {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const carouselItems = [
    {
      src: 'https://picsum.photos/seed/picsum1/1920/1080',
      alt: 'Velholdt borettslag med grøntområde',
      hint: 'maintained apartment building',
      title: 'Totalleverandør av Facility Management',
      description: 'Én kontakt, én faktura – vi koordinerer alle vaktmestertjenester for borettslag og næringseiendom.',
    },
    {
      src: 'https://picsum.photos/seed/picsum2/1920/1080',
      alt: 'Moderne næringsbygg med glassfasade',
      hint: 'modern office building',
      title: 'Effektiv drift for Næringseiendom',
      description: 'Vi sørger for at ditt næringsbygg er representativt, trygt og velfungerende, hver dag.',
    },
    {
      src: 'https://picsum.photos/seed/picsum3/1920/1080',
      alt: 'Vaktmester som utfører vedlikeholdsarbeid',
      hint: 'janitor maintenance',
      title: 'Pålitelige Vaktmestertjenester',
      description: 'Våre erfarne vaktmestere tar hånd om alt fra teknisk vedlikehold til grøntarealer.',
    },
  ];

  const benefits = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Én kontakt',
      description: 'Slipp å håndtere flere leverandører – vi koordinerer alt.',
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: 'Tidsbesparelse',
      description: 'Frigjør tid for styret eller forvalteren med én samlet løsning.',
    },
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: 'Rask respons',
      description: '24/7 vakttelefon for akutte behov.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: 'Kvalitetssikring',
      description: 'Kun pålitelige, kvalitetssikrede leverandører.',
    },
  ];

  const steps = [
    {
      step: 1,
      title: 'Gratis befaring',
      description: 'Vi kommer til deres eiendom for å vurdere deres unike behov og utfordringer.',
    },
    {
      step: 2,
      title: 'Skreddersydd plan',
      description: 'Dere mottar en tilpasset plan for koordinering av tjenester, helt uforpliktende.',
    },
    {
      step: 3,
      title: 'Problemfritt vedlikehold',
      description: 'Vi tar over koordineringen, og dere får én faktura og full kontroll.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{ loop: true }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full">
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="relative h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-ai-hint={item.hint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">{item.title}</h1>
                    <p className="mt-4 max-w-4xl text-lg md:text-xl">{item.description}</p>
                    <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/kontakt">Få gratis befaring</Link>
                    </Button>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Forenklet drift med profesjonell koordinering</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Vi håndterer vaktmester, elektriker, rørlegger og mer – alt med én kontakt for borettslag og næringseiendom.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {benefit.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Slik fungerer det: Fra befaring til problemfri eiendomsdrift</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Kom i gang med tre enkle trinn for en problemfri hverdag.
          </p>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div className="absolute top-1/2 left-0 hidden h-px w-full -translate-y-1/2 bg-border md:block"></div>
            {steps.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl z-10">
                  {step.step}
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Klar for en enklere hverdag?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Fyll ut skjemaet for å bestille en gratis og uforpliktende befaring. Vi kontakter deg innen kort tid for å avtale en tid som passer.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Bestill gratis befaring</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
