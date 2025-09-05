import Link from 'next/link';
import { Building } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline mb-2">
              <Building className="h-6 w-6 text-primary" />
              <span>FM-service</span>
            </Link>
            <p className="text-muted-foreground">
              Én kontakt, én faktura – vi koordinerer alt for borettslag og næringseiendom.
            </p>
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
              <li>E-post: <a href="mailto:kontakt@fm-service.no" className="hover:text-primary">kontakt@fm-service.no</a></li>
              <li>Telefon: <a href="tel:+4712345678" className="hover:text-primary">+47 123 45 678</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FM-service. Alle rettigheter forbeholdt. | <Link href="#" className="hover:text-primary">Personvernerklæring</Link></p>
        </div>
      </div>
    </footer>
  );
}
