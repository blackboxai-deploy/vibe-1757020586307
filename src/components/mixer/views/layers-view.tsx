'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function LayersView() {
  const { setCurrentLayer, setView, currentLayer, channels } = useMixerStore();

  const layers = [
    {
      id: 'inputs',
      title: 'Canaux d\'entrée',
      description: '24 canaux micro/ligne avec préamplis',
      icon: '🎤',
      color: 'bg-primary',
      channels: channels.filter(ch => ch.type === 'input'),
      features: ['Préamplis Harman', 'Phantom +48V', 'EQ 4 bandes', 'Compresseur/Gate']
    },
    {
      id: 'aux',
      title: 'Sorties auxiliaires',
      description: '6 sorties aux pour moniteurs et effets',
      icon: '🔊',
      color: 'bg-secondary',
      channels: channels.filter(ch => ch.type === 'aux'),
      features: ['Monitoring personnel', 'Envois effets', 'Mix indépendants', 'Routage flexible']
    },
    {
      id: 'groups',
      title: 'Groupes',
      description: '4 groupes pour sous-mixage',
      icon: '📊',
      color: 'bg-tertiary',
      channels: channels.filter(ch => ch.type === 'group'),
      features: ['Sous-mixage', 'Contrôle groupé', 'VCA digitaux', 'Assignation libre']
    }
  ];

  const handleLayerSelect = (layerId: string) => {
    setCurrentLayer(layerId as any);
    setView('mixer');
  };

  return (
    <div className="h-full bg-surface overflow-auto">
      <div className="p-6 max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-on-surface mb-2">
            Couches du mixer
          </h1>
          <p className="text-on-surface-variant">
            Organisez et contrôlez vos canaux par couches logiques
          </p>
        </motion.div>

        {/* Grid des couches */}
        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`
                  p-6 cursor-pointer transition-all duration-300 hover:shadow-xl
                  ${currentLayer === layer.id ? 'ring-2 ring-primary bg-primary-container' : 'hover:bg-surface-variant'}
                `}
                onClick={() => handleLayerSelect(layer.id)}
              >
                {/* En-tête de carte */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${layer.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                    {layer.icon}
                  </div>
                  
                  <Badge 
                    variant="secondary"
                    className="text-sm font-bold px-3 py-1"
                  >
                    {layer.channels.length} canaux
                  </Badge>
                </div>

                {/* Contenu */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-2">
                      {layer.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      {layer.description}
                    </p>
                  </div>

                  {/* Fonctionnalités */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-on-surface">
                      Fonctionnalités :
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {layer.features.map((feature) => (
                        <Badge 
                          key={feature}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="pt-4 border-t border-outline-variant">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-on-surface">
                          {layer.channels.filter(ch => !ch.mute).length}
                        </div>
                        <div className="text-xs text-on-surface-variant">Actifs</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-on-surface">
                          {layer.channels.filter(ch => ch.solo).length}
                        </div>
                        <div className="text-xs text-on-surface-variant">Solo</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={currentLayer === layer.id ? 'default' : 'outline'}
                      className="flex-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLayerSelect(layer.id);
                      }}
                    >
                      {currentLayer === layer.id ? 'Couche active' : 'Sélectionner'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Actions globales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Button variant="outline" className="rounded-full">
            🔄 Réinitialiser tout
          </Button>
          <Button variant="outline" className="rounded-full">
            💾 Sauvegarder la scène
          </Button>
          <Button variant="outline" className="rounded-full">
            📥 Charger la scène
          </Button>
        </motion.div>
      </div>
    </div>
  );
}