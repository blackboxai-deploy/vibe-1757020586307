'use client';

import { useMixerStore } from '@/store/mixer-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function ConnectionStatus() {
  const { connection, connect, disconnect } = useMixerStore();
  
  const statusConfig = {
    disconnected: {
      color: 'bg-error text-on-error',
      text: 'Non connecté',
      icon: '🔴'
    },
    connecting: {
      color: 'bg-tertiary text-on-tertiary',
      text: 'Connexion...',
      icon: '🟡'
    },
    connected: {
      color: 'bg-green-600 text-white',
      text: 'Connecté',
      icon: '🟢'
    },
    error: {
      color: 'bg-error text-on-error',
      text: 'Erreur',
      icon: '🔴'
    }
  };

  const currentStatus = statusConfig[connection.status];

  const handleConnect = async () => {
    if (connection.status === 'connected') {
      disconnect();
    } else {
      await connect('192.168.1.100'); // IP par défaut de la Ui24R
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-surface-variant border-b border-outline-variant px-4 py-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Status de connexion */}
        <div className="flex items-center gap-3">
          <Badge
            className={`${currentStatus.color} px-3 py-1 rounded-full text-sm font-medium`}
          >
            <span className="mr-2">{currentStatus.icon}</span>
            {currentStatus.text}
          </Badge>
          
          {connection.status === 'connected' && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 text-sm text-on-surface-variant"
              >
                <span>📍 {connection.ipAddress}</span>
                <span>⚡ {Math.round(connection.latency)}ms</span>
                <span>🔧 {connection.firmwareVersion}</span>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Actions de connexion */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleConnect}
            disabled={connection.status === 'connecting'}
            size="sm"
            variant={connection.status === 'connected' ? 'destructive' : 'default'}
            className="rounded-full"
          >
            {connection.status === 'connecting' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mr-2"
              >
                ⟳
              </motion.div>
            )}
            {connection.status === 'connected' ? 'Déconnecter' : 'Connecter'}
          </Button>

          {connection.status === 'connected' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              {/* Indicateur heartbeat */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}