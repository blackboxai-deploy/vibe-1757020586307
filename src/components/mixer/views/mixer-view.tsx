'use client';

import { useMixerStore } from '@/store/mixer-store';
import { ChannelStrip } from '../components/channel-strip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function MixerView() {
  const { channels, currentLayer } = useMixerStore();

  // Filtrer les canaux selon la couche sélectionnée
  const filteredChannels = channels.filter(channel => {
    switch (currentLayer) {
      case 'inputs':
        return channel.type === 'input';
      case 'aux':
        return channel.type === 'aux';
      case 'groups':
        return channel.type === 'group';
      default:
        return channel.type === 'input';
    }
  });

  return (
    <div className="h-full bg-mixer-bg">
      {/* En-tête avec informations de la couche */}
      <div className="bg-surface-variant border-b border-outline-variant p-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h2 className="text-xl font-bold text-on-surface">
            {currentLayer === 'inputs' && 'Canaux d\'entrée (1-24)'}
            {currentLayer === 'aux' && 'Canaux Aux (1-6)'}
            {currentLayer === 'groups' && 'Groupes (1-4)'}
          </h2>
          
          <div className="text-sm text-on-surface-variant">
            {filteredChannels.length} canal{filteredChannels.length > 1 ? 'ux' : ''}
          </div>
        </motion.div>
      </div>

      {/* Grid des faders */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4"
          >
            {filteredChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChannelStrip channel={channel} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollArea>

      {/* Indicateurs de performance */}
      <div className="bg-surface-variant border-t border-outline-variant p-2">
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <div>Latence réseau: ~25ms</div>
          <div>CPU: 12%</div>
          <div>Sample Rate: 48kHz</div>
          <div>Buffer: 128 samples</div>
        </div>
      </div>
    </div>
  );
}