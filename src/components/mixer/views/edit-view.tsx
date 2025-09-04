'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function EditView() {
  const { ui, channels } = useMixerStore();
  
  const selectedChannel = channels.find(ch => ch.id === ui.selectedChannel);
  
  if (!selectedChannel) {
    return (
      <div className="h-full flex items-center justify-center bg-surface">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-on-surface mb-2">Aucun canal sélectionné</h2>
          <p className="text-on-surface-variant">Sélectionnez un canal pour l'éditer</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-surface p-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-on-surface mb-4">
          Édition - {selectedChannel.name}
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-on-surface mb-3">EQ 4 bandes</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-on-surface-variant">High Gain</label>
                <Slider value={[selectedChannel.eq.highGain + 15]} max={30} min={0} />
              </div>
              <div>
                <label className="text-sm text-on-surface-variant">High-Mid Gain</label>
                <Slider value={[selectedChannel.eq.highMidGain + 15]} max={30} min={0} />
              </div>
              <div>
                <label className="text-sm text-on-surface-variant">Low-Mid Gain</label>
                <Slider value={[selectedChannel.eq.lowMidGain + 15]} max={30} min={0} />
              </div>
              <div>
                <label className="text-sm text-on-surface-variant">Low Gain</label>
                <Slider value={[selectedChannel.eq.lowGain + 15]} max={30} min={0} />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-on-surface mb-3">Compresseur</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-on-surface-variant">Threshold</label>
                <Slider value={[selectedChannel.compressor.threshold + 40]} max={40} min={0} />
              </div>
              <div>
                <label className="text-sm text-on-surface-variant">Ratio</label>
                <Slider value={[selectedChannel.compressor.ratio]} max={20} min={1} />
              </div>
              <Button 
                variant={selectedChannel.compressor.enabled ? 'default' : 'outline'}
                className="w-full"
              >
                {selectedChannel.compressor.enabled ? 'Compresseur ON' : 'Compresseur OFF'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}