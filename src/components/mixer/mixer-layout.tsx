'use client';

import { useMixerStore } from '@/store/mixer-store';
import { MixerView } from './views/mixer-view';
import { LayersView } from './views/layers-view';
import { EditView } from './views/edit-view';
import { EffectsView } from './views/effects-view';
import { PlayerView } from './views/player-view';
import { RTAView } from './views/rta-view';
import { SettingsView } from './views/settings-view';
import { NavigationTabs } from './navigation/navigation-tabs';
import { MasterSection } from './sections/master-section';
import { motion, AnimatePresence } from 'framer-motion';

export function MixerLayout() {
  const { ui } = useMixerStore();

  const renderCurrentView = () => {
    switch (ui.view) {
      case 'mixer':
        return <MixerView />;
      case 'layers':
        return <LayersView />;
      case 'edit':
        return <EditView />;
      case 'effects':
        return <EffectsView />;
      case 'player':
        return <PlayerView />;
      case 'rta':
        return <RTAView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MixerView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Navigation principale */}
      <NavigationTabs />
      
      {/* Contenu principal avec animations */}
      <div className="flex-1 flex overflow-hidden">
        {/* Vue principale */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={ui.view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Section Master (toujours visible) */}
        <MasterSection />
      </div>
    </div>
  );
}