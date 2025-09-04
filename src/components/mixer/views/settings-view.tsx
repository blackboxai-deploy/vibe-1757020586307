'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SettingsView() {
  const { setTheme, ui, connection } = useMixerStore();

  return (
    <div className="h-full bg-surface p-6 overflow-auto">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Réglages</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        {/* Interface */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Interface</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-on-surface-variant mb-2 block">Thème</label>
              <div className="flex space-x-2">
                {['light', 'dark', 'auto'].map((theme) => (
                  <Button
                    key={theme}
                    size="sm"
                    variant={ui.theme === theme ? 'default' : 'outline'}
                    onClick={() => setTheme(theme as any)}
                    className="capitalize"
                  >
                    {theme === 'light' ? '☀️ Clair' : theme === 'dark' ? '🌙 Sombre' : '🔄 Auto'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm text-on-surface-variant mb-2 block">Taille des faders</label>
              <div className="flex space-x-2">
                {['small', 'medium', 'large'].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={ui.faderSize === size ? 'default' : 'outline'}
                    className="capitalize"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Connexion */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Connexion</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-on-surface-variant mb-2 block">
                Adresse IP de la console
              </label>
              <Input
                placeholder="192.168.1.100"
                value={connection.ipAddress || ''}
                readOnly
                className="bg-surface-variant"
              />
            </div>
            
            <div>
              <label className="text-sm text-on-surface-variant mb-2 block">
                Statut
              </label>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  connection.status === 'connected' ? 'bg-green-500' :
                  connection.status === 'connecting' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <span className="text-sm text-on-surface capitalize">
                  {connection.status === 'connected' ? 'Connecté' :
                   connection.status === 'connecting' ? 'Connexion...' :
                   connection.status === 'error' ? 'Erreur' : 'Déconnecté'}
                </span>
              </div>
            </div>
            
            {connection.status === 'connected' && (
              <div className="text-sm text-on-surface-variant space-y-1">
                <div>Firmware: {connection.firmwareVersion}</div>
                <div>Latence: {Math.round(connection.latency)}ms</div>
              </div>
            )}
          </div>
        </Card>

        {/* À propos */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">À propos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary font-bold">
                Ui24
              </div>
              <div>
                <div className="font-semibold text-on-surface">
                  Soundcraft Ui24R Controller
                </div>
                <div className="text-sm text-on-surface-variant">
                  Version 1.0.0
                </div>
              </div>
            </div>
            
            <div className="text-sm text-on-surface-variant space-y-2">
              <p>
                Application moderne de contrôle à distance pour console Soundcraft Ui24R
              </p>
              <p>
                Développée avec Next.js 15, React 19, Material Design 3
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                📖 Guide utilisateur
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                🐛 Support
              </Button>
            </div>
          </div>
        </Card>

        {/* Données */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Données</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">
                💾 Exporter la scène
              </Button>
              <Button size="sm" variant="outline">
                📥 Importer la scène
              </Button>
              <Button size="sm" variant="outline">
                🔄 Réinitialiser
              </Button>
              <Button size="sm" variant="outline">
                🗑️ Effacer cache
              </Button>
            </div>
            
            <div className="text-xs text-on-surface-variant">
              Les données sont sauvegardées localement dans votre navigateur
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}