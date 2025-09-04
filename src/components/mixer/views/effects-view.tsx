'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function EffectsView() {
  const { effects } = useMixerStore();

  return (
    <div className="h-full bg-surface p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Effets intégrés</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {effects.map((effect) => (
          <Card key={effect.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-on-surface">{effect.name}</h3>
              <Button 
                variant={effect.enabled ? 'default' : 'outline'}
                size="sm"
              >
                {effect.enabled ? 'ON' : 'OFF'}
              </Button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(effect.parameters).map(([param, value]) => (
                <div key={param}>
                  <label className="text-sm text-on-surface-variant capitalize">
                    {param}: {value}
                  </label>
                  <Slider 
                    value={[value]} 
                    max={100} 
                    min={0} 
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-on-surface-variant">
              Preset: {effect.preset}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}