'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function MasterSection() {
  const { 
    masterVolume, 
    masterMute, 
    setMasterVolume, 
    setMasterMute,
    ui,
    toggleSidebar,
    toggleMeters
  } = useMixerStore();

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'bg-surface-variant border-l border-outline-variant transition-all duration-300',
        ui.sidebarOpen ? 'w-80' : 'w-20'
      )}
    >
      <div className="h-full flex flex-col">
        {/* En-tête */}
        <div className="p-4 border-b border-outline-variant">
          <div className="flex items-center justify-between">
            {ui.sidebarOpen && (
              <div className="space-y-1">
                <h3 className="font-bold text-on-surface">Master Section</h3>
                <p className="text-xs text-on-surface-variant">Contrôle principal</p>
              </div>
            )}
            
            <Button
              size="sm"
              variant="outline"
              onClick={toggleSidebar}
              className="rounded-full p-2"
            >
              {ui.sidebarOpen ? '→' : '←'}
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 space-y-6">
          {ui.sidebarOpen ? (
            <>
              {/* Master Fader */}
              <Card className="p-4 space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold text-on-surface mb-2">Master Level</h4>
                  
                  <div className="flex justify-center mb-4">
                    <div className="h-48 w-8">
                      <Slider
                        value={[masterVolume]}
                        onValueChange={(values) => setMasterVolume(values[0])}
                        max={100}
                        min={0}
                        step={1}
                        orientation="vertical"
                        className="h-full"
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm font-mono text-on-surface-variant mb-4">
                    {masterVolume}%
                  </div>
                  
                  <Button
                    onClick={() => setMasterMute(!masterMute)}
                    variant={masterMute ? 'destructive' : 'outline'}
                    className={cn(
                      'w-full font-bold rounded-lg',
                      masterMute && 'animate-pulse'
                    )}
                  >
                    {masterMute ? 'MUTED' : 'MASTER'}
                  </Button>
                </div>
              </Card>

              {/* Contrôles interface */}
              <Card className="p-4 space-y-4">
                <h4 className="font-semibold text-on-surface">Interface</h4>
                
                <div className="space-y-3">
                  <Button
                    onClick={toggleMeters}
                    variant={ui.showMeters ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start rounded-full"
                  >
                    📊 Meters {ui.showMeters ? 'ON' : 'OFF'}
                  </Button>
                  
                  <div className="flex space-x-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <Button
                        key={size}
                        size="sm"
                        variant={ui.faderSize === size ? 'default' : 'outline'}
                        className="flex-1 text-xs rounded-full"
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Statistiques système */}
              <Card className="p-4 space-y-3">
                <h4 className="font-semibold text-on-surface">Système</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">CPU:</span>
                    <span className="text-on-surface">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">RAM:</span>
                    <span className="text-on-surface">245 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Latence:</span>
                    <span className="text-on-surface">25ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Sample Rate:</span>
                    <span className="text-on-surface">48kHz</span>
                  </div>
                </div>
              </Card>

              {/* Actions rapides */}
              <Card className="p-4 space-y-3">
                <h4 className="font-semibold text-on-surface">Actions</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="text-xs rounded-full">
                    🎧 Casque
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs rounded-full">
                    🔄 Reset
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs rounded-full">
                    💾 Save
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs rounded-full">
                    📥 Load
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            // Version compacte
            <div className="space-y-4">
              <div className="text-center">
                <div className="h-32 w-6 mx-auto mb-2">
                  <Slider
                    value={[masterVolume]}
                    onValueChange={(values) => setMasterVolume(values[0])}
                    max={100}
                    min={0}
                    step={1}
                    orientation="vertical"
                    className="h-full"
                  />
                </div>
                
                <Button
                  onClick={() => setMasterMute(!masterMute)}
                  variant={masterMute ? 'destructive' : 'outline'}
                  size="sm"
                  className={cn(
                    'w-full text-xs font-bold rounded-lg',
                    masterMute && 'animate-pulse'
                  )}
                >
                  {masterMute ? 'M' : 'MST'}
                </Button>
              </div>

              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs p-2">
                  🎧
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs p-2">
                  💾
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs p-2">
                  ⚙️
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="p-2 border-t border-outline-variant">
          {ui.sidebarOpen ? (
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>v1.0.0</span>
              <Badge variant="secondary" className="text-xs">
                PWA
              </Badge>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}