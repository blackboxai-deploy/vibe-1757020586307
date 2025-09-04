'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function NavigationTabs() {
  const { ui, setView, setCurrentLayer, currentLayer, channels, connection, rta, player } = useMixerStore();

  const views = [
    {
      id: 'mixer',
      label: 'Mixer',
      icon: '🎛️',
      description: 'Console de mixage principale'
    },
    {
      id: 'layers',
      label: 'Layers',
      icon: '📊',
      description: 'Couches inputs/aux/groups'
    },
    {
      id: 'edit',
      label: 'Édition',
      icon: '⚙️',
      description: 'Édition canal détaillée'
    },
    {
      id: 'effects',
      label: 'Effets',
      icon: '✨',
      description: 'Effets intégrés'
    },
    {
      id: 'player',
      label: 'Player',
      icon: '🎵',
      description: 'Lecteur USB'
    },
    {
      id: 'rta',
      label: 'RTA',
      icon: '📈',
      description: 'Analyseur de spectre'
    },
    {
      id: 'settings',
      label: 'Réglages',
      icon: '⚙️',
      description: 'Configuration'
    }
  ];

  // Statistiques pour les badges
  const getViewBadge = (viewId: string) => {
    switch (viewId) {
      case 'mixer':
        const activeChannels = channels.filter(ch => !ch.mute).length;
        return activeChannels > 0 ? activeChannels : null;
      case 'effects':
        const activeEffects = 2; // Nombre d'effets actifs (simulé)
        return activeEffects > 0 ? activeEffects : null;
      case 'player':
        return player.status === 'playing' ? '▶️' : null;
      case 'rta':
        return rta.enabled ? '🟢' : null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface-variant border-b border-outline-variant">
      {/* Navigation principale */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">Ui24</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-on-surface">Soundcraft Ui24R</h1>
              <p className="text-xs text-on-surface-variant">Controller moderne</p>
            </div>
          </div>

          {/* Indicateur de statut global */}
          <div className="flex items-center space-x-2">
            {connection.status === 'connected' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2 text-sm text-on-surface-variant"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>En ligne</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Onglets de navigation */}
      <div className="px-4 pb-2">
        <Tabs value={ui.view} onValueChange={(value) => setView(value as any)}>
          <TabsList className="grid w-full grid-cols-7 bg-surface rounded-xl p-1">
            {views.map((view) => {
              const badge = getViewBadge(view.id);
              return (
                <TabsTrigger
                  key={view.id}
                  value={view.id}
                  className={cn(
                    'flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200',
                    'data-[state=active]:bg-primary data-[state=active]:text-on-primary',
                    'hover:bg-surface-variant relative'
                  )}
                  title={view.description}
                >
                  <span className="text-lg">{view.icon}</span>
                  <span className="text-xs font-medium">{view.label}</span>
                  
                  {badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 text-xs min-w-5 h-5 px-1 bg-error text-on-error"
                    >
                      {badge}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Navigation des layers (visible seulement sur mixer/layers) */}
      {(ui.view === 'mixer' || ui.view === 'layers') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[
                { id: 'inputs', label: 'Inputs (1-24)', count: 24 },
                { id: 'aux', label: 'Aux (1-6)', count: 6 },
                { id: 'groups', label: 'Groups (1-4)', count: 4 }
              ].map((layer) => (
                <Button
                  key={layer.id}
                  onClick={() => setCurrentLayer(layer.id as any)}
                  size="sm"
                  variant={currentLayer === layer.id ? 'default' : 'outline'}
                  className={cn(
                    'rounded-full text-xs transition-all duration-200',
                    currentLayer === layer.id && 'bg-primary text-on-primary'
                  )}
                >
                  {layer.label}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 text-xs bg-surface text-on-surface"
                  >
                    {layer.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Actions rapides */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="text-xs rounded-full">
                🔄 Sync
              </Button>
              <Button size="sm" variant="outline" className="text-xs rounded-full">
                💾 Save
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}