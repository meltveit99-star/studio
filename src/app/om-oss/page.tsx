import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

export const metadata: Metadata = {
  title: 'Om oss',
  description: 'Lær mer om FM-service, din partner for facility management. Vi spesialiserer oss på drift av borettslag og næringseiendom, og sparer deg tid og penger.',
};

export default function AboutUsPage() {
  const reasonsToChoose = [
    'Lokal tilstedeværelse med rask respons.',
    'Én kontaktperson for all koordinering.',
    'Reduserte kostnader gjennom vårt leverandørnettverk.',
    'Skreddersydde løsninger for borettslag og næringseiendom.',
  ];

  const images = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  ];


  return (
    <>
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Din lokale partner for problemfri eiendomsdrift</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Vi er et lokalt selskap som koordinerer alle tjenester borettslag og næringseiendom trenger.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      <Image
                        alt={`Bilde ${index + 1} av eiendommer`}
                        className="aspect-[3/2] w-full overflow-hidden rounded-lg object-cover"
                        height={400}
                        src={src}
                        width={600}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="text-lg text-muted-foreground space-y-4">
              <p>
                Vi håndterer vaktmester, elektriker, rørlegger, renhold og sesongarbeid uten at du må ansette egne folk. Med vår ekspertise innen facility management, sikrer vi effektiv og pålitelig drift.
              </p>
              <p>
                Vårt løfte: Spar tid, reduser stress og sikre kvalitet gjennom vårt nettverk av pålitelige leverandører. Vi fungerer som ditt sentrale punkt for all eiendomsdrift, slik at du kan fokusere på det som er viktigst for deg.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Hvorfor velge FM-service?</h2>
              <ul className="mt-6 space-y-4">
                {reasonsToChoose.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8">
                 <Link href="/kontakt">Finn ut hvordan vi kan hjelpe deg</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
               <Image
                src="https://picsum.photos/600/400"
                alt="Team av vaktmestere og teknikere i samarbeid"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="team collaboration"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}