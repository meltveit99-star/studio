import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  propertyName: string;
  propertySize: number;
  propertyType: 'borettslag' | 'naeringseiendom';
  message?: string;
}

const propertyTypeLabels = {
  borettslag: 'Borettslag/Sameie',
  naeringseiendom: 'Næringseiendom',
};

export const ContactFormEmail = ({
  name,
  email,
  phone,
  propertyName,
  propertySize,
  propertyType,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>Ny henvendelse fra kontaktskjemaet på FM-service</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading>Ny henvendelse fra Kontaktskjema</Heading>
        <Text>Du har mottatt en ny melding fra nettsiden din.</Text>
        <Hr />
        <Text><strong>Navn:</strong> {name}</Text>
        <Text><strong>E-post:</strong> {email}</Text>
        <Text><strong>Telefon:</strong> {phone}</Text>
        <Text><strong>Navn på eiendom:</strong> {propertyName}</Text>
        <Text><strong>Størrelse (kvm):</strong> {propertySize}</Text>
        <Text><strong>Type eiendom:</strong> {propertyTypeLabels[propertyType]}</Text>
        {message && (
          <Text><strong>Melding:</strong> {message}</Text>
        )}
        <Hr />
        <Text style={footer}>Denne e-posten ble sendt fra kontaktskjemaet på fm-service.no</Text>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

// --- Styles ---
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
