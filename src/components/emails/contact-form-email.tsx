import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
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
        <Heading style={heading}>Ny henvendelse fra Kontaktskjema</Heading>
        <Text style={paragraph}>Du har mottatt en ny melding fra nettsiden din.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Navn:</Text>
          <Text style={value}>{name}</Text>

          <Text style={label}>E-post:</Text>
          <Text style={value}>{email}</Text>

          <Text style={label}>Telefon:</Text>
          <Text style={value}>{phone}</Text>

          <Text style={label}>Navn på eiendom:</Text>
          <Text style={value}>{propertyName}</Text>

          <Text style={label}>Størrelse (kvm):</Text>
          <Text style={value}>{propertySize}</Text>

          <Text style={label}>Type eiendom:</Text>
          <Text style={value}>{propertyTypeLabels[propertyType]}</Text>

          {message && (
            <>
              <Text style={label}>Melding:</Text>
              <Text style={value}>{message}</Text>
            </>
          )}
        </Section>
        <Hr style={hr} />
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
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  maxWidth: '465px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  color: '#333',
  padding: '0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
  color: '#555',
  padding: '0 20px',
};

const label = {
  fontWeight: 'bold',
  fontSize: '14px',
  color: '#333',
  margin: '16px 0 2px 0',
  padding: '0 20px',
};

const value = {
  fontSize: '16px',
  color: '#555',
  margin: '0 0 16px 0',
  padding: '0 20px',
  borderLeft: '4px solid #eee',
  paddingLeft: '16px'
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};
