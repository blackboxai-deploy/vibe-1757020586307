'use client';

import { useEffect } from 'react';
import { useMixerStore } from '@/store/mixer-store';
import { MaterialProvider } from '@/components/providers/material-provider';
import { MixerLayout } from '@/components/mixer/mixer-layout';
import { ConnectionStatus } from '@/components/mixer/connection-status';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function HomePage() {
  const { initializeStore, channels } = useMixerStore();
  
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // Affichage du loading pendant l'initialisation
  if (channels.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <MaterialProvider>
      <div className="min-h-screen bg-surface text-on-surface">
        {/* Status bar de connexion */}
        <ConnectionStatus />
        
        {/* Interface principale du mixer */}
        <MixerLayout />
      </div>
    </MaterialProvider>
  );
}