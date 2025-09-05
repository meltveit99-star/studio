'use client';

import Link from 'next/link';
import { Building } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import * as React from 'react';

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState({ href: '', display: '95 86 32 24' });

  React.useEffect(() => {
    const user = 'kontakt';
    const domain = 'fm-service.no';
    setEmail(`${user}@${domain}`);

    setPhone(prev => ({ ...prev, href: '+4795863224' }));
  }, []);

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline mb-2">
              <Building className="h-6 w-6 text-primary" />
              <span>FM-service</span>
            </Link>
            <address className="text-muted-foreground not-italic">
              Lensmannslia 4,<br />
              1386 Asker
            </address>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Sider</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Kontakt</h3>
            <ul className="space-y-2 text-muted-foreground">
               <li>
                E-post: {email ? 
                  <a href={`mailto:${email}`} className="hover:text-primary">{email}</a> :
                  <span className="opacity-50">laster...</span>
                }
              </li>
              <li>
                Telefon: {phone.href ?
                  <a href={`tel:${phone.href}`} className="hover:text-primary">{phone.display}</a> :
                  <span className="opacity-50">laster...</span>
                }
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FM-service. Alle rettigheter forbeholdt. | <Link href="/personvern" className="hover:text-primary">Personvernerklæring</Link></p>
        </div>
      </div>
    </footer>
  );
}
