'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleSeoOptimization } from '@/app/actions';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState = {
  message: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimaliserer...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Optimaliser innhold
        </>
      )}
    </Button>
  );
}

export function SeoOptimizerClient() {
  const [state, formAction] = useFormState(handleSeoOptimization, initialState);

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyser ditt innhold</CardTitle>
          <CardDescription>Lim inn eksisterende tekst og nøkkelord for å få forslag til forbedringer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="websiteContent">Nettsideinnhold</Label>
              <Textarea
                id="websiteContent"
                name="websiteContent"
                placeholder="Lim inn teksten fra en av dine nettsider her..."
                rows={10}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Nøkkelord</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="f.eks. facility management borettslag, vaktmestertjenester"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        {state.message && !state.data && (
            <Alert variant="destructive">
                <AlertTitle>Feil</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}

        {state.data ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Optimalisert Innhold</CardTitle>
                <CardDescription>Her er et forslag til forbedret tekst basert på dine nøkkelord.</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap font-body text-sm">{state.data.optimizedContent}</pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">SEO-forslag</CardTitle>
                <CardDescription>Ytterligere tiltak du kan gjøre for å forbedre synligheten.</CardDescription>
              </CardHeader>
              <CardContent>
                 <pre className="whitespace-pre-wrap font-body text-sm">{state.data.suggestions}</pre>
              </CardContent>
            </Card>
          </>
        ) : (
            <Card className="flex flex-col items-center justify-center h-full text-center p-8">
                <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="font-headline">Venter på analyse</CardTitle>
                <CardDescription className="mt-2">Resultatene dine vil vises her etter at du har sendt inn innhold for optimalisering.</CardDescription>
            </Card>
        )}
      </div>
    </div>
  );
}
