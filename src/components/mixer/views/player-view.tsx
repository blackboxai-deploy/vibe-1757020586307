'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

export function PlayerView() {
  const { player, playTrack, pauseTrack, stopTrack, setPlayerVolume } = useMixerStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-surface p-6">
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-on-surface mb-6 text-center">
          Player USB
        </h2>
        
        {/* Affichage du morceau */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-on-surface mb-2">
            {player.currentTrack || 'Aucun morceau'}
          </div>
          <div className="text-sm text-on-surface-variant">
            {formatTime(player.position)} / {formatTime(player.duration)}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-6">
          <Progress 
            value={(player.position / player.duration) * 100} 
            className="w-full h-2"
          />
        </div>

        {/* Contrôles de lecture */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            onClick={stopTrack}
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0"
          >
            ⏹️
          </Button>
          
          <Button
            onClick={player.status === 'playing' ? pauseTrack : playTrack}
            variant="default"
            size="lg"
            className="rounded-full w-16 h-16 p-0 text-2xl"
          >
            {player.status === 'playing' ? '⏸️' : '▶️'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0"
          >
            ⏭️
          </Button>
        </div>

        {/* Contrôle volume */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-on-surface-variant min-w-16">Volume:</span>
            <Slider
              value={[player.volume]}
              onValueChange={(values) => setPlayerVolume(values[0])}
              max={100}
              min={0}
              className="flex-1"
            />
            <span className="text-sm text-on-surface-variant min-w-12">
              {player.volume}%
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            player.status === 'playing' ? 'bg-green-100 text-green-800' :
            player.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {player.status === 'playing' && '▶️ Lecture'}
            {player.status === 'paused' && '⏸️ Pause'}
            {player.status === 'stopped' && '⏹️ Arrêté'}
          </div>
        </div>
      </Card>
    </div>
  );
}