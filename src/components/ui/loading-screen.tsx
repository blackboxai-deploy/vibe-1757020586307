'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-6"
      >
        {/* Logo et titre */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="w-20 h-20 mx-auto bg-primary rounded-3xl flex items-center justify-center shadow-lg">
            <div className="text-2xl font-bold text-on-primary">Ui24</div>
          </div>
          
          <h1 className="text-3xl font-bold text-on-primary-container">
            Soundcraft Ui24R Controller
          </h1>
          
          <p className="text-lg text-on-secondary-container opacity-80">
            Application moderne de contrôle à distance
          </p>
        </motion.div>

        {/* Indicateur de chargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-4"
        >
          {/* Barre de progression animée */}
          <div className="w-64 h-2 bg-outline-variant rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
              className="h-full w-1/3 bg-primary rounded-full"
            />
          </div>
          
          <p className="text-sm text-on-surface-variant">
            Initialisation du mixer...
          </p>
        </motion.div>

        {/* Fonctionnalités clés */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-md mx-auto"
        >
          {[
            { icon: '🎛️', text: 'Contrôle 24 canaux' },
            { icon: '🎵', text: 'Effets temps réel' },
            { icon: '📱', text: 'Interface moderne' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              className="text-center space-y-2"
            >
              <div className="text-2xl">{feature.icon}</div>
              <p className="text-xs text-on-surface-variant">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}