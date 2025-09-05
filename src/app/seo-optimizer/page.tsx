import { SeoOptimizerClient } from '@/components/seo-optimizer-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Verktøy',
  description: 'Analyser og optimaliser innholdet på nettstedet ditt for relevante søkeord som "facility management" og "vaktmestertjenester" med vårt AI-drevne SEO-verktøy.',
};

export default function SeoOptimizerPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">SEO Optimeringsverktøy</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Bruk vårt AI-verktøy til å analysere og forbedre innholdet på nettsiden din for nøkkelord som "facility management borettslag" og "vaktmestertjenester".
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <SeoOptimizerClient />
        </div>
      </section>
    </>
  );
}
