'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RTAView() {
  const { rta, toggleRTA } = useMixerStore();

  return (
    <div className="h-full bg-surface p-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-on-surface">
            Analyseur de spectre (RTA)
          </h2>
          <Button
            onClick={toggleRTA}
            variant={rta.enabled ? 'default' : 'outline'}
          >
            {rta.enabled ? 'RTA ON' : 'RTA OFF'}
          </Button>
        </div>
        
        {rta.enabled ? (
          <div className="space-y-6">
            {/* Visualiseur de spectre simulé */}
            <div className="bg-black rounded-lg p-4" style={{ height: '300px' }}>
              <div className="flex items-end justify-between h-full">
                {rta.bands.map((level, index) => (
                  <div
                    key={index}
                    className="bg-green-500 rounded-t"
                    style={{
                      height: `${Math.max(5, (level + 60) / 70 * 100)}%`,
                      width: '2%',
                      backgroundColor: level > -20 ? '#ef4444' : level > -40 ? '#f59e0b' : '#10b981'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={rta.overlay ? 'default' : 'outline'}
                className="w-full"
              >
                Superposition sur faders
              </Button>
              <Button variant="outline" className="w-full">
                Source: Canal {rta.source}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              RTA désactivé
            </h3>
            <p className="text-on-surface-variant">
              Activez l'analyseur de spectre pour visualiser les fréquences en temps réel
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}