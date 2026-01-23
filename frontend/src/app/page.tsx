'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import {
  HeroSection,
  WhatIsHoopCasting,
  WhyDifferent,
  WhoCanApply,
  WhatWeLookFor,
  CastingProcess,
  WhyTrust,
  MessageForDreamers,
  FinalCTA
} from '@/components/HomeSections';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <HeroSection />
          <WhatIsHoopCasting />
          <WhyDifferent />
          <WhoCanApply />
          <WhatWeLookFor />
          <CastingProcess />
          <WhyTrust />
          <MessageForDreamers />
          <FinalCTA />
        </>
      )}
    </main>
  );
}
