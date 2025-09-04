'use client';

import { useState } from 'react';
import { useMixerStore, type Channel } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChannelStripProps {
  channel: Channel;
}

export function ChannelStrip({ channel }: ChannelStripProps) {
  const {
    setChannelLevel,
    setChannelMute,
    setChannelSolo,
    setChannelName,
    selectChannel,
    ui
  } = useMixerStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(channel.name);

  const handleNameSubmit = () => {
    setChannelName(channel.id, tempName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
    if (e.key === 'Escape') {
      setTempName(channel.name);
      setIsEditing(false);
    }
  };

  const isSelected = ui.selectedChannel === channel.id;
  const faderHeight = ui.faderSize === 'large' ? 'h-48' : ui.faderSize === 'medium' ? 'h-36' : 'h-28';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'transition-all duration-200',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
      )}
    >
      <Card 
        className={cn(
          'bg-surface-variant border-outline-variant p-3 space-y-3 cursor-pointer',
          'rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
          isSelected && 'bg-primary-container'
        )}
        onClick={() => selectChannel(channel.id)}
      >
        {/* Nom du canal */}
        <div className="text-center">
          {isEditing ? (
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyPress}
              className="h-8 text-center text-sm"
              autoFocus
            />
          ) : (
            <div
              className="text-sm font-medium text-on-surface-variant truncate cursor-text hover:bg-surface rounded px-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              title={channel.name}
            >
              {channel.name}
            </div>
          )}
          <div className="text-xs text-on-surface-variant opacity-70">
            {channel.type === 'input' ? `CH ${channel.id}` : channel.type.toUpperCase()}
          </div>
        </div>

        {/* Gain knob simulé */}
        <div className="flex flex-col items-center space-y-1">
          <div className="text-xs text-on-surface-variant">GAIN</div>
          <div 
            className="w-12 h-12 rounded-full border-2 border-outline flex items-center justify-center bg-surface cursor-pointer hover:border-primary transition-colors"
            style={{
              background: `conic-gradient(from 0deg, var(--md-sys-color-primary) ${((channel.gain + 40) / 80) * 360}deg, var(--md-sys-color-outline-variant) 0deg)`
            }}
          >
            <div className="w-8 h-8 rounded-full bg-surface border border-outline flex items-center justify-center">
              <div className="text-xs font-mono">{channel.gain > 0 ? '+' : ''}{channel.gain}</div>
            </div>
          </div>
        </div>

        {/* EQ rapide */}
        <div className="space-y-1">
          <div className="text-xs text-on-surface-variant text-center">EQ</div>
          <div className="grid grid-cols-4 gap-1">
            {['HI', 'HM', 'LM', 'LO'].map((band, index) => {
              const values = [channel.eq.highGain, channel.eq.highMidGain, channel.eq.lowMidGain, channel.eq.lowGain];
              const value = values[index];
              return (
                <div key={band} className="text-center">
                  <div className="text-xs text-on-surface-variant">{band}</div>
                  <div 
                    className={cn(
                      'w-6 h-6 rounded border flex items-center justify-center text-xs',
                      value === 0 ? 'border-outline' : value > 0 ? 'border-primary bg-primary/20' : 'border-error bg-error/20'
                    )}
                  >
                    {value > 0 ? '+' : ''}{value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Boutons Mute/Solo */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant={channel.mute ? 'destructive' : 'outline'}
            onClick={(e) => {
              e.stopPropagation();
              setChannelMute(channel.id, !channel.mute);
            }}
            className={cn(
              'h-8 text-xs font-bold rounded-lg transition-all',
              channel.mute && 'animate-pulse'
            )}
          >
            MUTE
          </Button>
          
          <Button
            size="sm"
            variant={channel.solo ? 'default' : 'outline'}
            onClick={(e) => {
              e.stopPropagation();
              setChannelSolo(channel.id, !channel.solo);
            }}
            className={cn(
              'h-8 text-xs font-bold rounded-lg transition-all bg-solo-active',
              channel.solo && 'animate-pulse bg-orange-500 hover:bg-orange-600'
            )}
          >
            SOLO
          </Button>
        </div>

        {/* Fader principal */}
        <div className={cn('flex flex-col items-center space-y-2', faderHeight)}>
          <div className="text-xs text-on-surface-variant">LEVEL</div>
          
          <div className="flex-1 w-full flex justify-center">
            <Slider
              value={[channel.level]}
              onValueChange={(values) => setChannelLevel(channel.id, values[0])}
              max={100}
              min={0}
              step={1}
              orientation="vertical"
              className="h-full"
            />
          </div>
          
          <div className="text-xs font-mono text-on-surface-variant">
            {channel.level}
          </div>
        </div>

        {/* Meters niveau */}
        {ui.showMeters && (
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 8 }, (_, i) => {
              const level = (channel.level / 100) * 8;
              const isActive = i < level;
              const color = i < 5 ? 'bg-meter-green' : i < 7 ? 'bg-meter-yellow' : 'bg-meter-red';
              
              return (
                <div
                  key={i}
                  className={cn(
                    'w-1 h-3 rounded-full transition-all duration-150',
                    isActive ? color : 'bg-outline-variant',
                    channel.meters.clip && i === 7 && 'animate-pulse'
                  )}
                />
              );
            })}
          </div>
        )}

        {/* Indicateurs d'état */}
        <div className="flex justify-center space-x-1">
          {channel.phantom && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-tertiary text-on-tertiary">
              +48V
            </Badge>
          )}
          {channel.lowCut && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-primary text-on-primary">
              HPF
            </Badge>
          )}
          {channel.compressor.enabled && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-secondary text-on-secondary">
              COMP
            </Badge>
          )}
          {channel.gate.enabled && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-tertiary text-on-tertiary">
              GATE
            </Badge>
          )}
        </div>

        {/* Couleur de canal */}
        <div 
          className="w-full h-1 rounded-full"
          style={{ backgroundColor: channel.color }}
        />
      </Card>
    </motion.div>
  );
}