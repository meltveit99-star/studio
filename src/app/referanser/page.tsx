import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Referanser',
  description: 'Se hva våre kunder sier. Les attester og casestudier fra borettslag og næringseiendom som bruker FM-service for en enklere hverdag.',
};

export default function ReferencesPage() {
  const testimonials = [
    {
      quote: "Med FM-service slipper vi koordineringshodepine og får alt i én faktura! Det har frigjort utrolig mye tid for styret.",
      author: "Styreleder, Borettslag Solhøyden",
    },
    {
      quote: "Rask respons og pålitelige løsninger – perfekt for vårt kontorbygg. Vi er trygge på at eiendommen er i de beste hender.",
      author: "Eiendomsforvalter, Næringseiendom AS",
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Hva våre kunder sier</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Vi er stolte av å levere tjenester som gjør en reell forskjell for våre kunder.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-4 font-semibold text-right">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Våre Prosjekter</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Eksempler på hvordan vi har hjulpet borettslag og næringsbygg med å effektivisere driften.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Image
                src="https://picsum.photos/600/400"
                alt="Velholdt borettslag"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="apartment building"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline">Borettslag 4.000 kvm – forenklet drift</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Vi tok over koordinering av vaktmester og håndverkere for et mellomstort borettslag. Resultatet var mindre stress for styret, økt forutsigbarhet i kostnader og mer fornøyde beboere som opplevde raskere respons på henvendelser.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="md:order-2">
              <Image
                src="https://picsum.photos/600/400"
                alt="Moderne kontorbygg"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="modern office building"
              />
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-bold font-headline">Kontorbygg 6.000 kvm – effektivisert vedlikehold</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                For et større kontorbygg implementerte vi en helhetlig plan for teknisk drift og renhold. Resultatet var en smidigere drift, redusert energiforbruk og mer fornøyde leietakere som kunne fokusere på sin kjernevirksomhet.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link href="/kontakt">Bli vår neste fornøyde kunde</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
