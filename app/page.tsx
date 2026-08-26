
import { Signature } from '@/components/ui/Signature';
import { Hero } from '@/components/home/Hero';
import { InterfacesPreview } from '@/components/home/InterfacesPreview';
import { Social } from '@/components/home/Social';
import { Organisers } from '@/components/home/Organisers';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Mission } from '@/components/home/Mission';
import { CtaBand } from '@/components/home/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <InterfacesPreview />

      <Social />
      <Organisers />
      <HowItWorks />
      <Mission />

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Signature />
      </div>

      <CtaBand />
    </>
  );
}
