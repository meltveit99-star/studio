import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referanser',
  description: 'Se hva våre kunder sier. Les attester og casestudier fra borettslag og næringseiendom som bruker FM-service for en enklere hverdag.',
};

export default function ReferencesPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Referanser</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Her vil vi dele erfaringer fra våre kunder og vise frem prosjekter vi er stolte av.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Kundeuttalelser og Prosjekter</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Innhold kommer senere.
            </p>
        </div>
      </section>
    </>
  );
}
